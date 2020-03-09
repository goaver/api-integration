module.exports = {
  title: 'Aver Identity Verification API',
  tagline: 'Identity that works',
  url: 'https://goaver.github.io',
  baseUrl: '/',
  favicon: 'https://raw.githubusercontent.com/goaver/api-integration/master/images/aver_icon.png',
  organizationName: 'goaver', // Usually your GitHub org/user name.
  projectName: 'api-integration', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: '',
      logo: {
        alt: 'Aver Logo',
        src: 'https://raw.githubusercontent.com/goaver/api-integration/master/images/aver_logo.png'
      },
      links: [
        {
          to: '/docs/quickstart',
          activeBasePath: '../docs',
          label: 'API Documentation',
          position: 'left',
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        //{
        //  title: 'Social',
        //  items: [
        //     {
        //       label: 'Blog',
        //       to: 'blog',
        //     },
        //     {
        //       label: 'GitHub',
        //       href: 'https://github.com/facebook/docusaurus',
        //     },
        //     {
        //       label: 'Twitter',
        //       href: 'https://twitter.com/docusaurus',
        //     },
        //   ],
        // },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Aver, LLC.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../docs',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
