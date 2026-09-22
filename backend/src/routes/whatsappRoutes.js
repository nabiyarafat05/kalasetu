const express = require('express');
const { generateAssistantReply } = require('../services/kalaSetuAssistant');
const { getWhatsAppProvider } = require('../services/whatsappProvider');

const router = express.Router();

router.get('/webhook', (req, res) => {
  const provider = getWhatsAppProvider();
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (!provider.isConfigured()) {
    return res.status(200).json({
      ok: false,
      status: 'disabled',
      message: 'WhatsApp webhook is disabled because the production credentials are not configured.'
    });
  }

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return res.status(200).send(challenge || '');
  }

  return res.status(403).json({ ok: false, message: 'Invalid WhatsApp verification token.' });
});

router.post('/webhook', async (req, res) => {
  const provider = getWhatsAppProvider();
  const payload = req.body || {};

  if (!provider.isConfigured()) {
    return res.status(200).json({
      ok: true,
      status: 'disabled',
      message: 'WhatsApp is not configured in this environment. Production routing will enable once credentials are added.'
    });
  }

  try {
    const result = await provider.handleWebhook(payload);
    return res.status(200).json({ ok: true, data: result });
  } catch (error) {
    console.error('WhatsApp webhook processing error:', error.message);
    return res.status(500).json({ ok: false, message: 'Failed to process WhatsApp webhook.' });
  }
});

router.post('/assistant', (req, res) => {
  try {
    const input = req.body?.message || '';
    const context = req.body?.context || { history: [] };
    const result = generateAssistantReply(input, context);

    return res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Assistant processing error:', error.message);
    return res.status(500).json({ success: false, message: 'Failed to process assistant request.' });
  }
});

router.get('/status', (req, res) => {
  const provider = getWhatsAppProvider();
  res.json({
    configured: provider.isConfigured(),
    mode: provider.getMode(),
    businessNumber: provider.getBusinessNumber() || null,
    note: provider.isConfigured() ? 'Official WhatsApp Business API is ready.' : 'WhatsApp support is currently disabled until business credentials are configured.'
  });
});

module.exports = router;
