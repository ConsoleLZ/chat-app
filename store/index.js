import { Request } from '@/utils/request.js';

// token校验
export const postVerifiedStore = new Request('/verified', 'POST')

// 登录
export const postLoginStore = new Request('/api/login', 'POST');

// 注册
export const postRegisterStore = new Request('/api/register', 'POST')

// 搜索用户
export const getSearchUsersStore = new Request('/api/search-users', 'GET')

// 申请添加为联系人
export const postApplicationStore = new Request('/api/application', 'POST')

// 查找联系人
export const getContactsStore = new Request('/api/get-contacts', 'GET')
