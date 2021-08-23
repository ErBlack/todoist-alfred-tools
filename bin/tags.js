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
    .description('Показывает список тегов')
    .action(({ dryRun, content, project_id, due }) => {
        dryRun ||
            api.getTags().then(({ status, data }) => {
                if (status === 200) {
                    process.stdout.write(`${JSON.stringify(data, 0, 4)}\n`);
                } else {
                    throw new Error(`FAILED ${status}\n`);
                }
            });
    });

program.parse(process.argv);
