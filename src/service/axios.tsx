import Axios from 'axios';
import { accessToken } from 'redux/store';
import { totp } from './totp';
import CryptoJS from 'crypto-js';

const axios = Axios.create({
  withCredentials: true,
});

const otp = ()=> totp().generate();
const encrypted = () => CryptoJS.AES.encrypt(otp(), process.env.NEXT_PUBLIC_REF_ENCRYPTION_KEY);

axios.interceptors.request.use(function (config) {

  config.headers = {
    'Content-Type': config.data instanceof FormData ? 'multipart/form-data' : 'application/json',
    'Authorization': accessToken() || "",
    'csrf-token': encrypted()
  };

  return config;
});

export default axios;
