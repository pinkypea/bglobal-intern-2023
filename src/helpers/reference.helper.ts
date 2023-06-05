import humps from "humps";
import lodash from "lodash";

export class ReferenceHelper {
  public static range(start: number, end: number) {
    const array: Array<number> = [];
    if (start >= end) {
      for (let i = start; i <= end; i++) {
        array.push(i);
      }
    } else {
      for (let i = end; i >= start; i--) {
        array.push(i);
      }
    }

    return array;
  }

  public static convertSnakeToCamel<CamelType>(data: any) {
    return humps.camelizeKeys<CamelType>(data);
  }

  public static convertCamelToSnake<SnakeType>(data: any) {
    return humps.decamelizeKeys<SnakeType>(data);
  }

  public static deepClone<CloneType>(data: CloneType) {
    return lodash.cloneDeep(data);
  }
}
