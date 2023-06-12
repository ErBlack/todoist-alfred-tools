module.exports = ({ id, due, is_completed, content, labels = ['#todoist'] }) =>
    `- [${is_completed ? 'x' : ' '}] ${content} 📅${due?.date} ${labels.join(' ')} %%[todoist_id:: ${id}]%%`;
