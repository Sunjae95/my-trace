import axios from 'axios';

const KAKAO_LOCAL_URL = 'https://dapi.kakao.com/v2/local/';
const GEO = 'geo';

const instance = axios.create({
  baseURL: KAKAO_LOCAL_URL,
  headers: {
    Authorization: `KakaoAK ${process.env.REST_API}`,
  },
});

instance.interceptors.request.use((config) => {
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const kakaoHttp = {
  getConvertedAddress: async (longitude, latitude) => {
    const { data } = await instance.get(`/${GEO}/coord2address`, { params: { x: longitude, y: latitude } });
    return data;
  },
};
