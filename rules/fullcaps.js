module.exports = {
    name: 'fullcaps',
    description: 'Send a warning when receiving a fullcaps message',
    execute(message) {
        if (message.type === 'GUILD_MEMBER_JOIN') return

        if (message.toString() === message.toString().toUpperCase()) {
            message.reply('WE CAN SEE YOU! NO NEED TO WRITE IN FULLCAPS!')
        }
    },
}
