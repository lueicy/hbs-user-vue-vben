import { UploadApiRes } from './model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';

const { uploadUrl = '' } = useGlobSetting();

enum Api {
  GetImgUrl = 'https://api-test.bri.com.cn/manage/file/download?filePath=',

}

/**
 * @description: Upload interface
 */
export function uploadApi(
  data: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void
) {
  console.log('uploadUrl----', uploadUrl);
  console.log('onUploadProgress----', onUploadProgress);
  // console.log('params----',params);
  let params = {
    file: data.file,
    type: data.file.type,
  };
  return defHttp.uploadFile<UploadApiRes>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params
  );
}

// 该方法不做任何请求，只是用于配置文件路径
export const getImgUrl = (url:string) :string => Api.GetImgUrl + url;
