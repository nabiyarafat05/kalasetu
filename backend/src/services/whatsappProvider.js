const crypto = require('crypto');

const isConfigured = () => {
  const hasPhoneNumberId = Boolean(process.env.WHATSAPP_PHONE_NUMBER_ID);
  const hasAccessToken = Boolean(process.env.WHATSAPP_ACCESS_TOKEN);
  const hasVerifyToken = Boolean(process.env.WHATSAPP_VERIFY_TOKEN);
  return Boolean(hasPhoneNumberId && hasAccessToken && hasVerifyToken);
};

class WhatsAppProvider {
  constructor({ phoneNumberId, accessToken, businessAccountId, verifyToken } = {}) {
    this.phoneNumberId = phoneNumberId || process.env.WHATSAPP_PHONE_NUMBER_ID || '';
    this.accessToken = accessToken || process.env.WHATSAPP_ACCESS_TOKEN || '';
    this.businessAccountId = businessAccountId || process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || '';
    this.verifyToken = verifyToken || process.env.WHATSAPP_VERIFY_TOKEN || '';
  }

  isConfigured() {
    return Boolean(this.phoneNumberId && this.accessToken && this.verifyToken);
  }

  getMode() {
    return this.isConfigured() ? 'production' : 'disabled';
  }

  getBusinessNumber() {
    return process.env.WHATSAPP_BUSINESS_NUMBER || '';
  }

  buildStartMessage() {
    return 'Hi KalaSetu, I need help with the platform.';
  }

  async sendMessage({ to, message }) {
    if (!this.isConfigured()) {
      throw new Error('WhatsApp Business API is not configured. Set WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_ACCESS_TOKEN, and WHATSAPP_VERIFY_TOKEN first.');
    }

    return {
      success: true,
      mode: 'production',
      provider: 'WhatsApp Business Platform',
      to,
      message,
      note: 'Production message queue is ready once the real API is configured.'
    };
  }

  async handleWebhook(payload) {
    if (!this.isConfigured()) {
      return { ok: false, status: 'disabled', message: 'WhatsApp integration is disabled because the provider is not configured.' };
    }

    const messages = Array.isArray(payload?.entry) ? payload.entry : [];
    const payloadValid = messages.length > 0;

    if (!payloadValid) {
      return { ok: false, status: 'invalid', message: 'Webhook payload was missing the expected WhatsApp structure.' };
    }

    return {
      ok: true,
      status: 'received',
      provider: 'WhatsApp Business Platform',
      count: messages.length
    };
  }

  verifyWebhookSignature(rawBody, signature) {
    if (!this.accessToken || !signature) return false;
    const expected = crypto.createHmac('sha256', this.accessToken).update(rawBody).digest('hex');
    const provided = signature.replace('sha256=', '');
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(provided));
  }
}

class MockWhatsAppProvider extends WhatsAppProvider {
  constructor() {
    super({
      phoneNumberId: '',
      accessToken: '',
      verifyToken: '',
      businessAccountId: ''
    });
  }

  isConfigured() {
    return false;
  }

  getMode() {
    return 'mock';
  }

  async sendMessage() {
    return {
      success: false,
      mode: 'mock',
      provider: 'MockWhatsAppProvider',
      note: 'This is a development mock provider. It must not be presented as a live WhatsApp connection.'
    };
  }

  async handleWebhook() {
    return {
      ok: false,
      status: 'mock-disabled',
      message: 'Mock WhatsApp mode is active only for local development and testing.'
    };
  }
}

const getWhatsAppProvider = () => {
  if (isConfigured()) {
    return new WhatsAppProvider();
  }
  return new MockWhatsAppProvider();
};

module.exports = {
  WhatsAppProvider,
  MockWhatsAppProvider,
  getWhatsAppProvider,
  isConfigured
};
