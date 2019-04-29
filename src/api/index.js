/**
 * @file 简化请求，组件内直接传参数
 */

import API from './app';
import { xFetch } from '../util/index';

export const xSignIn = xFetch(API.SIGN_IN);

export const xRegister = xFetch(API.REGISTER);

export const xSignOut = xFetch(API.SIGN_OUT);

export const xCheckSign = xFetch(API.CHECK_SIGN);

export const xUpdateUser = xFetch(API.UPDATE_UESR);

export const xAddCustomer = xFetch(API.ADD_CUSTOMER);

export const xListCustomer = xFetch(API.LIST_CUSTOMER);

export const xDeleteCustomer = xFetch(API.DELETE_CUSTOMER);

export const xUpdateCustomer = xFetch(API.UPDATE_CUSTOMER);

export const xAddOrder = xFetch(API.ADD_ORDER);

export const xListOrder = xFetch(API.LIST_ORDER);

export const xDeleteOrder = xFetch(API.DELETE_ORDER);

export const xUpdateOrder = xFetch(API.UPDATE_ORDER);

export const xUserName = xFetch(API.USER_NAME);

export const xCustomerName = xFetch(API.CUSTOMER_NAME);

export const xOneCustomer = xFetch(API.ONE_CUSTOMER);

export const xOneUser = xFetch(API.ONE_USER);
