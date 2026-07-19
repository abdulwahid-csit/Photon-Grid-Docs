import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// The canonical, public URL the site is served from. Used for canonical tags,
// sitemap.xml, robots.txt and Open Graph / structured-data URLs. Keep this in
// sync with the domain that actually serves the site in Vercel.
const SITE_URL = 'https://photon-grid-docs.vercel.app';

// Paste the token from Google Search Console → "HTML tag" verification here
// (just the content value). Leave empty to skip. See README / SEO notes.
const GOOGLE_SITE_VERIFICATION = '';

const config: Config = {
  title: 'Photon Grid',
  tagline: 'The high-performance JavaScript data grid for React, Angular, Vue and vanilla JS — sorting, filtering, grouping, editing, charting and theming.',
  favicon: 'img/logo.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: SITE_URL,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // Emit URLs without a trailing slash so canonicals, sitemap and the URLs
  // Google indexes all agree (avoids duplicate-content ambiguity on Vercel).
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'photon-grid', // Usually your GitHub org/user name.
  projectName: 'photon-grid-docs', // Usually your repo name.

  onBrokenLinks: 'warn',

  // Runs early on the client. Debounces ResizeObserver callbacks to a frame so
  // the benign "ResizeObserver loop" warning never fires (webpack-dev-server
  // otherwise shows it as a red error overlay).
  clientModules: ['./src/client/resize-observer-fix.ts'],

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // <head> injections for SEO: structured data (JSON-LD) so Google can show a
  // rich result for "Photon Grid", plus optional Search Console verification.
  headTags: [
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Photon Grid',
        alternateName: 'Photon Grid — JavaScript Data Grid',
        url: SITE_URL,
        description:
          'Photon Grid is a fast, feature-rich JavaScript data grid for React, Angular, Vue and vanilla JS with sorting, filtering, grouping, editing, integrated charts and theming.',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/docs?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      }),
    },
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Photon Grid',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web, Windows, macOS, Linux',
        description:
          'A high-performance, zero-dependency JavaScript data grid with virtual scrolling, sorting, filtering, grouping, cell editing, pagination, integrated charts, sparklines and theming. Official wrappers for React, Angular and Vue.',
        url: SITE_URL,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        softwareVersion: '2.0.1',
        author: {
          '@type': 'Person',
          name: 'Abdul Wahid',
        },
      }),
    },
    // Google Search Console verification — only emitted when the token is set.
    ...(GOOGLE_SITE_VERIFICATION
      ? [
          {
            tagName: 'meta',
            attributes: {
              name: 'google-site-verification',
              content: GOOGLE_SITE_VERIFICATION,
            },
          },
        ]
      : []),
  ],

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
    // Social/share card (og:image, twitter image) — uses the Photon Grid logo.
    image: 'img/logo.svg',
    metadata: [
      {
        name: 'keywords',
        content:
          'photon grid, photongrid, javascript data grid, js data grid, react data grid, angular data grid, vue data grid, data table, sorting, filtering, grouping, cell editing, pagination, integrated charts, sparklines, theming, virtual scrolling, ag grid alternative',
      },
      {
        name: 'description',
        content:
          'Photon Grid is a fast, feature-rich JavaScript data grid for React, Angular, Vue and vanilla JS with sorting, filtering, grouping, editing, selection, pagination, integrated charts, sparklines and theming.',
      },
      {name: 'author', content: 'Abdul Wahid'},
      {property: 'og:type', content: 'website'},
      {property: 'og:site_name', content: 'Photon Grid'},
      {property: 'og:title', content: 'Photon Grid'},
      {
        property: 'og:description',
        content:
          'Photon Grid is a fast, feature-rich JavaScript data grid for React, Angular, Vue and vanilla JS.',
      },
      {property: 'og:url', content: 'https://photon-grid-docs.vercel.app'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {
        name: 'google-site-verification',
        content: 'ZPEag-Qaae5HpUIk7ee7dowgHVtKVBv-3_FgLOY6w8A',
      },
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
