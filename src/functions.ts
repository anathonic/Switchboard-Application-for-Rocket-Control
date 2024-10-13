import moment from 'moment';

export function convertToUnixTimestamp(dateString: string) {
    const date = moment.utc(dateString, 'YYYY-MM-DD HH:mm:ss.SSSSSS');
    return date.valueOf();
}

export function createUnixTimestamp() {
    const now = moment();
    const seconds = now.unix();
    const milliseconds = now.millisecond();
    return seconds * 1000 + milliseconds;
}