module.exports = {
    name: 'ban',
    description: 'Moderation command to ban a user',
    args: true,
    usage: '<user>',
    guildOnly: true,
    permissions: 'BAN_MEMBERS',
    execute(message, args) {
        const user = message.mentions.users.first()

        if (!user) {
            return message.channel.send(`${args[0]} is not a user.`)
        }

        message.guild.members.ban(user)
            .then(user => console.log(`Banned ${user.username || user.id || user} from ${message.guild.name}`))
        message.channel.send(`${user} has been banned!`)
    },
}
