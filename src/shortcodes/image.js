const Image = require('@11ty/eleventy-img');

async function imageShortcode(src, alt, sizes) {
    let metadata = await Image(src, {
        widths: [600],
        formats: ['avif', 'jpeg'],
        outputDir: './public/images/'
    });

    let imageAttributes = {
        alt,
        sizes,
        loading: 'lazy',
        decoding: 'async'
    };

    // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes, {
        whitespaceMode: 'inline'
    });
}

module.exports = {
    image: imageShortcode
};
