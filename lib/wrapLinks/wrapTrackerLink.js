const TICKET_REGEXP = /([A-Z]+-\d+)/;

module.exports = function wrapTrackerLink(link) {
    const [ticket] = link.match(TICKET_REGEXP);

    return `[${ticket}](${link})`;
}