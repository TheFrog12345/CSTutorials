import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

    const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // lazy loading
        component: () => import('../views/About.vue')
    },
    {
        path: '/contact',
        name: 'Contact',
        // lazy loading
        component: () => import('../views/Contact.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router