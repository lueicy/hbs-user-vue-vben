<template>
  <Dropdown
    placement="bottomLeft"
    :overlayClassName="`${prefixCls}-dropdown-overlay`"
  >
    <span
      :class="[prefixCls, `${prefixCls}--${theme}`]"
      class="flex"
    >
      <img
        :class="`${prefixCls}__header`"
        :src="getUserInfo.avatar"
      />
      <span :class="`${prefixCls}__info hidden md:block`">
        <span
          :class="`${prefixCls}__name  `"
          class="truncate"
        >
          {{ getUserInfo.nickname }}
          <!-- 呼小博 -->
        </span>
      </span>
    </span>

    <template #overlay>
      <Menu @click="handleMenuClick">
        <!-- <MenuItem
          key="doc"
          :text="t('layout.header.dropdownItemDoc')"
          icon="ion:document-text-outline"
          v-if="getShowDoc"
        />
        <MenuDivider v-if="getShowDoc" /> -->
        <!-- v-if="getUseLockPage" -->
        <MenuItem
          key="version"
          text="当前版本V1.0.0"
          icon="file-icons:v-ray"
        />
        <!-- <MenuItem
          key="lock"
          text="修改密码"
          icon="carbon:password"
        /> -->
        <MenuItem
          key="logout"
          :text="t('layout.header.dropdownItemLoginOut')"
          icon="uiw:logout"
        />
      </Menu>
    </template>
  </Dropdown>
  <!-- <LockAction @register="register" /> -->
  <ForgetModel @register="register" />
</template>
<script lang="ts">
// components
import { Dropdown, Menu } from 'ant-design-vue';

import { defineComponent, computed } from 'vue';

import { DOC_URL } from '/@/settings/siteSetting';

import { useUserStore } from '/@/store/modules/user';
import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
import { useI18n } from '/@/hooks/web/useI18n';
import { useDesign } from '/@/hooks/web/useDesign';
import { useModal } from '/@/components/Modal';

import headerImg from '/@/assets/images/header.jpg';
import { propTypes } from '/@/utils/propTypes';
import { openWindow } from '/@/utils';
import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
import ForgetModel from './Modal.vue';

type MenuEvent = 'logout' | 'doc' | 'lock';

export default defineComponent({
  name: 'UserDropdown',
  components: {
    ForgetModel,
    Dropdown,
    Menu,
    MenuItem: createAsyncComponent(() => import('./DropMenuItem.vue')),
    // MenuDivider: Menu.Divider,
    // LockAction: createAsyncComponent(() => import('../lock/LockModal.vue')),
  },
  props: {
    theme: propTypes.oneOf(['dark', 'light']),
  },
  setup() {
    const { prefixCls } = useDesign('header-user-dropdown');
    const { t } = useI18n();
    const { getShowDoc, getUseLockPage } = useHeaderSetting();
    const userStore = useUserStore();

    const getUserInfo = computed(() => {
      const { username, nickname = '', avatar, desc } = userStore.getUserInfo || {};
      return { username, nickname, avatar: avatar || headerImg, desc };
    });

    const [register, { openModal }] = useModal();

    function handleLock() {
      openModal(true, {
        data: '修改密码',
      });
    }

    //  login out
    function handleLoginOut() {
      userStore.confirmLoginOut();
    }

    // open doc
    function openDoc() {
      openWindow(DOC_URL);
    }

    function handleMenuClick(e: { key: MenuEvent }) {
      // console.log('getUserInfo---', getUserInfo);
      // console.log('getUserInfo---', e);
      switch (e.key) {
        case 'logout':
          handleLoginOut();
          break;
        // case 'doc':
        //   openDoc();
        //   break;
        case 'lock':
          handleLock();
          break;
      }
    }

    return {
      prefixCls,
      t,
      getUserInfo,
      handleMenuClick,
      getShowDoc,
      register,
      getUseLockPage,
    };
  },
});
</script>
<style lang="less">
@prefix-cls: ~'@{namespace}-header-user-dropdown';

.@{prefix-cls} {
  height: @header-height;
  padding: 0 0 0 10px;
  padding-right: 10px;
  overflow: hidden;
  font-size: 12px;
  cursor: pointer;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }

  &__header {
    border-radius: 50%;
  }

  &__name {
    font-size: 14px;
  }

  &--dark {
    &:hover {
      background-color: @header-dark-bg-hover-color;
    }
  }

  &--light {
    &:hover {
      background-color: @header-light-bg-hover-color;
    }

    .@{prefix-cls}__name {
      color: @text-color-base;
    }

    .@{prefix-cls}__desc {
      color: @header-light-desc-color;
    }
  }

  &-dropdown-overlay {
    .ant-dropdown-menu-item {
      min-width: 160px;
    }
  }
}
</style>
