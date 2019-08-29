import Vue from 'vue'
import Vuex from 'vuex'
import VuePersist from 'vuex-persist'
import user from './router/user'
Vue.use(Vuex)
const vuexLocal = new VuePersist({
    storage: window.localStorage
})

export default new Vuex.Store({
    state: {
        geohash: ""
    },
    mutations: {
        setGeohash(state, geohash) {
            if (geohash) {
                state.geohash = geohash
            }
        }
    },
    modules: {
        user: user
    },
    plugins: [vuexLocal.plugin],
})