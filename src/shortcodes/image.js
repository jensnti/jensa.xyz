const Image = require('@11ty/eleventy-img');

async function imageShortcode(src, alt, title, sizes = '100%') {
    let metadata = await Image(src, {
        widths: [300, 600],
        outputDir: './public/img/'
    });

    let imageAttributes = {
        alt,
        sizes,
        title,
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