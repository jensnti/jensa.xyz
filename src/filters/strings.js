const slugify = require('slugify');

module.exports = {
    capitalize: (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    slugUrl: (str) => {
        return slugify(str, {
            lower: true,
            strict: false,
            remove: /["]/g
        });
    }
};
