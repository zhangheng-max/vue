import Vue from 'vue'
import Vuex from 'vuex'
import VuePersist from 'vuex-persist'

Vue.use(Vuex)
const vuexLocal = new VuePersist({
    storage: window.localStorage
})

export default new Vuex.Store({
    state: {
        user_id: 0,
        user_cheack: false,
        geohash: ""
    },
    mutations: {
        setId(state, id) {
            if (id) {
                state.user_id = id
                state.user_cheack = true
            } else {
                state.user_cheack = false
            }
        },
        setGeohash(state, geohash) {
            if (geohash) {
                state.geohash = geohash
            }
        }
    },
    actions: {},
    getters: {},
    plugins: [vuexLocal.plugin],
})