<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="modelTitle"
    @ok='confirm'
  >
    <BasicForm
      @register="registerForm"
      :model="model"
    />
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, inject } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
import { uploadApi, getImgUrl } from '/@/api/sys/upload';
import { AddActivityInfo, EditActivityInfo } from '/@/api/sys/menu';
import { useMessage } from '/@/hooks/web/useMessage';
import { timestampToTime } from '/@/utils/other/data';

// import { modeList, fanList } from './modeList';
const schemas: FormSchema[] = [
  {
    required: true,

    field: 'title',
    component: 'Input',
    label: '活动标题',
    colProps: {
      span: 20,
    },
    // defaultValue: '活动标题-哈哈哈',
  },
  {
    required: true,

    field: 'content',
    component: 'Input',
    label: '活动内容',
    colProps: {
      span: 20,
    },
    // defaultValue: '活动内容--哈哈哈',
  },
  {
    required: true,

    field: 'imageUrl',
    component: 'Upload',
    label: '活动图片',
    colProps: {
      span: 20,
    },
    componentProps: {
      api: uploadApi,
    },
  },
  {
    required: true,

    field: 'url',
    component: 'Input',
    label: '活动链接',
    colProps: {
      span: 20,
    },
    // defaultValue: 'http://www.bri.com.cn',
  },
  {
    required: true,

    field: 'beginTime',
    component: 'DatePicker',
    label: '开始时间',
    colProps: {
      span: 20,
    },
    // defaultValue: '111',
  },
  {
    required: true,

    field: 'finishTime',
    component: 'DatePicker',
    label: '结束时间',
    colProps: {
      span: 20,
    },
    // defaultValue: '111',
  },
];
export default defineComponent({
  components: { BasicModal, BasicForm },
  // emits: ['seccecc'],
  setup(_, ctx) {
    const successInject: any = inject('provideSuccess');

    const { createMessage } = useMessage();
    const { error } = createMessage;

    const modelRef = ref({});
    const modelTitle = ref('');
    const modelID = ref('');
    const [
      registerForm,
      {
        // setFieldsValue,
        setProps,
        validate,
      },
    ] = useForm({
      labelWidth: 100,
      schemas,
      showActionButtonGroup: false,
      actionColOptions: {
        span: 24,
      },
    });

    const [register, { changeOkLoading, closeModal }] = useModalInner((data) => {
      // 方式1
      // setFieldsValue({
      //   field2: data.data,
      //   field1: data.info,
      // });
      console.log('data---', data.record);
      modelTitle.value = data.modelTitle;
      // 方式2
      if (data.modelTitle == '编辑型号') {
        // modelRef.value = { field2: data.data, field1: data.info };
        // modelRef.value = {
        //   title: data.record.title,
        //   content: data.record.content,
        //   imageUrl: data.record.imageUrl,
        //   url: data.record.url,
        //   beginTime: data.record.beginTime,
        //   finishTime: data.record.finishTime,
        // };
        modelID.value = data.record.id;
        setProps({
          model: {
            title: data.record.title,
            content: data.record.content,
            imageUrl: data.record.imageUrl,
            url: data.record.url,
            beginTime: data.record.beginTime,
            finishTime: data.record.finishTime,
          },
        });
      }
    });
    // 转为13位的时间戳
    const TimeChange = (item: any): number => {
      return Math.round(new Date(item));
    };
    // 提交确认
    const confirm = async () => {
      const values = await validate();
      console.log('confirm--111-', values);

      if (TimeChange(values.beginTime) > TimeChange(values.finishTime))
        return error('开始日期不能大于结束日期');
      values.finishTime = timestampToTime(TimeChange(values.finishTime));
      values.beginTime = timestampToTime(TimeChange(values.beginTime));
      if (values.imageUrl.indexOf('http') == -1) {
        console.log('进来啦');
        values.imageUrl = getImgUrl(values.imageUrl);
      } else {
        console.log('没有啦');
      }

      changeOkLoading(true);
      if (modelTitle.value == '编辑型号') {
        values.id = modelID.value;
        console.log('编辑型号----');
        // console.log('confirm---', values);
        await EditActivityInfo(values);
        // EditActivityInfo
      } else {
        console.log('新增加型号----');
        await AddActivityInfo(values);
      }
      setTimeout(() => {
        changeOkLoading(false);
        closeModal();
        ctx.emit('seccecc');
        successInject(values);
      }, 2000);
    };

    return { modelTitle, confirm, register, schemas, registerForm, model: modelRef };
  },
});
</script>

<style lang="less" scoped>
#field2 {
  .ant-btm-primary {
    background-color: pink !important;
  }
}
</style>