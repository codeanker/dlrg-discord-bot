/* eslint-disable no-console */
/* eslint-disable no-fallthrough */
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const requireUncached = require('require-uncached');
module.exports = async function(app) {

    client.login(app.get('botToken'));

    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });

    let channel_controller_message_id = app.get('channel_controller_message_id')
    let channel_controller_category_id = app.get('channel_controller_category_id')

    client.on('messageReactionAdd', async (reaction, user) => {
        //console.log("channels:", client.channels.find(channel => channel.ownerId === user.id))
        console.log("user: ", user.id)
        //channels =  await client.channels.cache.find(channel => channel.id)

        channels = await client.channels.cache.map(channel => Object.seal(channel))
        console.log("channels:", channels)
        //console.log("channelGuild", channels.guild.channels.find(channel => true))

        //id === '784800868930158612'
        /*if (reaction.message.id.toString() == channel_controller_message_id) {
            reaction.message.guild.channels.create(user.username, {
                type: "voice"
            }).then(async channel => {
                await channel.setParent(channel_controller_category_id);
                await channel.updateOverwrite(user.id, { MANAGE_CHANNELS: true });
                var deletionInterval = setInterval(function () {
                    deleteIfEmpty(channel, deletionInterval);
                    reaction.users.remove(user.id);
                }, 20000);
                // console.log("channel: ", channel)
                // console.log("channelId: ", channel.id)


            }).catch(err => {
                console.log(err)
            })
        }*/
    })

    client.on('messageReactionRemove', async (recation, user) => {
        //console.log(re.channels)
        //console.log('user', user)
        //console.log('remove', recation)
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

    let channel_controller_id = app.get('channel_controller_id')

    client.on('message', msg => {
        if (msg.content === '!addChannelCreateReaction') {
            client.channels.fetch(channel_controller_id)
            .then((channel) => {
                channel.send("Erstelle einen neuen Voice Channel.").then(message => {
                    message.react("✅")
                })
            }).catch(error => console.log("bot.js, client.on('message')", error))
            msg.reply('Message erstellt');
        }
    });
}
