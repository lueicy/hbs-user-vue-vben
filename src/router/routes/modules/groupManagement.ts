import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const groupManag: AppRouteModule = {
  path: '/groupManag',
  name: 'GroupManag',
  component: LAYOUT,
  redirect: '/groupManag/index',
  meta: {
    orderNo: 3,
    icon: 'bi:people',
    title: '群组管理',
    hideChildrenInMenu: true,
  },
  children: [
    // =============================list start=============================
    {
      path: 'index',
      name: 'GroupManag',
      component: () => import('/@/views/sys/groupManagment/index.vue'),
      meta: {
        title: '群组管理',
        hideMenu: true,
        dynamicLevel: 3,
        realPath: '/groupManag',
      },
    },
    {
      path: 'groupDetail/:id',
      name: 'GroupDetail',
      component: () => import('/@/views/sys/groupManagment/groupItem/index.vue'),
      meta: {
        title: '群组详情',
        hideMenu: true,
        dynamicLevel: 3,
        realPath: '/groupItem/index',
      },
    },
    // =============================list end=============================
  ],
};

export default groupManag;
