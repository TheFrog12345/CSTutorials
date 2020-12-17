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
        path: '/tutorials/:tutorialName',
        name: 'Tutorial',
        // lazy loading
        component: () => import('../views/Tutorial.vue')
    },
    {
        path: '/:page',
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