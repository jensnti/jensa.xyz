const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');
const mila = require('markdown-it-link-attributes');
const markdownItAnchor = require('markdown-it-anchor');
const emojiReadTime = require('@11tyrocks/eleventy-plugin-emoji-readtime');
const mia = require('markdown-it-attrs');
const glob = require('fast-glob');
const rssPlugin = require('@11ty/eleventy-plugin-rss');
const fs = require('fs');

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(rssPlugin);
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(emojiReadTime, {
        emoji: '📕',
        label: 'minuters läsning',
        wpm: 200,
        bucketSize: 3
    });

    eleventyConfig.setDataDeepMerge(true);

    eleventyConfig.addWatchTarget('./src/scss/');
    eleventyConfig.addWatchTarget('./src/js/');

    eleventyConfig.addPassthroughCopy('./src/js');
    eleventyConfig.addPassthroughCopy('./src/favicon.ico');

    // Filters
    glob.sync(['_11ty/filters/*.js']).forEach((file) => {
        let filters = require('./' + file);
        Object.keys(filters).forEach((name) =>
            eleventyConfig.addFilter(name, filters[name])
        );
    });

    // Shortcodes
    glob.sync(['_11ty/shortcodes/*.js']).forEach((file) => {
        let shortcodes = require('./' + file);
        Object.keys(shortcodes).forEach((name) =>
            eleventyConfig.addShortcode(name, shortcodes[name])
        );
    });

    // PairedShortcodes
    glob.sync(['_11ty/paired-shortcodes/*.js']).forEach((file) => {
        let pairedShortcodes = require('./' + file);
        Object.keys(pairedShortcodes).forEach((name) =>
            eleventyConfig.addPairedShortcode(name, pairedShortcodes[name])
        );
    });

    // Collections
    eleventyConfig.addCollection('pages', (collectionApi) =>
        collectionApi.getFilteredByGlob('src/pages/*.md')
    );
    eleventyConfig.addCollection('posts', (collectionApi) =>
        collectionApi.getFilteredByGlob('src/posts/*.md')
    );

    const markdownLibrary = markdownIt({
        html: true,
        breaks: true,
        linkify: true,
        typographer: true
    })
        .use(markdownItAnchor, {
            permalink: true,
            permalinkClass: 'anchor',
            permalinkSymbol: '#',
            permalinkSpace: false,
            permalinkBefore: false,
            level: [1, 2, 3],
            slugify: (s) =>
                s
                    .trim()
                    .toLowerCase()
                    .replace(/[\s+~\/]/g, '-')
                    .replace(/[().`,%·'"!?¿:@*]/g, '')
        })
        .use(mila, {
            pattern: /^https:/,
            attrs: {
                target: '_blank',
                rel: 'noopener'
            }
        })
        .use(mia, {
            allowedAttributes: ['id', 'class']
        });

    eleventyConfig.setLibrary('md', markdownLibrary);

    return {
        dir: {
            input: 'src',
            output: 'public'
        },
        passthroughFileCopy: true
    };
};
