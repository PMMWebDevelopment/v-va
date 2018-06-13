import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';

const Lessons = () =>
    import ( /* webpackChunkName: "lessons" */ '@/components/Lessons');
const Lesson = () =>
    import ( /* webpackChunkName: "lesson" */ '@/components/Lesson');
const Resources = () =>
    import ( /* webpackChunkName: "resources" */ '@/components/Resources');
const VerbTables = () =>
    import ( /* webpackChunkName: "verbtables" */ '@/components/VerbTables');
const SignupLogin = () =>
    import ( /* webpackChunkName: "signuplogin" */ '@/components/SignupLogin');

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/lessons',
            name: 'Lessons',
            component: Lessons,
        },
        {
            path: '/lesson',
            name: 'Lesson',
            component: Lesson,
        },
        {
            path: '/resources',
            name: 'Resources',
            component: Resources,
        },
        {
            path: '/verbtables',
            name: 'VerbTables',
            component: VerbTables,
        },
        {
            path: '/signuplogin',
            name: 'SignupLogin',
            component: SignupLogin,
        }
    ],
});