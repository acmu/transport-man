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
