import moment from 'moment';

export const Moment = {
	now: moment(),
	defaultMonth: moment().subtract(3, 'months').startOf('months'),
	nowYYYYMMDD: moment().format('YYYY-MM-DD'),
	getYYYY_MM_DD(date: Date) {
		return moment(date).locale('ko').format('YYYY-MM-DD');
	},
	diffDay(to: Date, from: Date) {
		return moment(from).diff(moment(to), 'days');
	},
	getDay(date: Date) {
		return moment(date).day();
	},
	getWeekday(date: Date) {
		return moment(date).weekday();
	},
	add(date: Date, num: any) {
		return moment(date).add(num, 'days').format();
	},
};
