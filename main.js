const { Telegraf } = require('telegraf') //Telegraf is a framework for building Telegram bots in Node.js
const { v4: uuidV4 } = require('uuid') //uuidV4 is a function that generates a unique identifier
require('dotenv').config() //dotenv is a module that loads environment variables from a .env file into process.environment
let factGenerator = require('./factGenerator') //factGenerator is a module that generates a random fact and image



const bot = new Telegraf(process.env.BOT_TOKEN) // Constructs a bot instance using the bot token from the .env file

bot.start((ctx) => { //ctx is the context object that contains information about the messageOrError
    let message = ` Please use the /fact command to receive a new fact`
    ctx.reply(message)
})



bot.command('fact', async (ctx) => {
    try {
        ctx.reply('Generating image, Please wait !!!')
        let imagePath = `./temp/${uuidV4()}.jpg`
        await factGenerator.generateImage(imagePath)
        await ctx.replyWithPhoto({ source: imagePath })
        factGenerator.deleteImage(imagePath)
    } catch (error) {
        console.log('error', error)
        ctx.reply('error sending image')
    }
})

bot.launch()