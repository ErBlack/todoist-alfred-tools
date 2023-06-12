const from = '%%todosync%%';
const to = '%%/todosync%%';

module.exports = (content, tasks) => {
    const start = content.indexOf(from);
    const end = content.indexOf(to);

    if (start === -1 || end === -1) {
        return content;
    }

    return `${content.slice(0, start + from.length)}\n${tasks}\n${content.slice(end)}`;
};
