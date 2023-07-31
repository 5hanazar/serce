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
export const formToObj = (e: any) => {
    const data = Object.fromEntries(new FormData(e.target).entries());
	return data
}
export const clearForm = (e: any) => {
    Array.from(e.target.elements).forEach((input: any) => {
        if (input.tagName == 'INPUT') input.value = ""
    });
}
const COUNT_FORMATS =
[
  { // 0 - 999
    letter: '',
    limit: 1e3
  },
  { // 1,000 - 999,999
    letter: 'K',
    limit: 1e6
  },
  { // 1,000,000 - 999,999,999
    letter: 'M',
    limit: 1e9
  },
  { // 1,000,000,000 - 999,999,999,999
    letter: 'B',
    limit: 1e12
  },
  { // 1,000,000,000,000 - 999,999,999,999,999
    letter: 'T',
    limit: 1e15
  }
];
export const formatStar = (value: number) => {
    const format = COUNT_FORMATS.find(format => (value < format.limit));
    value = (1000 * value / format!.limit);
    value = Math.floor(value * 10) / 10; // keep one decimal number, only if needed
    return (value + format!.letter);
}
export function enhance(form: HTMLFormElement) {
	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		const data = new FormData(form);

		await fetch(form.action, {
			method: form.method,
			body: data,
		});
	}

	form.addEventListener("submit", handleSubmit);

	return {
		destroy: () => {
			form.removeEventListener("submit", handleSubmit);
		},
	};
}
