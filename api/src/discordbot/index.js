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
        // userId Daniel Swiatek = 602943190173089851
        // userId Swoitek = 774614171425833001
        
        if (reaction.message.id.toString() == channel_controller_message_id) {
            reaction.message.guild.channels.create(user.username, {
                type: "voice"
            }).then(async channel => {
                await channel.setParent(channel_controller_category_id);
                await channel.updateOverwrite(user.id, { MANAGE_CHANNELS: true });
                var deletionInterval = setInterval(function () {
                    deleteIfEmpty(channel, deletionInterval);
                    reaction.users.remove(user.id);
                }, 20000);
            }).catch(err => {
                console.log(err)
            })
        }
    })

    client.on('messageReactionRemove', async (recation, user) => {
        let channels = client.channels.cache
            .map(channel => Object.seal(channel))
            .filter(channel =>
                channel.type === 'voice' && channel.guild.ownerID === user.id && channel.parentID === '781923621425381377'
            )

       if(channels.length > 0) {
            channels.forEach(channel => {
                channel.delete()
            });
        }
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
