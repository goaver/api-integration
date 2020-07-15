module.exports = {
  title: 'Identity Verification API',
  tagline: 'Identity that works',
  url: 'https://github.com/goaver',
  baseUrl: '/',
  favicon: 'https://raw.githubusercontent.com/goaver/api-integration/master/images/aver_icon.png',
  organizationName: 'goaver', // Usually your GitHub org/user name.
  projectName: 'goaver.github.io', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: '',
      logo: {
        alt: 'Aver Logo',
        src: 'https://raw.githubusercontent.com/goaver/api-integration/master/images/aver_logo.png'
      },
      links: [
        {
          to: '/docs/overview',
          activeBasePath: '../docs',
          label: 'Documentation',
          position: 'left',
        },
        {
          href: 'https://github.com/goaver/api-integration/tree/master/examples',
          label: 'Code Examples',
          position: 'left'
        }
      ]
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://www.goaver.com">Aver, LLC.</a>`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../docs',
          sidebarPath: require.resolve('./sidebars.js')
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
