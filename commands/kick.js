module.exports = {
    name: 'kick',
    description: 'Moderation command to kick a member',
    args: true,
    usage: '<user>',
    guildOnly: true,
    permissions: 'KICK_MEMBERS',
    execute(message, args) {
        const member = message.mentions.members.first()

        if (!member) {
            return message.channel.send(`${args[0]} is not a member.`)
        }

        member.kick()
            .then(member => console.log(`Kicked ${member.user.username} from ${message.guild.name}`))
        message.channel.send(`${member} has been kicked!`)
    },
}
