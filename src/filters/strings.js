const slugify = require('slugify');

const capitalize = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
};

const slugUrl = (str) => {
    return slugify(str, {
        lower: true,
        strict: false,
        remove: /["]/g,
    });
};

module.exports = { capitalize, slugUrl };
