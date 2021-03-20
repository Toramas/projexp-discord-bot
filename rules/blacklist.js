const blacklist = require('../data/blacklist.json')

module.exports = {
    name: 'blacklist',
    description: 'Remove the message and send a warning if it contains a blacklisted term',
    execute(message) {
        for (let bl_word of blacklist.words) {
            if (message.toString().toLowerCase().includes(bl_word)) {
                message.delete({ timeout: 750 })
                .then(msg => {
                    console.log(`Deleted message from ${msg.author.username} for the reason: blacklist word`)
                    msg.reply('your message has been deleted because it contains a word from the blacklist.')
                })
                return
            }
        }
    },
}
