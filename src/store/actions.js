import axios from 'axios'
import { BASE_URL } from '../helpers/util'


export default {
  searchQuery({ commit }, payload) {
    return new Promise(function (resolve, reject) {
      if (!payload.query) reject("empty")
      axios.get(BASE_URL + 'kudusearch/' + payload.query, {
        headers: {
          Authorization: 'JWT ' + payload.token
        }
      })
        .then(r => {
          console.log("FFEE")
          resolve(r.data)
        })
        .catch(e => {
          console.log(e.response)
          reject(e.response)
        })
    })
  },

  loadData({ commit, dispatch, state }, payload) {
    console.log("LOAD DATA")
    let app_model = state.structure[payload.app][payload.model]
    let url = (payload.type === "list") ? app_model.list_api : (app_model.detail_api + payload.pk + "/")
    return new Promise(function (resolve, reject) {
      axios
        .get(BASE_URL + url, {
          headers: {
            Authorization: 'JWT ' + payload.token
          }
        })
        .then(r => {
          if (payload.type === "detail") commit('SET_DETAIL', { data: r.data, model: app_model })
          resolve(r.data)
        })
        .catch(e => {
          console.log(e)
          reject('fefe')
          // if(e.response.data.detail.includes("expired")) commit('LOGOUT')
        })
    })
  },

  loadRelationList({ commit, state }, payload) {
    console.log("LOADRELATIONINFO")
    let url = state.structure[payload.app][payload.model].list_api
    let list = payload.list.join(",")
    return new Promise(function (resolve, reject) {
      console.log(url)
      if (payload.list.length == 0) reject("empty")
      axios.get(BASE_URL + url, {
        params: {
          id__in: list
        },
        headers: {
          Authorization: 'JWT ' + payload.token
        }
      })
        .then(r => {
          resolve(r.data)
        })
        .catch(e => {
          console.log(e)
          reject(e.response)
        })
    })
  },

  login({ commit }, payload) {
    return new Promise(function (resolve, reject) {
      axios.post(BASE_URL + "auth/", {
        username: payload.username,
        password: payload.password
      }).then(res => {
        localStorage.setItem('user-token', res.data.token)
        resolve('authenticated');
        commit('AUTHENTICATE', { username: payload.username })
      }).catch(e => {
        console.log("ERROR")
        commit('LOGOUT')
        console.log(e)
        reject('wrong username or password')
      })
    });

  },

  refresh({ commit }, payload) {
    return new Promise(function (resolve, reject) {
      axios.post(BASE_URL + "auth/refresh/", {
        token: payload.token,
      }).then(res => {
        resolve('refreshed');
      }).catch(e => {
        commit('LOGOUT')
      })
    });
  }

}
