import {
  mapState
} from 'vuex';
export default {
  computed: mapState(['pageSize']),
  methods: {
    API_coupon(data) {
      let {
        pageSize
      } = this;
      return uni.$u.http.get('/app/coupon/query', {
        params: {
          ...data,
          pageSize:10
        }
      });
    },
 
    API_readMessage(data) {
      return uni.$u.http.post('/app/message/readMessage', data);
    },
    API_getholdCoupon(params) {
      return uni.$u.http.get('/app/coupon/holdCoupon', {
        params
      });
    },

  
  },
};