const routes = [{
  path: 'pages/home/index',
  title: "首页"
}, {
  path: 'pages/login/index',
  title: "登录"
}, {
  path: 'pages/index/index',
  title: "测试"
}];


function wrapRoutePath(routers: Array<any>) {
  return routers.map((router) => (
    router.path
  ));
}

function wrapNavigationRoutePath(routers: Array<any>) {
  return routers.map((router) => ({
    pagePath: router.path,
    text: router.title
  }));
}


const pages = wrapRoutePath(routes);
const bottomNavigationBar = wrapNavigationRoutePath(routes);

export default {
  pages,
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  networkTimeout: {
    request: 10000,
    downloadFile: 10000
  },
  tabBar: {
    list: bottomNavigationBar
  }
}


