const logger = require('./logger')
const app = require('./app')
const port = app.get('port')
const server = app.listen(port)

const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

process.on('unhandledRejection', (reason, p) =>{
    console.log(reason)
    logger.error('Unhandled Rejection at: Promise ', p, reason)
})
  
server.on('listening', () =>
    logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
)
