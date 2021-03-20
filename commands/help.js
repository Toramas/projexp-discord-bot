const fs = require('fs')

module.exports = {
    name: 'help',
    description: 'List all avaible commands',
    args: false,
    usage: '',
    guildOnly: false,
    execute(message) {
        let str = ''
        const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js'))

        for (const file of commandFiles) {
            const command = require(`./${file}`)
            str += `${command.name}: ${command.description}\n`
        }

        message.channel.send(str, { code: true })
    },
}
