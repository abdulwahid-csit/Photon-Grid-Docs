import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Photon Grid',
  tagline: 'The high-performance JavaScript data grid for sorting, filtering, grouping, editing, charting and theming.',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://photongrid.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'photon-grid', // Usually your GitHub org/user name.
  projectName: 'photon-grid-docs', // Usually your repo name.

  onBrokenLinks: 'warn',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    metadata: [
      {
        name: 'keywords',
        content:
          'photon grid, javascript data grid, js data grid, data table, sorting, filtering, grouping, cell editing, pagination, integrated charts, sparklines, theming',
      },
      {
        name: 'description',
        content:
          'Photon Grid is a fast, feature-rich JavaScript data grid with sorting, filtering, grouping, editing, selection, pagination, integrated charts, sparklines and theming.',
      },
      {name: 'og:type', content: 'website'},
      {name: 'twitter:card', content: 'summary_large_image'},
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: 'Photon Grid',
      logo: {
        alt: 'Photon Grid Logo',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/demos', label: 'Demos', position: 'left'},
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {to: '/api', label: 'API', position: 'left'},
        {to: '/blog', label: 'Blog', position: 'left'},
        {to: '/contact', label: 'Contact Us', position: 'left'},
        {
          href: 'https://www.npmjs.com/package/photon-grid-core',
          label: 'npm',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Quick Start',
              to: '/docs/GETTING STARTED/Quick Start',
            },
            {
              label: 'Columns',
              to: '/docs/CORE FEATURES/Columns/Overview',
            },
            {
              label: 'Charting',
              to: '/docs/CHARTING/Integrated/Overview',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'npm package',
              href: 'https://www.npmjs.com/package/photon-grid-core',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'API',
              to: '/blog',
            },
            {
              label: 'Contact',
              to: '/blog',
            },
          ],
        },
        {
          title: 'Sites',
          items: [
            {
              label: 'Github',
              href: 'https://www.npmjs.com/package/photon-grid-core',
            },
            {
              label: 'Youtube',
              to: '/blog',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/photon-grid',
            },
            {
              label: 'Facebook',
              to: '/blog',
            },
            {
              label: 'X',
              to: '/blog',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Photon Grid.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
