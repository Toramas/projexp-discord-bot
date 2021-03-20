const fs = require('fs')
const Discord = require('discord.js')
const config = require('./config.json')


const client = new Discord.Client()
client.commands = new Discord.Collection()
client.rules = new Discord.Collection()


const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}


const ruleFiles = fs.readdirSync('./rules').filter(f => f.endsWith('.js'))

for (const file of ruleFiles) {
    const rule = require(`./rules/${file}`)
    client.rules.set(rule.name, rule)
}


client.once('ready', () => {
    console.log('Ready!')
})

client.once('reconnecting', () => {
    console.log('Reconnecting!')
})

client.once('disconnect', () => {
    console.log('Disconnect!')
})


client.on('message', function(message) {
    if (message.author.bot) return
    if (!message.content.startsWith(config.prefix)) {
        client.rules.forEach(rule => rule.execute(message))
        return
    }

    const args = message.content.slice(config.prefix.length).split(' ')
    const commandName = args.shift().toLowerCase()

    if (!client.commands.has(commandName)) return

    const command = client.commands.get(commandName)

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command insides DMs!')
    }

    if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author)
        if (!authorPerms || !authorPerms.has(command.permissions)) {
            return message.reply('you don\'t have the required permission to use that command.')
        }
    }

    if (command.args) {
        if ((!command.infiniteArgs && args.length !== (command.nbArgs || 1))
        || (command.infiniteArgs && !args.length)) {
            let reply = `You didn't provide any arguments, ${message.author.username}!`

            if (command.usage) {
                reply += `\nThe proper usage would be: \`${config.prefix}${command.name} ${command.usage}\``
            }
            return message.channel.send(reply)
        }
    }

    try {
        command.execute(message, args)
    } catch (err) {
        console.error(err)
        message.reply('I encountered an error trying to execute that command!')
    }
})

client.login(config.bot_token)
