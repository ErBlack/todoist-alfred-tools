#!/usr/bin/env node
const commander = require('commander');
const TodoistApi = require('../lib/api');
const fs = require('fs');
const syncFormat = require('../lib/syncFormat/syncFormat');
const replaceContent = require('../lib/syncFormat/replaceContent');

try {
    require('dotenv').config();
} catch (e) {}

const program = new commander.Command();
const api = new TodoistApi(process.env.TODOIST_TOKEN);

program
    .version(require('../package').version)
    .usage('[options]')
    .description('Sync todoist today tasks with today note')
    .option('-f --file [file]', 'Today note file', String)
    .action(async ({ file }) => {
        if (!fs.existsSync(file)) {
            console.log('File not found');

            return;
        }

        const tasks = (
            await api.getTasks({
                filter: 'today',
            })
        ).data;

        const tasksContent = tasks.map(syncFormat).join('\n');

        fs.writeFileSync(file, replaceContent(fs.readFileSync(file, 'utf-8'), tasksContent));
    });

program.parse(process.argv);
