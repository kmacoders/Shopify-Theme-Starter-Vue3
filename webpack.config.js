const merge = require('webpack-merge');
const { hugCommonConfig } = require('./build-utils/webpack.common');

const addons = (addonsArg) => {
  console.log(addonsArg);
  const addons2 = []
    .concat.apply([], [addonsArg])
    .filter(Boolean);

  return addons2.map((addonName) => require(`./build-utils/addons/webpack.${addonName}.js`));
};

const allConfigs = (env) => {
  console.log(env)
  console.log(env.addons)

  const envConfig = require(`./build-utils/webpack.${env.env}.js`);
  const allConfig = merge(hugCommonConfig, envConfig, ...addons(env.addons));

  return allConfig;
}
module.exports = allConfigs;
