module.exports = function (config) {
  return {
    ...config,
    transformIgnorePatterns: ['<rootDir>/node_modules/*'],
  };
};
