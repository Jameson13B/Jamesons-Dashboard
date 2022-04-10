/**
 * Deploy
 *
 * To deploy run:
 *   `npm run my [deploy]`
 *   `npm run my [deploy] -- --help`
 */

/* eslint no-console: "off" */

const colors = require('colors/safe')
const commander = require('commander')

// Logging utils
const logInfo = (text) => console.log(colors.green(text))
const logCommand = (text) => console.log(colors.cyan(text))
const logError = (text) => console.log(colors.red(text))
const exec = require('child_process').execSync
const execPrint = (command) => {
  logCommand(`Running: ${colors.bold(command)}`)
  // exec(command, { stdio: 'inherit' })
}
const currentBranch = getCurrentBranch()

commander.description('CLI for developers to interact with app.').version('0.1.0')

commander
  .command('deploy')
  .description('Deploy master branch.')
  .usage('RUN: npm run my deploy')
  .action(() => {
    logInfo(`Starting Process: ${colors.bold('DEPLOYING')}...\n`)

    if (currentBranch !== 'master') {
      return logError('Error: You must be on `master` to deploy.')
    }

    execPrint('git fetch')
    logInfo(colors.magenta.bold('Master is up to date.\n'))
    execPrint('npm run build')
    logInfo(colors.magenta.bold('Built newest changes. Output: ./build/index.html\n'))
    execPrint('firebase deploy')
    logInfo(
      colors.magenta.bold('Deployed!! See your changes here: https://toy-apps-ed6c0.web.app/'),
    )
    logDone()
  })

function getCurrentBranch() {
  const match = exec('git branch')
    .toString()
    .match(/\* (.+)/)

  return match && match[1]
}
function logDone() {
  logInfo('\nFinished.')
  // logInfo('To see the status of the build visit:\n  https://gitlab.mx.com/mx/raja/pipelines')
}

/**
 * MAIN LOGIC
 */
//  const noArgsProvided = !process.argv.slice(2).length

//  if (noArgsProvided) commander.outputHelp(colors.red)

commander.parse()
