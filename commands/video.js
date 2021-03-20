const videos = require('../data/video.json')

module.exports = {
    name: 'video',
    description: 'Send the link to a requested video',
    args: true,
    usage: '<keyword>',
    guildOnly: false,
    execute(message, args) {
        const video = videos[args[0]]

        if (!video) {
            let str = 'Please precise a video among the following ones:\n'

            for (const i in videos) {
                str += `${videos[i].key}  --  ${videos[i].desc}\n`
            }
            return message.channel.send(str, { code: true })
        }
        message.channel.send(video.link)
    },
}
