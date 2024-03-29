module.exports = {
  title: 'Identity Verification API',
  tagline: 'Identity that works',
  url: 'https://github.com/goaver',
  baseUrl: '/',
  favicon: './img/aver_icon.png',
  organizationName: 'goaver', // Usually your GitHub org/user name.
  projectName: 'goaver.github.io', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: '',
      logo: {
        alt: 'Aver Logo',
        src: './img/aver_logo.png'
      },
      items: [
        {
          to: '/docs/overview',
          activeBasePath: '../docs',
          label: 'Documentation',
          position: 'left',
        },
        {
          href: 'https://github.com/goaver/',
          label: 'GitHub',
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
          path: './docs',
          sidebarPath: require.resolve('./sidebars.js')
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
