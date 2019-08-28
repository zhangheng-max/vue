import Vue from 'vue'
import Vuex from 'vuex'
import VuePersist from 'vuex-persist'
const vuexLocal = new VuePersist({
    storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user_id: localStorage.getItem("user_id") || 0,
    },
    mutations: {
        setId(state, id) {
            if (id) {
                state.user_id = id
            }
        }
    },
    actions: {},
    getters: {},
    plugins: [vuexLocal.plugin],

})