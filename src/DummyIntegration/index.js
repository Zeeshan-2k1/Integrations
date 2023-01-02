import DummyIntegrationEvent from './EventHandler';

export default DummyIntegrations = {
  name: 'Dummy Integrations',
  description: 'This is a dummy integration description for testing',
  category: ['testing'],
  config: ['account_id'],
  event: DummyIntegrationEvent,
};
