export default ({
    state: {
        user_id: 0,
        user_check: false,
        user_name: '',
        avatar: ''
    },
    mutations: {
        userSetId(state, obj) {
            let arr = state
            arr.user_id = obj.user_id
            arr.user_check = obj.user_check
            arr.user_name = obj.user_name
            arr.avatar = obj.avatar
            state = arr
                // console.log(obj.user_check);
        },
        Danger(state) {
            state.user_id = 0
            state.user_check = false
            state.user_name = ''
            state.avatar = ''
        },
        Avatar(state, avatar) {
            state.avatar = avatar
        }
    },
    actions: {},
    getters: {

    },
})