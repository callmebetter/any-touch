import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },

    {
        path: '/button-load-file',
        name: 'button-load-file',
        component: () => import('../views/ButtonLoadFile')
    },
    {
        path: '/diy',
        name: 'diy',
        component: () => import('../views/DIY')
    },
    {
        path: '/crop',
        name: 'CropPanel',
        component: () => import('../views/CropPanel')
    },

    {
        path: '/topology',
        name: 'Topology',
        component: () => import('../views/Topology.vue')
    },
    {
        path: '/sc',
        name: 'SortCarousel',
        component: () => import('../views/SortCarousel.vue')
    }
];

const router = new VueRouter({
    routes
});

export default router;
