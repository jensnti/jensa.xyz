const { format } = require ('date-fns');
const { sv } = require('date-fns/locale');

module.exports = {

    readableDate: (dateObj) => {
        return format(dateObj, 'PPPP', { locale: sv });
    },

    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    htmlDateString: (dateObj) => {
        return format(dateObj, 'yyyy-MM-dd');
    }

};
