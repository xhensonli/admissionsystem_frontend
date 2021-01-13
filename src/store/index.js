import Vue from 'vue'
import Vuex from 'vuex'
import {request} from "../network/request";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: 0,
    isLogin: false
  },
  mutations: {
    setStatus(state, s){
      state.status = s;
    },
    doLogin(state){
      state.isLogin = true;
    },
    doLogout(state){
      state.isLogin = false;
    }
  },
  actions: {
    getStatus(context){
      // this.setLoading();
      request({
        url: 'status/getStatus'
      }).then(res => {
        if (res.code === '000') {
          let state = res.data === null ? 0 : res.data;
          context.commit("setStatus", state)
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => {
        this.$message.error('系统错误')
      })
    }
  },
  modules: {
  }
})
