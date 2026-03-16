import {createRouter, createWebHistory} from 'vue-router'
import AdminLayout from "@/layout/AdminLayout.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/login', name: 'login', component: () => import('../views/LoginView.vue')},
        {
            path: '/:pathMatch(.*)*',
            component: () => import('../views/error/404.vue'),
            meta: {title: '404', hidden: true}
        },
        {
            path: '/',
            component: AdminLayout,
            redirect: '/dashboard',
            meta: {title: 'Root'},
            children: [
                {
                    path: 'dashboard',
                    component: () => import('@/views/dashboard/index.vue'),
                    meta: {title: '工作台', icon: 'House'}
                },
                {
                    path: 'users',
                    component: () => import('@/views/users/index.vue'),
                    meta: {title: '用户管理'}
                },
                {
                    path: 'roles',
                    component: () => import('@/views/system/roles/index.vue'),
                    meta: {title: '角色'}
                },
                {
                    path: 'permissions',
                    component: () => import('@/views/system/permissions/index.vue'),
                    meta: {title: '权限'}
                },
                {
                    path: 'dev',
                    component: () => import('@/views/system/DevView.vue'),
                    meta: {title: '开发'}
                },
                {
                    path: 'articles',
                    component: () => import('@/views/articles/index.vue'),
                    meta: {title: '文章'}
                },
                {
                    path: 'categories',
                    component: () => import('@/views/categories/index.vue'),
                    meta: {title: '类别'}
                },
                {
                    path: 'tag',
                    component: () => import('@/views/tag/index.vue'),
                    meta: {title: '标签'}
                },
                {
                    path: 'comment',
                    component: () => import('@/views/comment/index.vue'),
                    meta: {title: '评论'}
                },

            ],
        },
    ]
})

/*
const userStore = useUserStore()

router.beforeEach((to) => {
    const isAuthenticated = userStore.accessToken

    if (!isAuthenticated && to.name !== 'login') {
        return { name: 'login' } // 重定向
    }
})
*/

export default router
