import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const page: AppRouteModule = {
  path: '/home',
  name: 'Home',
  component: LAYOUT,
  redirect: '/home/index',
  meta: {
    orderNo: 2,
    icon: 'icons8:home',
    // title: t('routes.demo.page.page'),
    title: '设备管理',
    hideChildrenInMenu: true,
  },
  children: [
    // =============================list start=============================
    {
      path: 'index',
      name: 'CardPages',
      // component: getParentLayout('ListPage'),
      component: () => import('/@/views/sys/card/index.vue'),
      meta: {
        // title: t('routes.demo.page.list'),
        title: '设备管理',
      },
    },
    // =============================list end=============================
  ],
};

export default page;
