import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const userInfomation: AppRouteModule = {
  path: '/userInfo',
  name: 'UserInfo',
  component: LAYOUT,
  redirect: '/userInfo/index',
  meta: {
    orderNo: 4,
    icon: 'ion:aperture-outline',
    // title: t('routes.demo.page.page'),
    title: '用户信息',
    hideChildrenInMenu: true,
  },
  children: [
    // =============================list start=============================
    {
      path: 'index',
      name: 'UserInfo',
      // component: getParentLayout('ListPage'),
      component: () => import('/@/views/sys/userInfomation/index.vue'),
      meta: {
        // title: t('routes.demo.page.list'),
        title: '用户信息',
        hideMenu: true,
        dynamicLevel: 3,
        realPath: '/userInfo',
      },
    },
    //   {
    //     path: 'groupDetail/:id',
    //     name: 'GroupDetail',
    //     // component: getParentLayout('ListPage'),
    //     component: () => import('/@/views/sys/groupManagment/groupItem/index.vue'),
    //     meta: {
    //       title: '群组详情',
    //       hideMenu: true,
    //       dynamicLevel: 3,
    //       realPath: '/groupItem/index',
    //     },
    //   },
    //   // =============================list end=============================
  ],
};

export default userInfomation;
