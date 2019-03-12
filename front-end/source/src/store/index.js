import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
//создаем новое локальное хранилище
export default new Vuex.Store({
  //указываем состояние локального хранилища
  state: {
    //изначальный статус строкового значение является пустым
    status: '',
    //
    token: localStorage.getItem('token') || '',
    // user : {}
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    login({commit}, user){
      return new Promise((resolve, reject) => {
        let myRequest = new XMLHttpRequest();
        myRequest.onreadystatechange = function() {
          try {
            if (myRequest.readyState == 4) {
              localStorage.setItem('token', myRequest.response.token);
              commit('auth_request');
              resolve();
            }
          }
          catch (err) {
            reject();
          }
        };
        myRequest.responseType = 'json';
        myRequest.open('POST', `${Host}/login`);
        myRequest.setRequestHeader('Content-Type', 'application/json');
        myRequest.send(JSON.stringify(user));
      })
    },
    register({commit}, newUser){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        let myRequest = new XMLHttpRequest();
        myRequest.onreadystatechange = function() {
          try {
            if (myRequest.readyState == 4) {
              // console.log(myRequest.response);
              commit('auth_request');
              resolve();
            }
          }
          catch (err) {
            reject();
          }
        };
        myRequest.responseType = 'json';
        myRequest.open('PUT', `${Host}/user`);
        myRequest.setRequestHeader('Content-Type', 'application/json');
        myRequest.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
        myRequest.send(JSON.stringify(newUser));
      })
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})
