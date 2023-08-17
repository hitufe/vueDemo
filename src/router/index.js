import { createRouter,createWebHistory } from "vue-router";
import HelloWorld from '../components/HelloWorld.vue';
import Hi from "~/components/Hi.vue";
import Articles from "~/views/Articles.vue";

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            name:'index',
            path:'/',
            component:HelloWorld,
        },
        {
            name:'Hi',
            path:'/hi',
            component:Hi,
        },
        {
            name:'Articles',
            path:'/articles',
            component:Articles,
        }
    ]
})
export default router;