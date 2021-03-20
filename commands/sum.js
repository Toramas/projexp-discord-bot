module.exports = {
    name: 'sum',
    description: 'Make the sum of all the arguments',
    args: true,
    infiniteArgs: true,
    usage: '<number>...',
    guildOnly: false,
    execute(message, args) {
        const numArgs = args.map(x => parseFloat(x))
        const sum = numArgs.reduce((counter, x) => counter += x)
        message.reply(`the sum of all the arguments you provided is ${sum}!`)
    },
}
