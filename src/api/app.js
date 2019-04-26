// 数组代表post方法，string代表get方法

export default {
  // 用户登陆
  SIGN_IN: ['/api/signin'],

  // 退出账号
  SIGN_OUT: ['/api/signout'],

  // 用户注册
  REGISTER: ['/api/register'],

  // 检查登陆 & 获取用户信息
  CHECK_SIGN: '/api/checksigned',

  // 检查登陆 & 获取用户信息
  UPDATE_UESR: ['/api/updateuser'],

  // 新建客户
  ADD_CUSTOMER: ['/api/customer/add'],

  // 客户列表
  LIST_CUSTOMER: '/api/customer/list',

  // 删除客户
  DELETE_CUSTOMER: ['/api/customer/delete'],
};
