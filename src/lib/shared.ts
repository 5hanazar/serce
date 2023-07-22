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