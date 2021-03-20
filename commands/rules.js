const fs = require('fs')

module.exports = {
    name: 'rules',
    description: 'List all moderation rules applied by the bot',
    args: false,
    usage: '',
    guildOnly: false,
    execute(message) {
        let str = ''
        const ruleFiles = fs.readdirSync('./rules').filter(f => f.endsWith('.js'))

        for (const file of ruleFiles) {
            const rule = require(`../rules/${file}`)
            str += `${rule.name}: ${rule.description}\n`
        }

        message.channel.send(str, { code: true })
    },
}
