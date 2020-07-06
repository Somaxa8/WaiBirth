import database from './config/firebase';
import { Birthday } from './types/Types';
import moment from 'moment';

class BirthdayTools {
    public static async getBirthday(name: string, lastname: string) {
        const waifu = name.toLowerCase() + ' ' + lastname.toLowerCase()
        try {
            const ref = database.ref('waifus/');
            const res = await ref.once("value")
            const list = res.val();
            for (const key in list) {
                if(list[key].waifu.toLowerCase() === waifu) {
                    return list[key];
                }
            }
        } catch (error) {
            return {
                waifu: 'not found',
                date: '/',
                img: ''
            };
        }
    }

    public static async getList() {
        try {
            const ref = database.ref('waifus/');
            const res = await ref.once("value")
            const list = res.val();
            const listArray: Array<Birthday> = Object.values(list);
            const keys = Object.keys(list)

            for(const key in keys) {
                listArray[key].key = keys[key];
            }
            return listArray;

        } catch (error) {
            console.log(error);
            return [];
        }
    }

    public static removeBirthday(id: string) {
        database.ref('waifus/' + id).remove();
    }

    public static editBirthday(id: string, waifu: string, img: string, birthday: Date, interested: string) {
        const date = moment(birthday, "DD-MM");
        database.ref('waifus/' + id).update({
            waifu: waifu,
            date: date.format(),
            img: img,
            interested: interested
        });
    }
}

export default BirthdayTools;
