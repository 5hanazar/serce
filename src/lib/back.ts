// place files you want to import through the `$lib` alias in this folder.
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default prisma

export const getLocalTimestampInSeconds = () => {
    const now = new Date();
	return Math.round((now.getTime() - now.getTimezoneOffset() * 60000) / 1000);
}
export const formatTime = (time: number): string => {
    const today = new Date(time * 1000);
    const yyyy = today.getUTCFullYear();
    const mm = today.getUTCMonth() + 1;
    const dd = today.getUTCDate();
    const hh = today.getUTCHours();
    const m = today.getUTCMinutes();

    let smm = mm.toString();
    let sdd = dd.toString();
    let shh = hh.toString();
    let sm = m.toString();

    if (mm < 10) smm = "0" + mm;
    if (dd < 10) sdd = "0" + dd;
    if (hh < 10) shh = "0" + hh;
    if (m < 10) sm = "0" + m;
    return sdd + "." + smm + "." + yyyy + " " + shh + ":" + sm;
}
export const getRelativeTime = (timestamp: number): string => {
    const timeDifferenceInSeconds = Math.floor(getLocalTimestampInSeconds() - timestamp);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const interval in intervals) {
      const numberOfUnits = Math.floor(timeDifferenceInSeconds / intervals[interval]);
      if (numberOfUnits >= 1) {
        return `${numberOfUnits} ${interval}${numberOfUnits > 1 ? 's' : ''} ago`;
      }
    }

    return 'just now';
  }