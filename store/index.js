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

// 用户详情信息
export const getUserInfoStore = new Request('/api/user-info', 'GET')

// 更新用户信息
export const postUpdateUserInfoStore = new Request('/api/update-user-info', 'POST')

// 图片上传
export const postUploadImagesStore = new Request('/api/upload-images', 'POST')

// 发布动态
export const postAddMomentStore = new Request('/api/add-moment', 'POST')

// 获取朋友圈动态
export const getMomentsStore = new Request('/api/get-moments', 'GET')

// 获取朋友圈动态
export const postUpdateMomentsStore = new Request('/api/update-moments', 'POST')

// 获取动态详情
export const getMomentsDetailStore = new Request('/api/get-moments-detail', 'GET')

// 删除联系人
export const postDeleteContactStore = new Request('/api/delete-contact', 'POST')

// 添加表情包
export const postAddExpressionStore = new Request('/api/add-expression', 'POST')

// 获取表情包数据
export const getExpressionStore = new Request('/api/get-expression', 'GET')

// 获取群聊成员
export const getAllMembersStore = new Request('/api/get-all-members', 'GET')

// 踢出群聊成员
export const postDeleteMemberStore = new Request('/api/delete-member', 'POST')

// 搜索群聊
export const getSearchGroupsStore = new Request('/api/search-groups', 'GET')

// 申请进入群聊
export const postApplicationGroupStore = new Request('/api/application-group', 'POST')

// 查找申请进群的用户
export const getApplicationGroupStore = new Request('/api/get-application-group', 'GET')

// 添加群聊成员
export const postAddGroupMemberStore = new Request('/api/add-group-member', 'POST')

// 退出群聊
export const postExitGroupStore = new Request('/api/exit-group', 'POST')

// 联系人设置
export const postSetContactsStore = new Request('/api/set-contacts', 'POST')
