const util = {
    loadCss: function (path) {
        if (!path || path.length === 0) {
            throw new Error('argument "path" is required !');
        }
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.href = path;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
    },
    tasksOfGetScript:{},
      /**
     * 动态加载js文件
     * @param  {string}   url      js文件的url地址
     * @param  {Function} callback 加载完成后的回调函数
     */
    getScript(url, callback) {
        if (!util.tasksOfGetScript[url]) {
            util.tasksOfGetScript[url] = {
                status: 'loading',
                cbs: [callback]
            }
        } else {
            if (util.tasksOfGetScript[url].status === 'loaded') {
                callback && callback();
                return
            }
            if (util.tasksOfGetScript[url].status === 'loading') {
                console.log(`${url}等待加载`)
                util.tasksOfGetScript[url].cbs.push(callback);
                return;
            }
        }

        var head = document.getElementsByTagName('head')[0],
            js = document.createElement('script');
        // if(url.indexOf('\/\/facishare')>-1){
        // }
        js.setAttribute('type', 'text/javascript');
        js.setAttribute('src', url);

        head.appendChild(js);

        //执行回调
        var callbackFn = function () {
            let cbs = util.tasksOfGetScript[url].cbs;
            util.tasksOfGetScript[url].status = 'loaded';

            for (let i = 0; i < cbs.length; i++) {
                cbs[i] && cbs[i]();
                util.tasksOfGetScript[url].cbs = [];
            }

        };

        if (document.all) { //IE
            js.onreadystatechange = function () {
                if (js.readyState == 'loaded' || js.readyState == 'complete') {
                    callbackFn();
                }
            }
        } else {
            js.onload = function () {
                callbackFn();
            }
        }
    }
}
export default  util;