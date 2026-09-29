const quoteFiles = (files) =>
  files.map((file) => JSON.stringify(file)).join(' ')

export default {
  '*.{css,html,js,jsx,json,md,yaml,yml}': (files) => {
    const clientScripts = files.filter(
      (file) =>
        file.includes('/client/') &&
        (file.endsWith('.js') || file.endsWith('.jsx')),
    )
    const tasks = [
      `prettier --write ${quoteFiles(files)}`,
      `cspell --no-progress --no-summary ${quoteFiles(files)}`,
    ]

    if (clientScripts.length > 0) {
      tasks.push(
        `npm exec --prefix client -- eslint --config client/eslint.config.js --fix ${quoteFiles(clientScripts)}`,
      )
    }

    return tasks
  },
}
