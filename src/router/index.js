import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    name: 'default',
    path: '/',
    // 默认打开登录页
    redirect: { path: '/login' }
  },
  
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/index',
    component: Layout,
    hidden: true,
    // redirect: { name: '首页' },
    children: [
      {
        path: '/index',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页'}
      }
    ]
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/autoWash',
    component: Layout,
    // redirect: '/autoWash/indent',
    meta: { title: '车后服务管理后台', icon: 'example' , roles: ['carWash'] },
    children: [
      {
        path: 'indent',
        component: () => import('@/views/routerView/index'), // Parent router-view
        // redirect: 'annual',
        meta: { title: '订单管理', icon: 'example'},
        children: [
          {
            path: 'annual',
            name: 'annual',
            component: () => import('@/views/annual/index'),
            meta: { title: '年检订单', icon: 'dashboard' ,}
          },
          {
            path: 'serve',
            name: 'serve',
            component: () => import('@/views/serve/index'),
            meta: { title: '服务订单', icon: 'dashboard' ,}
          }
        ]
      },
      {
        path: '/nodeList',
        alwaysShow: true,
        component: () => import('@/views/routerView/index'), // Parent router-view
        meta: { title: '网点管理', icon: 'example'},
        children: [
          {
            path: 'nodeList',
            name: 'nodeList',
            component: () => import('@/views/nodeList/index'),
            meta: { title: '网点列表', icon: 'table' }
          }
        ]
      },
      {
        path: '/account',
        component: () => import('@/views/routerView/index'), // Parent router-view
        meta: { title: '账号管理', icon: 'example' , roles: ['ad'] },
        children: [
          // {
          //   path: 'nodeList',
          //   name: 'nodeList',
          //   component: () => import('@/views/nodeList/index'),
          //   meta: { title: '技师账号管理', icon: 'table' }
          // },
          {
            path: 'account',
            name: 'account',
            component: () => import('@/views/account/index'),
            meta: { title: '网点账号管理', icon: 'table' }
          },
          {
            path: 'carOwner',
            name: 'carOwner',
            component: () => import('@/views/carOwner/index'),
            meta: { title: '车主账号管理', icon: 'table' }
          }
        ]
      },
      {
        path: '/charge',
        component: () => import('@/views/routerView/index'), // Parent router-view
        meta: { title: '费用设置', icon: 'example'},
        children: [
          {
            path: 'charge',
            name: 'charge',
            component: () => import('@/views/charge/index'),
            meta: { title: '网点费用列表', icon: 'table' }
          },
          {
            path: 'chargeList',
            name: 'chargeList',
            component: () => import('@/views/chargeList/index'),
            meta: { title: '市场费用列表', icon: 'table' }
          }
        ]
      },
      {
        path: '/audit',
        alwaysShow: true,
        component: () => import('@/views/routerView/index'), // Parent router-view
        meta: { title: '核销管理', icon: 'example' },
        children: [
          {
            path: 'audit',
            name: 'audit',
            component: () => import('@/views/audit/index'),
            meta: { title: ' 核销统计', icon: 'table' }
          }
        ]
      },
      {
        path: '/volume',
        alwaysShow: true,
        component: () => import('@/views/routerView/index'), // Parent router-view
        meta: { title: '劵码管理', icon: 'example' },
        children: [
          {
            path: 'volumeList',
            name: 'volumeList',
            component: () => import('@/views/volumeList/index'),
            meta: { title: '劵码列表', icon: 'table' }
          }
        ]
      },
      {
        path: '/reconciliation',
        component: () => import('@/views/routerView/index'), // Parent router-view
        meta: { title: '对账管理', icon: 'example' },
        children: [
          {
            path: 'nodeReconciliation',
            name: 'nodeReconciliation',
            component: () => import('@/views/nodeReconciliation/index'),
            meta: { title: '网点对账', icon: 'table' }
          },
          {
            path: 'insuranceReconciliation',
            name: 'insuranceReconciliation',
            component: () => import('@/views/insuranceReconciliation/index'),
            meta: { title: '保险公司对账', icon: 'table' }
          }
        ]
      },
    ]
  },
  {
    path: '/service',
    component: Layout,
    // redirect: '/autoWash/indent',
    meta: { title: '贵宾厅管理后台', icon: 'example' , roles:  ['service'] },
    children: [
      {
        path: 'service',
        component: () => import('@/views/routerView/index'), // Parent router-view
        meta: { title: '服务商', icon: 'example'},
        children: [
          {
            path: 'serviceProduct',
            name: 'serviceProduct',
            component: () => import('@/views/serviceProduct/index'),
            meta: { title: '服务商产品管理', icon: 'dashboard'}
          },
          {
            path: 'serviceOrder',
            name: 'serviceOrder',
            component: () => import('@/views/serviceOrder/index'),
            meta: { title: '服务单管理', icon: 'dashboard'}
          },
          {
            path: 'yuetuSite',
            name: 'yuetuSite',
            component: () => import('@/views/yuetuSite/index'),
            meta: { title: '悦途站点管理', icon: 'dashboard'}
          },
        ]
      },
      {
        path: 'ditch',
        component: () => import('@/views/routerView/index'), // Parent router-view
        meta: { title: '渠道', icon: 'example'},
        children: [
          {
            path: 'ditchChannel',
            name: 'ditchChannel',
            component: () => import('@/views/ditchChannel/index'),
            meta: { title: '渠道管理', icon: 'dashboard' ,}
          },
          {
            path: 'ditchProduct',
            name: 'ditchProduct',
            component: () => import('@/views/ditchProduct/index'),
            meta: { title: '渠道产品管理', icon: 'dashboard' ,}
          },
          {
            path: 'ditchOrder',
            name: 'ditchOrder',
            component: () => import('@/views/ditchOrder/index'),
            meta: { title: ' 渠道订单管理', icon: 'dashboard' ,}
          },
        ]
      },
      {
        path: 'marketing',
        component: () => import('@/views/routerView/index'), // Parent router-view
        meta: { title: '营销工具', icon: 'example'},
        children: [
          {
            path: 'marketingCoupon',
            name: 'marketingCoupon',
            component: () => import('@/views/routerView/index'),
            meta: { title: '优惠券管理', icon: 'dashboard'},
            children: [
              {
                path: 'marketingList',
                name: 'marketingList',
                component: () => import('@/views/marketingList/index'),
                meta: { title: '优惠券列表'}
              },
              {
                path: 'marketingGet',
                name: 'marketingGet',
                component: () => import('@/views/marketingGet/index'),
                meta: { title: '优惠券领取表'}
              }
            ]
          },
          {
            path: 'marketingCertificate',
            name: 'marketingCertificate',
            component: () => import('@/views/routerView/index'),
            meta: { title: '兑换券管理', icon: 'dashboard'},
            children: [
              {
                path: 'marketingConvert',
                name: 'marketingConvert',
                component: () => import('@/views/marketingConvert/index'),
                meta: { title: '券码管理'}
              },
              {
                path: 'marketingOrder',
                name: 'marketingOrder',
                component: () => import('@/views/marketingOrder/index'),
                meta: { title: '订单管理'}
              },
              {
                path: 'marketingOrderCharge',
                name: 'marketingOrderCharge',
                hidden: true, // 不在侧边栏线上
                component: () => import('@/views/marketingOrderCharge/index'),
                meta: { title: '收费订单管理', activeMenu: '/service/marketing/marketingCertificate/marketingOrder', }
              }
            ]
          },
        ]
      },
      {
        path: 'WxDeploy',
        component: () => import('@/views/routerView/index'), // Parent router-view
        alwaysShow: true,
        meta: { title: '微信配置', icon: 'example'},
        children: [
          // {
          //   path: 'WxBasic',
          //   name: 'WxBasic',
          //   component: () => import('@/views/WxBasic/index'),
          //   meta: { title: '基本配置', icon: 'dashboard' ,}
          // },
          {
            path: 'WxMenu',
            name: 'WxMenu',
            component: () => import('@/views/WxMenu/index'),
            meta: { title: '自定义菜单', icon: 'dashboard' ,}
          },
          // {
          //   path: 'WxNews',
          //   name: 'WxNews',
          //   component: () => import('@/views/WxNews/index'),
          //   meta: { title: '收到消息回复', icon: 'dashboard' ,}
          // },
          // {
          //   path: 'WxAntistop',
          //   name: 'WxAntistop',
          //   component: () => import('@/views/WxAntistop/index'),
          //   meta: { title: '关键词回复', icon: 'dashboard' ,}
          // },
          // {
          //   path: 'WxAttention',
          //   name: 'WxAttention',
          //   component: () => import('@/views/WxAttention/index'),
          //   meta: { title: '被关注回复', icon: 'dashboard' ,}
          // }
        ]
      },
    ]
  },
  // 4级菜单测试用
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested',
  //     roles:  ['user']
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1'},
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1'}
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1'}
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' , roles: ['carWash']}
  //             },
  //             {
  //               path: 'menu1-2-3',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-3',
  //               meta: { title: 'Menu1-2-3' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2'}
  //     }
  //   ]
  // },
  // 404 page must be placed at the end !!!
  {
    path: '/userRight',
    component: Layout,
    alwaysShow: true,
   // component: () => import('@/views/routerView/index'), // Parent router-view
    meta: { title: '用户权限管理', icon: 'example' , roles:  ['userList'] },
    children: [
      {
        path: '/userList',
        name: 'userList',
        component: () => import('@/views/userList/index'),
        meta: { title: '后台用户列表'}
      },
      {
        path: '/userWxList',
        name: 'userWxList',
        component: () => import('@/views/userWxList/index'),
        meta: { title: '微信用户列表'}
      },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
