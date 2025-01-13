import { Request } from '@/utils/request.js';

// token校验
export const postVerifiedStore = new Request('/verified', 'POST')

// 登录
export const postLoginStore = new Request('/api/login', 'POST');
