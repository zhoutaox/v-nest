import { HttpStatus } from '@nestjs/common';

export class JsonResult {
  code: number;
  message: string = 'success';
  data: object;
  success: boolean = false;

  set(code: HttpStatus, message = '') {
    this.code = code;
    this.message = message;
    this.success = code === HttpStatus.OK;
    return this;
  }

  setData(data: object) {
    this.data = data;
    return this;
  }

  setParams(key: string, value: object) {
    this[key] = value;
    return this;
  }

  static getInstance() {
    return new JsonResult();
  }
}
