interface IRoute {
    path: string;
    title: string;
    normalIcon?: string;
    focusedIcon?: string;
    addBar?: boolean;
}

const routes: Array<IRoute> = [{
    path: 'pages/home/index',
    normalIcon: './assets/home-unselected.png',
    focusedIcon: './assets/home-selected.png',
    title: "首页",
    addBar: true
}, {
    path: 'pages/login/index',
    title: "用户相关",
    normalIcon: './assets/user-unselected.png',
    focusedIcon: './assets/user-selected.png',
    addBar: true
}, {
    path: 'pages/index/index',
    title: "测试"
}];


function wrapRoutePath(routers: Array<IRoute>) {
    return routers.map((router) => (
        router.path
    ));
}

function wrapNavigationRoutePath(routers: Array<IRoute>) {
    const filter = routers.filter((item: any) => !!item.addBar);
    if (filter.length > 5) {
        throw new Error('bottom bar item size() > 5')
    }
    return filter.map((router) => ({
        pagePath: router.path,
        text: router.title,
        iconPath: router.normalIcon,
        selectedIconPath: router.focusedIcon
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
        selectedColor: '#d81e06',
        color: '#8a8a8a',
        list: bottomNavigationBar
    }
}


