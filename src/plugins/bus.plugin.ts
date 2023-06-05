export class EventBus {
  public static emit<T>(eventName: string, data?: T) {
    if (window && window.CustomEvent) {
      const event = new CustomEvent<T>(eventName, { detail: data });
      window.dispatchEvent(event);
    } else {
      console.error("Error: window is not defined");
    }
  }

  public static on<T>(eventName: string, callback: EventBusCallback<T>) {
    if (window) {
      window.addEventListener(eventName, (e: any) => {
        callback(e.detail);
      });
    } else {
      console.error("Error: window is not defined");
    }
  }

  public static off<T>(eventName: string, callback: EventBusCallback<T>) {
    if (window) {
      window.removeEventListener(eventName, (e: any) => {
        callback(e.detail);
      });
    } else {
      console.error("Error: window is not defined");
    }
  }
}

export type EventBusCallback<T> = (data: T) => void;
