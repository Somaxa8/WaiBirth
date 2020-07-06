import { GuardFunction } from "@typeit/discord";
import dotenv from 'dotenv'
dotenv.config()

export const AdminGuard: GuardFunction<"message"> = ([message], client, next, guardDatas) => {
    if (message.author.id === process.env.ADMIN_ID) {
        next();
    } else {
        message.reply('You are not authorized');
    }
}