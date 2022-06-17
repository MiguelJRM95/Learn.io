/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponse } from '../../types/apiResponse';

export const uploadResourceRequest = async (
  formData: FormData,
  // eslint-disable-next-line no-unused-vars
  progressCallback?: (progressEvent: ProgressEvent) => void
): Promise<ApiResponse<string[]>> => {
  const config: AxiosRequestConfig = {
    headers: { 'content-type': 'multipart/form-data' },
    onUploadProgress: progressCallback,
    // eslint-disable-next-line no-unused-vars
    validateStatus: (status) => true,
  };
  const response = await axios.post('/api/resources', formData, config);

  return response.data;
};
