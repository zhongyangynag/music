import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    inputM:[]
  },
  mutations:{
    INPUT(state, payload) {
      state.inputM=payload;
    },
  }
})
// 简单的计数
