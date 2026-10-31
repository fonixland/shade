// plugins/withAppGroup.js — mock App Group (what a widget / Live Activity extension shares with the app)
const { withEntitlementsPlist } = require('expo/config-plugins');

const KEY = 'com.apple.security.application-groups';

module.exports = (config, { groups } = {}) =>
  withEntitlementsPlist(config, (c) => {
    const wanted = groups ?? [`group.${config.ios?.bundleIdentifier ?? 'com.example.app'}`];
    const existing = c.modResults[KEY] ?? [];
    c.modResults[KEY] = [...new Set([...existing, ...wanted])];
    return c;
  });
