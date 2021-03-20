module.exports = {
    name: 'ping',
    description: 'Return the ping of the message',
    args: false,
    usage: '',
    guildOnly: false,
    execute(message) {
        const timeDiff = Date.now() - message.createdTimestamp
        message.reply(`Pong! This message has a latency of ${timeDiff}ms.`)
    },
}
