import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
// import Home from './views/home/Home.vue'
// import City from './views/city/City.vue'
// import Msite from './views/msite/Msite.vue'
Vue.use(Router)

// const Home = () =>
//     import ('./views/home/Home.vue')
const Home = r => require.ensure([], () => r(require('./views/home/Home.vue')), 'Home')
const City = r => require.ensure([], () => r(require('./views/city/City.vue')), 'City')
const Msite = r => require.ensure([], () => r(require('./views/msite/Msite.vue')), 'Msite')
const Search = r => require.ensure([], () => r(require('./views/search/Search.vue')), 'Search')
const Order = r => require.ensure([], () => r(require('./views/order/Order.vue')), 'Order')
const Profile = r => require.ensure([], () => r(require('./views/profile/Profile.vue')), 'Profile')
const Shop = r => require.ensure([], () => r(require('./views/shop/Shop.vue')), 'Shop')
const Login = r => require.ensure([], () => r(require('./views/login/Login.vue')), 'Login')
export default new Router({
    routes: [{
        path: '/',
        component: App, //顶级路由
        children: [
            //地址为空跳转home页面
            {

                path: '',
                redirect: '/home',
            },
            //首页城市页面
            {

                path: '/home',
                name: 'Home',
                component: Home
            },
            //地址搜索页面
            {

                path: '/city/:id',
                name: 'City',
                component: City
            },
            //地址商品页面
            {

                path: '/msite',
                name: 'Msite',
                component: Msite
            },
            //搜索商品页面
            {

                path: '/search/:geohash',
                name: 'Search',
                component: Search
            },
            //订单页面
            {

                path: '/order',
                name: 'Order',
                component: Order
            },
            //我的页面
            {

                path: '/profile',
                name: 'Profile',
                component: Profile
            },
            //商品分类页面
            {

                path: '/shop',
                name: 'Shop',
                component: Shop
            },
            //登录页面
            {

                path: '/login',
                name: 'Login',
                component: Login
            }
        ]
    }]
})