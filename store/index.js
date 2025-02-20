import { Request } from '@/utils/request.js';

// token校验
export const postVerifiedStore = new Request('/verified', 'POST');

// 登录
export const postLoginStore = new Request('/api/login', 'POST');

// 注册
export const postRegisterStore = new Request('/api/register', 'POST');

// 搜索用户
export const getSearchUsersStore = new Request('/api/search-users', 'GET');

// 申请添加为联系人
export const postApplicationStore = new Request('/api/application', 'POST');

// 正在申请成为联系人的用户
export const getApplicationStore = new Request('/api/get-application', 'GET');

// 查找联系人
export const getContactsStore = new Request('/api/get-contacts', 'GET');

// 同意申请
export const postAgreeApplicationStore = new Request('/api/agree-application', 'POST');

// 创建群聊
export const postCreateGroupStore = new Request('/api/create-group', 'POST')

// 加入的群聊
export const getGroupsStore = new Request('/api/get-groups', 'GET')
