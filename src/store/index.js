import Vue from 'vue'
import Vuex from 'vuex'

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
  },
  modules: {
  }
})
