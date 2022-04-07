module.exports = {
    getReadingTime(text) {
        const wordsPerMinute = 200;
        const numberOfWords = text.split(/\s/g).length;
        const readingTime = Math.ceil(numberOfWords / wordsPerMinute);
        if (readingTime > 1) {
            return `${readingTime} minuters läsning`;
        } else {
            return `${readingTime} minuts läsning`;
        }
    },
    getPageLinks(page) {
        console.log(page);
    },
};
