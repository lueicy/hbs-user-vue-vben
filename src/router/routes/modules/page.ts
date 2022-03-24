import type { AppRouteModule } from '/@/router/types';

import { getParentLayout, LAYOUT } from '/@/router/constant';
// import { ExceptionEnum } from '/@/enums/exceptionEnum';
import { t } from '/@/hooks/web/useI18n';

// const ExceptionPage = () => import('/@/views/sys/exception/Exception.vue');

const page: AppRouteModule = {
  path: '/home',
  name: 'Home',
  component: LAYOUT,
  redirect: '/home/index',
  meta: {
    orderNo: 2,
    icon: 'ion:aperture-outline',
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
        title: t('routes.demo.page.list'),
      },
    },
    // =============================list end=============================
  ],
};

export default page;
