const jsdom = require('@tbranyen/jsdom');
const { JSDOM } = jsdom;
const minify = require('../utils/minify.js');
const slugify = require('slugify');
const getSize = require('image-size');

module.exports = function (value, outputPath) {
    if (outputPath.endsWith('.html')) {
        const DOM = new JSDOM(value, {
            resources: 'usable'
        });

        const document = DOM.window.document;
        const articleImages = [
            ...document.querySelectorAll('main article img, .intro img')
        ];
        const articleHeadings = [
            ...document.querySelectorAll('main article h2, main article h3')
        ];
        const articleEmbeds = [
            ...document.querySelectorAll('main article iframe')
        ];

        if (articleImages.length) {
            articleImages.forEach((image) => {
                image.setAttribute('loading', 'lazy');

                const file = image.getAttribute('src');

                if (file.indexOf('http') < 0) {
                    const dimensions = getSize('src' + file);

                    image.setAttribute('width', dimensions.width);
                    image.setAttribute('height', dimensions.height);
                }

                // If an image has a title it means that the user added a caption
                // so replace the image with a figure containing that image and a caption
                if (image.hasAttribute('title')) {
                    const figure = document.createElement('figure');
                    const figCaption = document.createElement('figcaption');

                    figCaption.innerHTML = image.getAttribute('title');

                    image.removeAttribute('title');

                    figure.appendChild(image.cloneNode(true));
                    figure.appendChild(figCaption);

                    image.replaceWith(figure);
                }
            });
        }

        if (articleHeadings.length) {
            // Loop each heading and add a little anchor and an ID to each one
            articleHeadings.forEach((heading) => {
                const headingSlug = slugify(heading.textContent.toLowerCase());
                const anchor = document.createElement('a');

                anchor.setAttribute('href', `#${headingSlug}`);
                anchor.classList.add('anchor');
                anchor.innerHTML = minify(`
        <span class="visually-hidden"> permalink</span>
        <svg fill="currentColor" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M14.78 3.653a3.936 3.936 0 115.567 5.567l-3.627 3.627a3.936 3.936 0 01-5.88-.353.75.75 0 00-1.18.928 5.436 5.436 0 008.12.486l3.628-3.628a5.436 5.436 0 10-7.688-7.688l-3 3a.75.75 0 001.06 1.061l3-3z"></path><path d="M7.28 11.153a3.936 3.936 0 015.88.353.75.75 0 001.18-.928 5.436 5.436 0 00-8.12-.486L2.592 13.72a5.436 5.436 0 107.688 7.688l3-3a.75.75 0 10-1.06-1.06l-3 3a3.936 3.936 0 01-5.567-5.568l3.627-3.627z"></path>
        </svg>
        `);

                heading.setAttribute('id', `${headingSlug}`);
                heading.appendChild(anchor);
            });
        }

        // Look for videos are wrap them in a container element
        if (articleEmbeds.length) {
            articleEmbeds.forEach((embed) => {
                if (embed.hasAttribute('allowfullscreen')) {
                    const player = document.createElement('div');

                    player.classList.add('video-player');

                    player.appendChild(embed.cloneNode(true));

                    embed.replaceWith(player);
                }
            });
        }

        return '<!DOCTYPE html>\r\n' + document.documentElement.outerHTML;
    }
    return value;
};
