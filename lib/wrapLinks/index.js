const URL_REGEXP = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g;

const WRAPPERS = {
    'st.yandex-team.ru': require('./wrapTrackerLink')
};

module.exports = function wrapLinks(content) {
    return content.replace(URL_REGEXP, (match) => {
        const { host } = new URL(match);

        if (WRAPPERS[host]) {
            return WRAPPERS[host](match);
        }

        return match;
    })
}