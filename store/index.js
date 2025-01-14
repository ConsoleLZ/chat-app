import { Request } from '@/utils/request.js';

// token校验
export const postVerifiedStore = new Request('/verified', 'POST')

// 登录
export const postLoginStore = new Request('/api/login', 'POST');

// 搜索用户
export const getSearchUsersStore = new Request('/api/search-users', 'GET')

// 查找联系人
export const getContactsStore = new Request('/api/get-contacts', 'GET')
