/**
 * @author Xio Min
 * @file 简化请求，组件内直接传参数
 */

import API from './app';
import { xFetch } from '../util/index';

export const xSignIn = xFetch(API.SIGN_IN);
export const xRegister = xFetch(API.REGISTER);
