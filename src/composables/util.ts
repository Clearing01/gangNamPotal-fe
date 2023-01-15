import moment from 'moment';

export const Moment = {
	now: moment(),
	defaultMonth: moment().subtract(3, 'months').startOf('months'),
	nowYYYYMMDD: moment().format('YYYY-MM-DD'),
	getYYYY_MM_DD(date: any) {
		return moment(date).locale('ko').format('YYYY-MM-DD');
	},
	getYYYYMMDD(date: any) {
		return moment(date).locale('ko').format('YYYY.MM.DD');
	},
	getYYYYMM(date: any) {
		return moment(date).locale('ko').format('YYYY.MM');
	},
	diffDay(to: any, from: any) {
		return moment(from).diff(moment(to), 'days');
	},
	getDay(date: any) {
		return moment(date).day();
	},
	getWeekday(date: any) {
		return moment(date).weekday();
	},
	add(date: any, num: any) {
		return moment(date).add(num, 'days').format();
	},
};
