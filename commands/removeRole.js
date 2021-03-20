module.exports = {
    name: 'removerole',
    description: 'Moderation command to remove a role to someone',
    args: true,
    nbArgs: 2,
    usage: '<user> <role>',
    guildOnly: true,
    permissions: 'MANAGE_ROLES',
    execute(message, args) {
        const role = message.mentions.roles.first()
        if (!role) {
            return message.channel.send(`The role ${args[1]} does not exist.`)
        }

        const member = message.mentions.members.first()
        if (!member) {
            return message.channel.send(`${args[0]} is not a mention to a member.`)
        }
        member.roles.remove(role)
        console.log(`Removed role ${role.name} to ${member.user.username} from ${message.guild.name}`)
        message.channel.send(`The role ${role} was removed from ${member}!`)
    },
}
