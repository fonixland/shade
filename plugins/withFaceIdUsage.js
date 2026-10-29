// plugins/withFaceIdUsage.js
const { withInfoPlist } = require('expo/config-plugins');

module.exports = (config, { reason = 'Unlock your Shade account' } = {}) =>
  withInfoPlist(config, (c) => {
    c.modResults.NSFaceIDUsageDescription = reason;
    return c;
  });
