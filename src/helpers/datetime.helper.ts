import Luxon from "luxon";

export class DatetimeHelper {
  public static getCurrentUTCMilliseconds() {
    return Luxon.DateTime.now().toUTC().toMillis();
  }
}
