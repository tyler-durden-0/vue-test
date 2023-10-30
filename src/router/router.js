import Main from '@/pages/Main.vue';
import PostsPage from '@/pages/PostsPage.vue';
import About from '@/pages/About.vue';
import PostIdPage from '@/pages/PostIdPage.vue';
import PostPageWithStore from '@/pages/PostPageWithStore.vue';
import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostsPage
    },
    {
        path: '/about',
        component: About        
    },
    {
        path: '/posts/:id',
        component: PostIdPage        
    },
    {
        path: '/store',
        component: PostPageWithStore       
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;