const routes = [{
  path: 'pages/home/index',
  title: "首页",
  addBar: true
}, {
  path: 'pages/login/index',
  title: "用户相关",
  addBar: true
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
  const filter = routers.filter((item: any) => !!item.addBar);
  if (filter.length > 5) {
    throw new Error('bottom bar item size() > 5')
  }
  return filter.map((router) => ({
    pagePath: router.path,
    text: router.title
  }));
}


export const pages = wrapRoutePath(routes);
export const bottomNavigationBar = wrapNavigationRoutePath(routes);

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


