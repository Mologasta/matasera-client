import * as moment from 'moment';

export function formatDate(date: string | Date): string {
    return moment(date).utc(true).format();
}