import { Request } from '@/utils/request.js';

// 登录
export const postLoginStore = new Request('/api/login', 'POST');
