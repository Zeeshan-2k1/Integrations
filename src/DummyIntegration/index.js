const { DummyIntegrationEvent } = require('./EventHandler');

const DummyIntegrations = {
  name: 'Dummy Integrations',
  description: 'This is a dummy integration description for testing',
  category: ['testing'],
  config: ['account_id'],
  event: DummyIntegrationEvent,
};

module.exports = DummyIntegrations;
