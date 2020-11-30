const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const auth = require('./auth.json');
const requireUncached = require('require-uncached');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('messageReactionAdd', async (reaction, user) => {
    settings = requireUncached('./settings.json')
    if (reaction.message.id.toString() == settings.channel_controller_message_id) {
        reaction.message.guild.channels.create(user.username, {
            type: "voice"
        }).then(async channel => {
            await channel.setParent(settings.channel_controller_category_id);
            await channel.updateOverwrite(user.id, { MANAGE_CHANNELS: true });
            var deletionInterval = setInterval(function () {
                deleteIfEmpty(channel, deletionInterval);
                reaction.users.remove(user.id);
            }, 20000);
            console.log(channel)
            console.log(user)
            
        }).catch(err => {
            console.log(err)
        })
    }
})

client.on('messageReactionRemove', async (recation, user) => {
    settings = requireUncached('./settings.json')
    console.log(client.channels)
    console.log('user', user)
    console.log('remove', recation)
})

function deleteIfEmpty(channel, interval) {
    if (channel.members.size <= 0) {
        channel.delete();
        clearInterval(interval);
    }
}

function getEmojiName(emoji) {
    var emoji_regex = /[\u1000-\uFFFF]+/g;
    if (emoji_regex.test(emoji.name)) {
        return emoji.name.codePointAt(0).toString(16);
    } else {
        return emoji.name;
    }
}

client.login(auth.token);

client.on('message', msg => {
    settings = requireUncached('./settings.json');
    if (msg.content === '!addChannelCreateReaction') {
        client.channels.fetch(settings.channel_controller_id)
        .then((channel) => {
            channel.send("Erstelle einen neuen Voice Channel.").then(message => {
                message.react("✅")
            })
        }).catch(error => console.log("bot.js, client.on('message')", error))
        msg.reply('Message erstellt');
    }
});