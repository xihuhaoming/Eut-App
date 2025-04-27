// import { mapState } from 'vuex';
export default {
    // computed: mapState(['pageSize']),
    methods: {
        API_getMyInfo() {
            return uni.$u.http.get('/app/myInfo/getMyInfo');
        },
        API_advise(data) {
            return uni.$u.http.post('/app/advise/addAdvise', data);
        },
      
    },
};
