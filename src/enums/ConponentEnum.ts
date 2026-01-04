import { Enum } from '@/core/enum/Enum';

export class ComponentEnum extends Enum {
  static readonly INPUT = new ComponentEnum(0, '输入框');
  static readonly SELECT = new ComponentEnum(1, '下拉框');
  static readonly RADIO = new ComponentEnum(2, '单选框');
  static readonly PASSWORD = new ComponentEnum(3, '密码框');
  static readonly IMG = new ComponentEnum(4, '单图上传');
  static readonly MULTI_IMG = new ComponentEnum(5, '多图上传');
  static readonly TEXTAREA = new ComponentEnum(6, '多行文本框');
  static readonly CASCADER = new ComponentEnum(7, '级联选择');
  static readonly CHECKBOX = new ComponentEnum(8, '复选框');
  static readonly INPUT_NUMBER = new ComponentEnum(9, '数字输入框');
  static readonly SWITCH = new ComponentEnum(10, '开关');
  static readonly TREE_SELECT = new ComponentEnum(11, '树形下拉框');
}
