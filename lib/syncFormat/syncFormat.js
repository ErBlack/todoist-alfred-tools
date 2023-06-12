module.exports = ({ id, due, is_completed, content }) =>
    `- [${is_completed ? 'x' : ' '}] ${content} 📅${due?.date} #todoist %%[todoist_id:: ${id}]%%`;
