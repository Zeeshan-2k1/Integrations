const { HandleEvent } = require('./EventHandler');
const { getConfig } = require('./GetConfig');

const TestInetgrations = {
  name: 'Test Integration',
  description: 'This is another test integration',
  category: ['testing'],
  config: ['id', 'account_id'],
  event: HandleEvent,
  getConfigs: getConfig,
};

export default TestInetgrations;
