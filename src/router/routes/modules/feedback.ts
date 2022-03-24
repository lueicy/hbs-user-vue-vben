import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/feedback',
  name: 'Feedback',
  component: LAYOUT,
  redirect: '/feedback/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'uil:feedback',
    title: '问题反馈',
    orderNo: 13,
  },
  children: [
    {
      path: 'index',
      name: 'feedbackPage',
      component: () => import('/@/views/sys/feedback/index.vue'),
      meta: {
        title: '问题反馈',
      },
    },
  ],
};

export default dashboard;
