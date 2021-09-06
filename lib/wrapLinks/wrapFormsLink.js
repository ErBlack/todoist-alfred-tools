const FORM_ID_REGEXP = /\/surveys\/(\d+)/

const defaultWrap = require('./wrapLink')('FORMS');

module.exports = function wrapFormsLink(link) {
    const [, formId] = link.match(FORM_ID_REGEXP);

    if (formId) {
        return `[FORM#${formId}](${link})`;
    }

    return defaultWrap(link);
}