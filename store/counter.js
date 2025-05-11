import {
	defineStore
} from 'pinia'

import {
	APIURL,
	basePath
} from '@/config';
export const useCounterStore = defineStore('counter', {
	state: () => {
		return {
			userInfo: {},
			pageSize: 10,
			UPLOADURL: `${APIURL}/common/upload`, //上传地址
		}
	},
	// 也可以定义为
	// state: () => ({ count: 0 })
	actions: {
		setUserinfo(e) {
			this.userInfo = e;
		}
	},
})