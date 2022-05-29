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
const path = require('path');
const markdownItAnchor = require('markdown-it-anchor');

const prettier = require('prettier');
// const imageShortcode = require('./src/shortcodes/image');

// Import transforms
// const htmlMinTransform = require('./src/transforms/html-min-transform.js');
// const parseTransform = require('./src/transforms/parse-transform.js');

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(rssPlugin);
    eleventyConfig.addPlugin(syntaxHighlight);

    // eleventyConfig.setDataDeepMerge(true);

    eleventyConfig.addWatchTarget('./src/sass/');
    eleventyConfig.addWatchTarget('./src/js/');

    eleventyConfig.addPassthroughCopy('src/robots.txt');
    eleventyConfig.addPassthroughCopy('./src/js');
    eleventyConfig.addPassthroughCopy('./src/favicon.ico');
    eleventyConfig.addPassthroughCopy('./src/assets/');

    eleventyConfig.addPassthroughCopy('./src/images/jens.jpg');

    // Filters

    eleventyConfig.addFilter('getDemo', function (demos, title) {
        return demos.find((demo) => demo.data.title === title);
    });

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

    const tagCountCss = (count) => {
        const prefix = 'tag-cloud__item--';
        if (count < 2) {
            return `${prefix}100`;
        } else if (count < 4) {
            return `${prefix}200`;
        } else {
            return `${prefix}300`;
        }
    };

    eleventyConfig.addFilter('tagCountCss', tagCountCss);
    eleventyConfig.addFilter('readableDate', readableDate);
    eleventyConfig.addFilter('htmlDateString', htmlDateString);
    eleventyConfig.addFilter('linebreak', (str) => str.split(' ').join('\n'));

    // Shortcodes
    const year = () => {
        return `${new Date().getFullYear()}`;
    };
    const imageShortcode = async (
        src,
        alt,
        title,
        sizes = '100vw'
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

    // collections

    // Get only content that matches a tag
    eleventyConfig.addCollection('demos', function (collectionApi) {
        return collectionApi.getFilteredByTag('demos');
    });

    eleventyConfig.addCollection('orderedDemos', function (collectionApi) {
        return collectionApi.getFilteredByTag('demos').sort((a, b) => {
            return a.data.order - b.data.order;
        });
    });

    eleventyConfig.addCollection('pages', (collectionApi) =>
        collectionApi.getFilteredByGlob(['src/pages/*.md', 'src/projects/index.*'])
        .sort((a, b) => b.data.order - a.data.order)
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
            .slice(0, 15)
    );

    const markdownLibrary = markdownIt({
        html: true,
        breaks: true,
        linkify: true,
        typographer: true,
    })
        .use(markdownItAnchor, {
            permalink: true,
            permalinkClass: 'anchor',
            permalinkSymbol: '#',
            permalinkSpace: true,
            permalinkBefore: true,
            level: [1, 2, 3],
            slugify: (s) =>
                s
                    .trim()
                    .toLowerCase()
                    .replace(/[\s+~\/]/g, '-')
                    .replace(/[().`,%·'"!?¿:@*]/g, ''),
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

    // eleventyConfig.addTransform('prettier', function (content, outputPath) {
    //     // https://github.com/11ty/eleventy/issues/1314#issuecomment-657999759
    //     const extname = path.extname(outputPath);
    //     switch (extname) {
    //         case '.html':
    //         case '.json':
    //             // Strip leading period from extension and use as the Prettier parser.
    //             const parser = extname.replace(/^./, '');
    //             return prettier.format(content, { parser });

    //         default:
    //             return content;
    //     }
    // });

    return {
        dir: {
            input: 'src',
            output: 'public',
        },
        passthroughFileCopy: true
    };
};
