import { initCreateForm, detailEditForm } from "../helpers/util"
import router from '../router'

export default {

    SET_STRUCTURE(state, payload) {
        state.model = payload.model
        initCreateForm(state.model.form_fields)
    },

    SET_DETAIL(state, payload) {
        state.model = payload.model
        console.log("DETAIL")
        console.log(state.model.form_fields)
        console.log(payload.data)
        detailEditForm(payload.data, state.model.form_fields)
        console.log("DETAIL")
        console.log(state.model.form_fields)
    },

    AUTHENTICATE(state, payload) {
        state.account.authenticated = true
        state.account.username = payload.username
    },

    JIRA(state, payload) {
        state.jira.authenticated = true
        state.jira.token = payload.token
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
        state.account.authenticated = false
        state.jira.authenticated = false
        localStorage.removeItem('user-token')
        localStorage.removeItem('jira-token')
        state.account.username = null
        state.jira.token = null
        router.push('/login')
    },

    UPDATE_AUTH_STATUS(state, payload) {
        state.account.authenticated = payload
    },

    UPDATE_COLOUR(state, colour) {
        state.account.colour = colour
    }

}