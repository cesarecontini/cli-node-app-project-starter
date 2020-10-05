#!/usr/bin/env node

const program = require('commander');
const chalkPipe = require('chalk-pipe');
const rmdir = require('rmdir');
const Listr = require('listr');
const figlet = require('figlet');
const moment = require('moment');

const settings = require('./settings');

const pathToExpressoMachine = require('global-modules-path').getPath(
    'your-module-name'
);

const appName = settings.applicationName;
const year = settings.year;
const author = settings.author;
const slogan = settings.slogan;

const execute = (prog) => {
    console.log(chalkPipe('orange.bold')(`${appName} is starting....`));

    const tasks = new Listr(
        [{
                title: 'First task',
                task: () => console.log(chalkPipe('orange.bold')(`First task ${process.cwd()}`))
            },
            {
                title: 'First task',
                task: () => console.log(chalkPipe('orange.bold')(`Second task`))
            },
        ]
    );

    tasks
        .run()
        .then(() => {
            console.log();
            console.log(chalkPipe('orange.bold')('ALL DONE!'));
        }).catch(e => console.log(chalkPipe('bgRed.#cccccc')('ERROR!!', e.message)));

}
console.log(JSON.stringify(program))
program
    .version('0.1.0')
    .name(`${appName}`)
    .usage(`-i ${appName} l- option1,option2`)
    .option('-i --init', 'Initialize & execute!')
    .option(
        '-a, --about',
        `About ${appName} cli`
    )
    .parse(process.argv);

if (program.about) {
    figlet(`${appName}`, (err, data) => {
        if (err) {
            console.log('Something went wrong');
            console.dir(err);
            return;
        }
        console.log(chalkPipe('orange.bold')(''));
        console.log(chalkPipe('orange.bold')(`${slogan}`));
        console.log(chalkPipe('orange.bold')(data));
        console.log(chalkPipe('orange.bold')(''));
        console.log(chalkPipe('orange.bold')(`(c) ${year} ${author}`));
        console.log(chalkPipe('orange.bold')('\n'));
    });
}

if (!program.about && program.init) {
    execute(program);
}