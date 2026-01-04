import { BooleanEnum } from '@/enums/BooleanEnum';

export class PageListColumn {
  /**
   * # 列标题
   */
  label: string = '';

  /**
   * # 是否固定列
   * ## 1: 固定列 0: 不固定列
   */
  fixed: number = BooleanEnum.FALSE;

  /**
   * # 是否可复制
   * ## 1: 可复制 0: 不可复制
   */
  copyable: number = BooleanEnum.FALSE;

  /**
   * # 数据字典ID
   */
  dictClassId: string = '';
}

export class Button {
  /**
   * # 按钮名称
   */
  name: string;

  /**
   * # 是否启用
   */
  enable: number = BooleanEnum.TRUE;

  /**
   * # 方法ID
   */
  methodId: string = '';

  /**
   * # 按钮图标
   */
  icon: string = '';

  /**
   * # 按钮类型
   */
  type = '';

  /**
   * # 子按钮
   */
  children: Button[] = [];
}

export class PageList {
  /**
   * # 是否显示分页
   * ## 1: 显示 0: 不显示
   */
  isShowPage: number = BooleanEnum.TRUE;

  /**
   * # 每页显示条目个数
   */
  pageSize: number[] = [10, 20, 30, 40, 50];

  /**
   * # 头部搜索类型
   * ## 0: 不展示检索 1: 简单检索 2: 高级检索
   */
  searchType = 1;

  /**
   * # 列配置
   */
  columnList: PageListColumn[] = [];

  /**
   * # 按钮配置
   */
  button: Button[] = [];
}
