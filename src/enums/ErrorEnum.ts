import { Enum } from '../core/enum/Enum';

export class ErrorEnum extends Enum {
  static readonly DEFAULT = new ErrorEnum(0, '未知错误');
  static readonly SERVER_ERROR = new ErrorEnum(500, '服务器错误');
  static readonly SYSTEM_USER_EXISTS = new ErrorEnum(1001, '系统用户已存在');
  static readonly SYSTEM_USER_NOT_EXISTS = new ErrorEnum(
    1002,
    '系统用户不存在',
  );
  static readonly SYSTEM_USER_PASSWORD_ERROR = new ErrorEnum(
    1003,
    '系统用户密码错误',
  );
}
