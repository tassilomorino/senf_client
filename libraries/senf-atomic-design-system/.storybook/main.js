module.exports = {
  stories: [
    "../src/**/**/*.stories.mdx",
    "../src/**/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  core: {
    builder: "webpack5",
  },
  features: {
    storyStoreV7: true,
  },
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@react-theming/storybook-addon",
    "storybook-react-i18next",
    "storybook-addon-turbo-build",
    {
      name: "storybook-addon-turbo-build",
      options: {
        optimizationLevel: 3,
      },
    },
  ],
  webpackFinal: async (config) => {
    config.plugins = config.plugins.filter(
      ({ constructor }) => constructor.name !== "ProgressPlugin"
    );
    return config;
  },
};
