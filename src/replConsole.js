/**
 * Node REPL Console for testing & debugging purposes
 */
var repl = require('repl')

const db = require('./models')

const initRepl = async () => {
  try {
    await db.sequelize.authenticate()
    console.log('REPL: Connection has been established successfully.')

    // Start the repl session
    var replServer = repl.start({
      prompt: 'REPL> ',
    })

    // Attach modules to repl context
    Object.keys(db).forEach((model) => {
      replServer.context[model] = db[model]
    })
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

initRepl()
