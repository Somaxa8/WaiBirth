import moment from 'moment';
import database from './config/firebase';

class BirthdayHandler {
    private waifu: string;
    private date: Date;
    private img: string;
    private interested: string;

    constructor(waifu: string, date: Date, img: string, interested: string ) {
        this.waifu = waifu;
        this.date = date;
        this.img = img;
        this.interested = interested;
    }

    public createBirthday(): void {
        const date = moment(this.date, "DD-MM");
        database.ref('waifus/').push({
            waifu: this.waifu,
            date: date.format(),
            img: this.img,
            interested: this.interested
        });
    }
}

export default BirthdayHandler;