import { Discord, Command, CommandMessage, CommandNotFound, Guard } from '@typeit/discord';
import { MessageEmbed } from 'discord.js';
import { AdminGuard } from './Guards';
import moment from 'moment';

import BirthdayHandler from './BirthdayHandler';
import BirthdayTools from './BirthdayTools';

function capitalizeFirstLetter(string: string) {
    const stringFormat = string.toLowerCase()
    return stringFormat.replace(/^./, string[0].toUpperCase());
}

@Discord(">")
abstract class HappyBirthdayWaifu {

    @Command("add :name :lastname :date :img")
    @Guard(AdminGuard)
    private addBirthday(message: CommandMessage) {
        // Capture mentions
        const users = message.mentions.users.array();
        let interested = '';
        users.forEach(user => interested = interested.concat(' <@' + user.id + '>'))

        // check if the fields are resolved
        let { name, lastname, date, img } = message.args;

        if(name && lastname && date && img) {
            // format names
            name = capitalizeFirstLetter(name);
            lastname = capitalizeFirstLetter(lastname);
            // Create Birthday
            const waifu = name + ' ' + lastname;
            const birthdayHandler = new BirthdayHandler(waifu, date, img, interested);
            birthdayHandler.createBirthday();
            return message.reply('waifu: ' + waifu + ' birthday: ' + date);
        }
        return message.reply('>add <name> <lastname> <day/month> <url>');
    }

    @Command("rm :id")
    @Guard(AdminGuard)
    private removeBirthday(message: CommandMessage) {
        BirthdayTools.removeBirthday(message.args.id);
        message.channel.send('Waifu removed');
    }

    @Command("edit :id :name :lastname :date :img")
    @Guard(AdminGuard)
    private editBirthday(message: CommandMessage) {
        const { id, name, lastname, date, img } = message.args;
        // Capture mentions
        const users = message.mentions.users.array();
        let interested = '';
        users.forEach(user => interested = interested.concat(' <@' + user.id + '>'));
        // Format names
        const waifu = capitalizeFirstLetter(name) + ' ' + capitalizeFirstLetter(lastname); 
        // Edit
        BirthdayTools.editBirthday(id, waifu, img, date, interested);
        return message.channel.send('Waifu edited');
    }

    @Command("birth :name :lastname")
    private async getBirthday(message: CommandMessage) {
        // get birthday
        let data;
        try {
            data = await BirthdayTools.getBirthday(message.args.name, message.args.lastname);
        } catch (error) {
            return message.channel.send('Waifu not found')
        }
        // create message
        const messageEmbed: MessageEmbed = new MessageEmbed({
            title: capitalizeFirstLetter(data.waifu),
            description: moment(data.date).format('DD - MMMM')
        }).setImage(data.img).setColor('PURPLE');
        // reply message
        return message.channel.send(messageEmbed)
    }

    @Command("list")
    private async getList(message: CommandMessage) {
        // Get list
        const data = await BirthdayTools.getList();
        // Create message
        const messageEmbed: MessageEmbed = new MessageEmbed()
        .setTitle('List')
        .setColor('PURPLE')
        .setDescription(data.map(item => {
            return `Waifu: ${item.waifu} Birthday: ${moment(item.date).format('DD, MMMM')} ID: ${item.key}`
        }));
        return message.channel.send(messageEmbed);
    }

    @Command("commands")
    private async commands(message: CommandMessage) {
        const messageEmbed: MessageEmbed = new MessageEmbed({
            title: 'Commands',
            description: `
            >add <name> <lastname> <day/month> <url> @mention user interested
            >birth <name> <lastname>
            >edit <ID> <name> <lastname> <day/month> <url> @mention user interested
            >rm <ID>
            >list
            `
        }).setColor('PURPLE');
        return message.channel.send(messageEmbed);
    }

    @CommandNotFound()
    private notFound(message: CommandMessage) {
        return message.reply('this command not found <:umiyado:705369169386012693>');
    }

    @Command("start")
    @Guard(AdminGuard)
    private async happyBirthday(message: CommandMessage) {
        setTimeout(async () => {
            // Get list
            const list = await BirthdayTools.getList();
            for (const key in list) {
                // Check the waifus birthday dates in the list with the current one
                if(moment(list[key].date, "YY-MM-DD").format("DD-MM") === moment().format("DD-MM")) {
                    // happy birthday message
                    const messageEmbed: MessageEmbed = new MessageEmbed({
                        title: 'Happy Birthday ' + capitalizeFirstLetter(list[key].waifu) + '!!!',
                        description: list[key].interested
                    }).setImage(list[key].img).setColor('PURPLE');
                    return message.channel.send(messageEmbed);
                }
            }
        }, 1000); // 144000000 = 24hrs
    }
}

export default HappyBirthdayWaifu;