// import { mapState } from 'vuex';
import { http, toast} from '@/uni_modules/uview-plus'
// import { initRequest} from '../util/request/index.js'
export default {
	// computed: mapState(['pageSize']),
	methods: {
		// API_loginAccountLogin() {
		// 	return uni.$u.http.get('/login/accountLogin');
		// },
		API_loginAccountLogin(data) {
			return http.get('/login/accountLogin', {params: {...data,}});
		},
		API_advise(data) {
			return uni.$u.http.post('/app/advise/addAdvise', data);
		},

	},
};