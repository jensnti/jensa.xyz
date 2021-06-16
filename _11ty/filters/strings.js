const slugify = require('slugify');

module.exports = {
    capitalize: (str) => {
        return s.charAt(0).toUpperCase() + s.slice(1);
    },

    slugUrl: (str) => {
        return slugify(str, {
            lower: true,
            strict: false,
            remove: /["]/g
        });
    }
};
