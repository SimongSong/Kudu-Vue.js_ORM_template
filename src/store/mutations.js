import {detailDataProcess, detailEditForm} from "../helpers/util"

export default {
  SET_DETAIL(state,payload) {
    state.model = payload.model
    console.log("DETAIL")
    console.log(state.model.form_fields)
    console.log(payload.data)
    detailEditForm(payload.data, state.model.form_fields)
    console.log("DETAIL")
    console.log(state.model.form_fields)
  },

  AUTHENTICATE(state, payload) {
    state.account.expired = false
    state.account.username = payload.username
  },

  LOADING(state) {
    state.loading = !state.loading
  },

  KILLLOADING(state) {
    console.log(state.loading)
    console.log("LOADING KILLED")
    state.loading = false
    console.log(state.loading)
  },

  LOGOUT(state) {
    console.log(this._vm.$session)
    state.account.expired = true
    localStorage.removeItem('user-token')
    state.account.username = null
    this._vm.$session.remove('token')
  }
  
}