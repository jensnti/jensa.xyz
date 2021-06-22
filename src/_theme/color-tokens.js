// Example color-tokens.js
const meta = require('../_data/meta');

module.exports = [
    // {
    //     /*
    //      * `name` - Required
    //      * Any string, will be used for color reference
    //      */
    //     name: 'primary',
    //     /*
    //      * `color` - Required
    //      * Any valid CSS color value
    //      */
    //     color: '#078080'
    //     //   onColor: "#25282a",
    //     /*
    //      * `onColor` - Optional
    //      * enum: undefined | "[css color value]" | false
    //      *
    //      * If undefined, will be generated as relative tone of `color`
    //      * that meets contrast according to `ratioKey`
    //      *
    //      * If a color value provided, will still be checked for contrast
    //      * and a warning comment added if it doesn't pass
    //      *
    //      * Set to `false` to omit generation
    //      */
    //     /*
    //      * `ratioKey` - Optional
    //      * enum: undefined | "small" (default) | "large"
    //      *
    //      * Corresponds to mimimum contrast for either normal text ("small" = 4.5)
    //      * or large text/user interface components ("large" = 3)
    //      */
    // },
    {
        name: 'light',
        color: '#cdd1db'
    },
    {
        name: 'gray',
        color: '#6d7488'
    },
    {
        name: 'black',
        color: '#2d303c'
    },
    {
        name: 'white',
        color: '#e7e9ee'
    },
    {
        name: 'dm-primary',
        color: '#e17f5c',
        onColor: '#2d303c'
    },
    {
        name: 'dm-secondary',
        color: '#7daaab',
        onColor: '#2d303c'
    },
    {
        name: 'dm-tertiary',
        color: '#d75c64',
        onColor: '#2d303c'
    },
    {
        name: 'lm-primary',
        color: '#e17f5c',
        onColor: '#e7e9ee'
    },
    {
        name: 'lm-secondary',
        color: '#7daaab',
        onColor: '#e7e9ee'
    },
    {
        name: 'lm-tertiary',
        color: '#d75c64',
        onColor: '#e7e9ee'
    }
];
