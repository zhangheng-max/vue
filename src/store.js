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
            state.user_id = id
        },
        setGeohash(state, geohash) {
            if (geohash) {
                state.geohash = geohash
            }
        }
    },
    actions: {},
    getters: {
        user_cheack: (state) => {
            let check = false
            if (state.user_id != 0 && state.user_id != '') {
                check = true
            } else {
                check = false
            }
            return check
        }
    },
    plugins: [vuexLocal.plugin],
})