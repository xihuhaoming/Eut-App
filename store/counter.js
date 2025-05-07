import {
	defineStore
} from 'pinia'

export const useCounterStore = defineStore('counter', {
	state: () => {
		return {
			userInfo: {},
			pageSize: 10,
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