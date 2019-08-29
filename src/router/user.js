export default ({
    state: {
        user_id: 0,
        user_check: false,
        user_name: ''
    },
    mutations: {
        userSetId(state, obj) {
            let arr = state
            arr.user_id = obj.user_id
            arr.user_check = obj.user_check
            arr.user_name = obj.user_name
            state = arr
                // console.log(obj.user_check);

        }
    },
    actions: {},
    getters: {

    },
})