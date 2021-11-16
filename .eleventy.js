const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');
const mila = require('markdown-it-link-attributes');
const mia = require('markdown-it-attrs');
const glob = require('fast-glob');
const rssPlugin = require('@11ty/eleventy-plugin-rss');
const fs = require('fs');

// const imageShortcode = require('./src/shortcodes/image');

// Import transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js');
const parseTransform = require('./src/transforms/parse-transform.js');

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(rssPlugin);
    eleventyConfig.addPlugin(syntaxHighlight);

    eleventyConfig.setDataDeepMerge(true);

    eleventyConfig.addWatchTarget('./src/scss/');
    eleventyConfig.addWatchTarget('./src/js/');

    eleventyConfig.addPassthroughCopy('src/robots.txt');
    eleventyConfig.addPassthroughCopy('./src/js');
    eleventyConfig.addPassthroughCopy('./src/favicon.ico');

    eleventyConfig.addPassthroughCopy('./src/images/jens.jpg');

    // Filters
    glob.sync(['src/filters/*.js']).forEach((file) => {
        let filters = require('./' + file);
        Object.keys(filters).forEach((name) =>
            eleventyConfig.addFilter(name, filters[name])
        );
    });

    // Shortcodes
    glob.sync(['src/shortcodes/*.js']).forEach((file) => {
        let shortcodes = require('./' + file);
        Object.keys(shortcodes).forEach((name) => {
            if (name === 'image') {
                eleventyConfig.addNunjucksAsyncShortcode(
                    name,
                    shortcodes[name]
                );
            } else {
                eleventyConfig.addShortcode(name, shortcodes[name]);
            }
        });
    });

    // PairedShortcodes
    glob.sync(['src/paired-shortcodes/*.js']).forEach((file) => {
        let pairedShortcodes = require('./' + file);
        Object.keys(pairedShortcodes).forEach((name) =>
            eleventyConfig.addPairedShortcode(name, pairedShortcodes[name])
        );
    });

    // Transforms
    eleventyConfig.addTransform('htmlmin', htmlMinTransform);
    eleventyConfig.addTransform('parse', parseTransform);

    // Collections
    eleventyConfig.addCollection('pages', (collectionApi) =>
        collectionApi.getFilteredByGlob('src/pages/*.md')
    );

    eleventyConfig.addCollection('posts', (collectionApi) =>
        collectionApi.getFilteredByGlob('src/posts/*.md').reverse()
    );

    eleventyConfig.addCollection('feed', (collectionApi) =>
        [...collectionApi.getFilteredByGlob('src/posts/*.md')]
            .reverse()
            .slice(0, 5)
    );

    const markdownLibrary = markdownIt({
        html: true,
        breaks: true,
        linkify: true,
        typographer: true,
    })
        .use(mila, {
            pattern: /^https:/,
            attrs: {
                target: '_blank',
                rel: 'noopener',
            },
        })
        .use(mia, {
            allowedAttributes: ['id', 'class'],
        });

    eleventyConfig.setLibrary('md', markdownLibrary);

    // 404
    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: function (err, bs) {
                bs.addMiddleware('*', (req, res) => {
                    const content_404 = fs.readFileSync('public/404.html');
                    // Add 404 http status code in request header.
                    res.writeHead(404, {
                        'Content-Type': 'text/html; charset=UTF-8',
                    });
                    // Provides the 404 content without redirect.
                    res.write(content_404);
                    res.end();
                });
            },
        },
    });

    return {
        markdownTemplateEngine: 'njk',
        dir: {
            input: 'src',
            output: 'public',
        },
        passthroughFileCopy: true,
    };
};
