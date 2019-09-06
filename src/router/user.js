export default ({
    state: {
        user_id: 0,
        user_check: false,
        user_name: '',
        avatar: '',
        data: []
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
        },
        addData(state, obj) {
            // console.log(obj);

            let arr = [...state.data];
            let check = arr.some((v, i) => {
                return v.item_id == obj.item_id;
            });
            // console.log(check);

            if (check) {
                //   console.log(111);
                for (let i in arr) {
                    if (arr[i].item_id == obj.item_id) {
                        arr[i].num++;
                    }
                }
            } else {
                obj.num = 1;
                arr.push(obj);
            }
            state.data = arr;
            // console.log(state.data)
        },
        minusData(state, obj) {
            let arr = [...state.data];
            for (let i in arr) {
                if (arr[i].item_id == obj.item_id) {
                    if (arr[i].num <= 1) {
                        arr.splice(i, 1)
                    } else {
                        arr[i].num--
                    }
                }
            }
            state.data = arr
        },
        del(state) {
            state.data = []
        }
    },
    actions: {},
    getters: {
        num: (state) => {
            let num = 0
            let arr = [...state.data];
            for (let i in arr) {
                num += arr[i].num
            }
            return num
        },
        price: (state) => {
            let price = 0
            let arr = [...state.data];
            for (let i in arr) {
                price += arr[i].num * arr[i].price
            }
            return price
        }
    },
})