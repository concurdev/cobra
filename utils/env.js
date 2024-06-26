/**
 * Retrieve the value of the specified environment variable.
 * Throws an error if the environment variable is not set and no default value is provided.
 *
 * @param {string} name - The name of the environment variable.
 * @param {string} defaultVal - An optional default value to use if the environment variable is not set.
 * @returns {string} The value of the environment variable.
 * @throws {Error} if the environment variable is not set and no default value is provided.
 */
function requireEnv(name, defaultVal) {
  const envValue = process.env[name];
  if (!envValue) {
    if (defaultVal !== undefined) return defaultVal;
    throw new Error(`CONFIG.REQUIRED_VAR_NOT_SET: ${name}`);
  }
  return envValue;
}

/**
 * Retrieve the value of the specified environment variable as an integer.
 * Throws an error if the environment variable is not set, not a valid integer, and no default value is provided.
 *
 * @param {string} name - The name of the environment variable.
 * @param {number} defaultVal - An optional default value to use if the environment variable is not set or not a valid integer.
 * @returns {number} The value of the environment variable as an integer.
 * @throws {Error} if the environment variable is not set, not a valid integer, and no default value is provided.
 */
function requireIntEnv(name, defaultVal) {
  const defaultStr =
    defaultVal !== undefined ? defaultVal.toString() : undefined;
  const valueStr = requireEnv(name, defaultStr);
  const value = Number(valueStr);
  if (!Number.isInteger(value)) {
    throw new Error(`CONFIG.VALUE_NOT_AN_INT: ${name}: ${valueStr}`);
  }
  return value;
}

module.exports = { requireEnv, requireIntEnv };
