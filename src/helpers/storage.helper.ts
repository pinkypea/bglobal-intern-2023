import Cookies from "js-cookie";
import localforage from "localforage";

export class StorageHelper {
  public static async setLocalForage<T>(key: string, value: T): Promise<T> {
    const output = await localforage.setItem<T>(key, value);
    return output;
  }

  public static async getLocalForage<T>(key: string): Promise<T | null> {
    const output = await localforage.getItem<T>(key);
    return output;
  }

  public static async removeLocalForage(key: string): Promise<boolean> {
    try {
      await localforage.removeItem(key);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  public static setCookies<T>(key: string, value: T, day: number = 0, options: Cookies.CookieAttributes = {}): void {
    let data: any = value;
    if (typeof value === "boolean") data = value === true ? 1 : 0;
    Cookies.set(key, JSON.stringify(data), { ...options, expires: day });
  }

  public static getCookies<T>(key: string): T | null {
    const value = Cookies.get(key);
    return value ? JSON.parse(value) : null;
  }

  public static removeCookies(key: string, options: Cookies.CookieAttributes = {}): void {
    Cookies.remove(key, options);
  }
}
