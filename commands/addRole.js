module.exports = {
    name: 'addrole',
    description: 'Moderation command to add a role to someone',
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
        member.roles.add(role)
        console.log(`Added role ${role.name} to ${member.user.username} from ${message.guild.name}`)
        message.channel.send(`${member} was given the role ${role}!`)
    },
}
