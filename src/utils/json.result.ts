import { HttpStatus } from '@nestjs/common';

const HttpStatusMap = {
  [HttpStatus.OK]: 'success',
  [HttpStatus.UNAUTHORIZED]: '用户未登录',
  [HttpStatus.NOT_FOUND]: '请求的资源不存在',
  [HttpStatus.BAD_REQUEST]: '请求参数错误',
  [HttpStatus.FORBIDDEN]: '没有权限访问',
};

export class JsonResult {
  code: number;
  message: string = 'success';
  data: object;
  success: boolean = false;

  set(code: HttpStatus, message = '') {
    this.code = code;
    this.message = message
      ? message
      : (HttpStatusMap[code] as string) || '未知错误';
    this.success = code === HttpStatus.OK;
    return this;
  }

  setData(data: object) {
    this.data = data;
    return this;
  }

  setParams(key: string, value: object | string | number) {
    this[key] = value;
    return this;
  }

  static getInstance() {
    return new JsonResult();
  }
}
