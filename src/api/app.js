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

  // 更新用户
  UPDATE_UESR: ['/api/updateuser'],

  // 新建客户
  ADD_CUSTOMER: ['/api/customer/add'],

  // 客户列表
  LIST_CUSTOMER: '/api/customer/list',

  // 删除客户
  DELETE_CUSTOMER: ['/api/customer/delete'],

  // 更新客户
  UPDATE_CUSTOMER: ['/api/customer/update'],

  // 新建订单
  ADD_ORDER: ['/api/order/add'],

  // 获取订单列表
  LIST_ORDER: '/api/order/list',

  // 删除订单
  DELETE_ORDER: ['/api/order/delete'],

  // 更新订单
  UPDATE_ORDER: ['/api/order/update'],

  // 获取用户姓名 和 id
  CUSTOMER_NAME: '/api/customer/getname',

  // 获取用户姓名 和 id
  USER_NAME: '/api/user/getname',

  // 获取1个客户
  ONE_CUSTOMER: '/api/customer/getone',

  // 获取1个用户
  ONE_USER: '/api/user/getone',
};
