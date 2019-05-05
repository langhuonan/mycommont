let AppName = 'answer_game';

export default {
	//生成uuid
	createNewUUID:function(len, radix) {
		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
		var uuid = [], i;
		radix = radix || chars.length;

		if (len) {
			// Compact form
			for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
		} else {
			// rfc4122, version 4 form
			var r;

			// rfc4122 requires these characters
			uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
			uuid[14] = '4';

			// Fill in random data. At i==19 set the high bits of clock sequence as
			// per rfc4122, sec. 4.1.5
			for (i = 0; i < 36; i++) {
				if (!uuid[i]) {
					r = 0 | Math.random()*16;
					uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
				}
			}
		}

		return uuid.join('');
	},
	getTimeStamp:function () {
		return Date.parse(new Date());
	},
	getStorePrefix:function () {
		var prefix = localStorage.getItem(AppName);
		if (!prefix){
			prefix = this.createNewUUID(8)+'_';
			localStorage.setItem(AppName,prefix);
		}
		return prefix;
	},
	setItem:function (name,data,time) {
		//失效时间戳
		var timestamp = Date.parse(new Date());
		if (time===undefined){
			time = 3600*24;
		}
		time = time*1000+timestamp;
		//保存名前缀
		name = this.getStorePrefix()+name;
		var item = {
			data:data,
			expires_at:time
		};
		localStorage.setItem(name,JSON.stringify(item));
		return true;
	},
	getItem:function (name) {
		name = this.getStorePrefix()+name;
		var item = localStorage.getItem(name);
		if (!item){
			return false;
		}
		var data = JSON.parse(item);
		if  (data.expires_at<this.getTimeStamp()){
			localStorage.removeItem(name);
			return false;
		}
		return data.data;
	},
	toPostData:function (data) {
		let str = '';
		for (let item in data){
			str += item+'='+data[item]+'&'
		}
		if (str.length>0){
			str = str.substring(0,str.length-1);
		}
		return str
	},
	getQueryParam:function (name) {
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i=0;i<vars.length;i++) {
			var pair = vars[i].split("=");
			if(pair[0] == name){
				return pair[1];
			}
		}
		return false;
	},
	showError:function (title,msg) {
		alert(title)
	}
}