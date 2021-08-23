#!/usr/bin/env node

const commander = require('commander');
const TodoistApi = require('../lib/api');

try {
    require('dotenv').config();
} catch (e) {}

const program = new commander.Command();
const api = new TodoistApi(process.env.TODOIST_TOKEN);

program
    .version(require('../package').version)
    .usage('[options]')
    .description('Создаёт задачу в Todoist')
    .option('-c, --content [content]', 'Контент задачи', String)
    .option('-p, --project_id [project_id]', 'Id проекта', Number)
    .option('-d  --due [due]', 'Дата выполнения', String)
    .option('-t --tags [tags]', 'Теги', (tags) => tags.split(',').map(Number))
    .option('-D, --dry-run [dryRun]', 'Не создавать файлы и папки', Boolean)
    .action(({ dryRun, content, project_id, due, tags }) => {
        dryRun ||
            api
                .createTask({
                    content,
                    project_id,
                    due_string: due,
                    due_lang: 'en',
                    label_ids: Array.isArray(tags) ? tags : [],
                })
                .then(({ status, data }) => {
                    if (status === 200) {
                        process.stdout.write('SUCCESS\n');
                    } else {
                        process.stderr.write(`FAILED ${status}\n`);
                    }
                })
                .catch((e) => process.stderr.write(e.message));
    })
    .command('tags', 'Показывает список тегов', { executableFile: 'tags' });

program.parse(process.argv);
