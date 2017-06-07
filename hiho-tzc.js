class HTZC {
	constructor(offerset_in_minutes) {
		this.offset = offerset_in_minutes;
	}
	suffix(offset) {
		offset = -offset;
		if (offset == 0) return 'UTC';
		var positive_pad = '';
		if (offset > 0) positive_pad = '+';
		else positive_pad = '-';
		var tz = Math.abs(offset) / 60;
		var tz_pad = '';
		if(tz < 10) tz_pad = '0';
		return '(' + positive_pad + tz_pad + tz.toString() + '00)';
	}
	convert(time) { //time should be a string with format "2017-06-07 17:04 (+0800)"
		var year = parseInt(time.substring(0, 4));
		var month = parseInt(time.substring(5, 7));
		var day = parseInt(time.substring(8, 10));
		var hours = parseInt(time.substring(11, 13));
		var minutes = parseInt(time.substring(14, 16));
		var tz_offset = parseInt(time.substring(18, 21));

		var fake_time = new Date(Date.UTC(year, month-1, day, hours, minutes, 0, 0));
		var utc_time = new Date();
		utc_time.setTime(fake_time.getTime() - 1000 * 60 * 60 * tz_offset);
		var local_time = new Date();
		local_time.setTime(utc_time.getTime() - 1000 * 60 * this.offset);
		return local_time.toISOString().substring(0, 16).replace('T', ' ' ) + ' ' + this.suffix(this.offset);
	}
}
