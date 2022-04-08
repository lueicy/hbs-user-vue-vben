<template>
  <PageWrapper
    contentBackground
    :contentStyle="{
      background: '#ffffff',
      borderRadius: '8px',
    }"
    contentClass="p-4"
    :contentFullHeight="true"
    :fixedHeight="true"
    title="问题反馈"
    content="请反馈您遇到的问题，我们会及时处理的。"
  >
    <!-- <template #headerContent>
      <WorkbenchHeader />
    </template> -->
    <template #default>
      <div :class="`content_form`">
        <BasicForm @register="registerForm" :model="model" />
      </div>
    </template>
    <template #leftFooter>
      <LayoutFooter />
    </template>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { PageWrapper } from '/@/components/Page';
  import LayoutFooter from '/@/components/layoutFooter/LayoutFooter.vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import WorkbenchHeader from './components/WorkbenchHeader.vue';
  import { schemas } from './data';

  export default defineComponent({
    name: 'FormBasicPage',
    components: { BasicForm, LayoutFooter, WorkbenchHeader, PageWrapper },
    setup() {
      const model = ref({});
      const { createMessage } = useMessage();
      const [registerForm, { validate, setProps }] = useForm({
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 10,
        },
        schemas,
        actionColOptions: {
          offset: 8,
          span: 12,
        },
        submitButtonOptions: {
          text: '提交',
        },
        submitFunc: customSubmitFunc,
      });

      async function customSubmitFunc() {
        try {
          await validate();
          setProps({
            submitButtonOptions: {
              loading: true,
            },
          });
          setTimeout(() => {
            setProps({
              submitButtonOptions: {
                loading: false,
              },
            });
            createMessage.success('提交成功！');
          }, 2000);
        } catch (error) {}
      }

      return { registerForm, model };
    },
  });
</script>
<style lang="less" scoped>
  .content_form {
    // width: 720px;
    // margin: 90px auto 0;
    // border: 1px solid #000;
    margin-top: 90px;
  }
</style>
