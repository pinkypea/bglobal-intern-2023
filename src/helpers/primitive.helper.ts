import humps from "humps";

export class PrimitiveHelper {
  public static convertSnakeToCamel(data: string) {
    return humps.camelize(data);
  }

  public static convertCamelToSnake(data: string) {
    return humps.decamelize(data);
  }

  public static getRandomInRange = (from: any, to: any, fixed: any = 5) => {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  };

  public static convertHex2Rgba = (hex: string, opacity: number = 1): string => {
    if (opacity > 1) opacity = 1;
    let c: any = null;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");

      return "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ", " + opacity + ")";
    }

    throw new Error("Cannot convert hex to rgb");
  };
}
