const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');
const mila = require('markdown-it-link-attributes');
const mia = require('markdown-it-attrs');
const glob = require('fast-glob');
const rssPlugin = require('@11ty/eleventy-plugin-rss');
const fs = require('fs');
const { format, parseISO } = require('date-fns');
const { sv } = require('date-fns/locale');
const Image = require('@11ty/eleventy-img');
// const imageShortcode = require('./src/shortcodes/image');

// Import transforms
// const htmlMinTransform = require('./src/transforms/html-min-transform.js');
// const parseTransform = require('./src/transforms/parse-transform.js');

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(rssPlugin);
    eleventyConfig.addPlugin(syntaxHighlight);

    eleventyConfig.setDataDeepMerge(true);

    eleventyConfig.addWatchTarget('./src/sass/');
    eleventyConfig.addWatchTarget('./src/js/');

    eleventyConfig.addPassthroughCopy('src/robots.txt');
    eleventyConfig.addPassthroughCopy('./src/js');
    eleventyConfig.addPassthroughCopy('./src/favicon.ico');

    eleventyConfig.addPassthroughCopy('./src/images/jens.jpg');

    // Filters
    const readableDate = (dateObj) => {
        if (typeof dateObj === 'string') {
            dateObj = parseISO(dateObj);
        }
        return format(dateObj, 'PP', { locale: sv });
    };

    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    const htmlDateString = (dateObj) => {
        if (typeof dateObj === 'string') {
            dateObj = parseISO(dateObj);
        }
        return format(dateObj, 'yyyy-MM-dd');
    };

    eleventyConfig.addFilter('readableDate', readableDate);
    eleventyConfig.addFilter('htmlDateString', htmlDateString);

    // Shortcodes
    const year = () => {
        return `${new Date().getFullYear()}`;
    };
    const imageShortcode = async (
        src,
        alt,
        title,
        sizes = '(min-width: 30em) 50vw, 100vw'
    ) => {
        const metadata = await Image(src, {
            widths: [400, 800],
            outputDir: './public/img/',
        });

        const imageAttributes = {
            alt,
            title,
            sizes,
            loading: 'lazy',
            decoding: 'async',
        };

        // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
        return Image.generateHTML(metadata, imageAttributes, {
            whitespaceMode: 'inline',
        });
    };
    eleventyConfig.addShortcode('year', year);
    eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);

    const filterTagList = (tags) => {
        return (tags || []).filter(
            (tag) => ['all', 'nav', 'post', 'posts'].indexOf(tag) === -1
        );
    };

    eleventyConfig.addFilter('filterTagList', filterTagList);

    // Create an array of all tags
    eleventyConfig.addCollection('tagList', (collection) => {
        const tagSet = new Set();
        collection.getAll().forEach((item) => {
            (item.data.tags || []).forEach((tag) => tagSet.add(tag));
        });

        return filterTagList([...tagSet]);
    });

    // Transforms
    // eleventyConfig.addTransform('htmlmin', htmlMinTransform);
    // eleventyConfig.addTransform('parse', parseTransform);

    // Collections
    eleventyConfig.addCollection('pages', (collectionApi) =>
        collectionApi.getFilteredByGlob(['src/pages/*.md'])
    );

    eleventyConfig.addCollection('posts', (collectionApi) =>
        collectionApi.getFilteredByGlob('src/posts/*.md').reverse()
    );

    eleventyConfig.addCollection('projects', (collectionApi) =>
        collectionApi.getFilteredByGlob('src/projects/*.md').reverse()
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
