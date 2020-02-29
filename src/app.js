require('./style/base.less');
import Vue from 'vue';
import VueRouter from 'vue-router';
// import routes from './router/router';
import PageDemo from './page/demo/demo'

const routes = [{
        path: '/',
        component: PageDemo
    },
    {
        path: '/404',
        component: Vue.component('notFound', {
            template: `<div>404</div>`
        })
    },
    {
        path: '*',
        component: Vue.component('loading', {
            template: `<div>loading...</div>`,
            beforeRouteEnter(to, from, next) {
                loadSubApp({
                    subPath: to.path
                }, () => {
                    next();
                })
            }
        })
    }
]

import util from 'util/util';

let subAppAsycLoaded = {};

function registerGlobal(global, config) {
    for (let key in config) {
        global[key] = config[key];
    }
}

function getSubAppStatics(subAppKey) {
    let staticPath = window.location.origin;
    //这个应该从配置中心拉取
    let config = {
        ['bi-report']: {
            js: staticPath+'/bi-report.js',
            css: staticPath+'/bi-report.css' //
        },
        ['fcrm']: {
            js: staticPath+'/fcrm.js',
            css: staticPath+'/fcrm.css' //
        },
        ['wxwork']: {
            js: staticPath+'/wxwork.js',
            css: staticPath+'/wxwork.css' //
        }
    };
    return config[subAppKey];
}

Vue.use(VueRouter);
const router = new VueRouter({
    routes
});

new Vue({
    router
}).$mount('#main');

function loadSubApp({
    subPath
}, cb) {
    let subAppKey = subPath.split('/')[1];
    if (!subAppKey || subAppAsycLoaded[subAppKey]) {
        cb();
    } else {
        const statics = getSubAppStatics(subAppKey);
        if (!statics) {
            router.replace('404');
            return;
        }

        util.getScript(statics.js, () => {
            util.loadCss(statics.css);
            console.log(`加载${subAppKey}入口资源`);
            subAppAsycLoaded[subAppKey] = true;
            setTimeout(() => {
                console.log(` window.location.replace(${subPath})`)
                router.replace(subPath);
                cb();
            }, 100);
        });
    }
}
router.beforeEach((to, from, next) => {
    loadSubApp({
        subPath: to.path
    }, () => {
        next();
    })
})

registerGlobal(window, {
    Vue,
    router
});