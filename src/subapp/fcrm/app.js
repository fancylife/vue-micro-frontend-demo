let router = window.router;
import routes from './router/router';
const urlPrefix = '/fcrm';
if (routes) {
    routes.forEach((route) => {
        route.path = urlPrefix + route.path
    });
    router.addRoutes(routes);
}