/**
 * ### 枚举 `Key` 的类型
 */
export type EnumKey = string | number | boolean;

/**
 * ### 标准枚举字典
 *
 */
export interface IEnum<K extends EnumKey = number> {
  /**
   * ### 字典的值
   */
  key: K;

  /**
   * ### 字典的显示标题
   */
  label?: string;

  [key: string]: unknown;
}

/**
 * ### 枚举类
 */
export type EnumConstructor<
  K extends EnumKey = number,
  E extends Enum<K> = Enum<K>,
> = {
  // 支持任意构造函数参数

  new (...args: any[]): E;
} & typeof Enum<K>;

export class Enum<K extends EnumKey = number> implements IEnum<K> {
  /**
   * ### 枚举的值
   */
  readonly key!: K;

  /**
   * ### 枚举的描述
   */
  readonly label?: string;

  /**
   * ### 实例化创建一个枚举项目
   * @param key 枚举值
   * @param label 枚举描述
   */
  constructor(key: K, label?: string) {
    this.key = key;
    if (label) {
      this.label = label;
    }
  }

  [key: string]: unknown;

  /**
   * ### 查找一个枚举选项
   * @param key `Key`
   */
  static get<K extends EnumKey = number, E extends Enum<K> = Enum<K>>(
    this: EnumConstructor<K, E>,
    key: K,
  ): E | null {
    return this.toArray().find((item: E) => item.key === key) || null;
  }

  /**
   * ### 获取一个枚举的标签
   * @param key `Key`
   * @param defaultLabel 默认标签
   */
  static getLabel<K extends EnumKey = number, E extends Enum<K> = Enum<K>>(
    this: EnumConstructor<K, E>,
    key: K,
    defaultLabel = '-',
  ): string {
    const item = this.get(key);
    return item?.label || defaultLabel;
  }

  /**
   * ### 将枚举转为数组
   * @returns 枚举数组
   */
  static toArray<K extends EnumKey = number, E extends Enum<K> = Enum<K>>(
    this: EnumConstructor<K, E>,
  ): E[] {
    return Object.values(this).filter(
      (item): item is E => item instanceof this,
    );
  }

  /**
   * ### 判断 `Key` 是否相等
   * @param key `Key`
   */
  equalsKey(key: EnumKey): boolean {
    return this.key === key;
  }
}
