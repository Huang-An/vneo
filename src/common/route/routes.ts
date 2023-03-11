export const routes = [
  {
    title: '登录',
    name: 'login',
    path: 'pages/login/index',
    meta: {
      isWhite: true,
      isLogin: true
    }
  },
  {
    title: '隐私协议',
    name: 'agreement-privacy',
    path: 'pages/agreement-privacy/index',
    meta: {
      isWhite: true
    }
  },
  {
    title: '首页',
    name: 'home',
    path: 'pages/home/index',
    meta: {
      isHome: true,
      isTabbar: true,
      tabbarIcon: 'home',
      tabbarSelectedIcon: 'home-fill'
    }
  },
  {
    title: '日记',
    name: 'diary',
    path: 'pages/diary/index',
    meta: {
      isTabbar: true,
      tabbarIcon: 'clock',
      tabbarSelectedIcon: 'clock-fill'
    }
  },
  {
    title: '我的',
    name: 'personal',
    path: 'pages/personal/index',
    meta: {
      isTabbar: true,
      tabbarIcon: 'bussiness-man',
      tabbarSelectedIcon: 'bussiness-man-fill'
    }
  },
  {
    title: '编辑资料',
    name: 'personal-update',
    path: 'pages/personal-update/index',
    meta: {
      isWhite: true
    }
  },
  {
    title: '我的文章',
    name: 'personal-articles',
    path: 'pages/personal-articles/index'
  },
  {
    title: '发布',
    name: 'articles-publish',
    path: 'pages/articles-publish/index'
  },
  {
    title: '详情',
    name: 'articles-detail',
    path: 'pages/articles-detail/index'
  }
]

// 创建 pages
export const createPageList = () => {
  const home = routes.filter(route => route.meta && route.meta.isHome).map(route => route.path)

  const other = routes.filter(route => !route.meta || !route.meta.isHome).map(route => route.path)

  return [...home, ...other]
}

// 创建 tabbars
export const createTabbarList = () => {
  const tabbarList = routes.filter(route => route.meta && route.meta.isTabbar)

  return tabbarList.map(item => ({
    name: item.name,
    text: item.title,
    pagePath: item.path,
    icon: item.meta?.tabbarIcon || '',
    selectedIcon: item.meta?.tabbarSelectedIcon || ''
  }))
}
