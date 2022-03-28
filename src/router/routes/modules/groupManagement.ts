import type { AppRouteModule } from '/@/router/types';

import { getParentLayout, LAYOUT } from '/@/router/constant';
// import { ExceptionEnum } from '/@/enums/exceptionEnum';
import { t } from '/@/hooks/web/useI18n';

// const ExceptionPage = () => import('/@/views/sys/exception/Exception.vue');

const groupManag: AppRouteModule = {
  path: '/groupManag',
  name: 'GroupManag',
  component: LAYOUT,
  redirect: '/groupManag/index',
  meta: {
    orderNo: 3,
    icon: 'ion:aperture-outline',
    // title: t('routes.demo.page.page'),
    title: '群组管理',
    hideChildrenInMenu: true,
  },
  children: [
    // =============================list start=============================
    {
      path: 'index',
      name: 'GroupManag',
      // component: getParentLayout('ListPage'),
      component: () => import('/@/views/sys/groupManagment/index.vue'),
      meta: {
        // title: t('routes.demo.page.list'),
        title: '群组管理',
        hideMenu: true,
        dynamicLevel: 3,
        realPath: '/groupManag',
      },
    },
    // =============================list end=============================
  ],
};

export default groupManag;
