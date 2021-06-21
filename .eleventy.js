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
    eleventyConfig.addPassthroughCopy('src/images');
    eleventyConfig.addPassthroughCopy('./src/js');
    eleventyConfig.addPassthroughCopy('./src/favicon.ico');

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
                eleventyConfig.addLiquidShortcode(name, shortcodes[name]);
                eleventyConfig.addJavaScriptFunction(name, shortcodes[name]);
            } else {
                eleventyConfig.addShortcode(name, shortcodes[name]);
            }
        });
    });

    // eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);
    // eleventyConfig.addLiquidShortcode('image', imageShortcode);
    // eleventyConfig.addJavaScriptFunction('image', imageShortcode);

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
        collectionApi.getFilteredByGlob('src/posts/*.md')
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
        typographer: true
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

    // 404
    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: function (err, browserSync) {
                const content_404 = fs.readFileSync('public/404.html');

                browserSync.addMiddleware('*', (req, res) => {
                    // Provides the 404 content without redirect.
                    res.write(content_404);
                    res.end();
                });
            }
        }
    });

    return {
        dir: {
            input: 'src',
            output: 'public'
        },
        passthroughFileCopy: true
    };
};
