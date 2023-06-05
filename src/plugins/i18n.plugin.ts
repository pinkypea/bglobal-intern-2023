import i18next from "i18next";
import { LangConst } from "@/const/lang.const";
import { ja } from "@/locales/ja";

i18next.init({
  debug: import.meta.env.DEV,
  resources: { ja },
  lng: LangConst.DEFAULT_LOCALE.lng,
  fallbackLng: LangConst.DEFAULT_LOCALE.lng,
  supportedLngs: Object.values(LangConst.LOCALES).map((l) => l.lng),
  ns: LangConst.DEFAULT_NS,
  defaultNS: LangConst.DEFAULT_NS,
});

const translate = i18next.t;

const changeLocale = (locale: string) => {
  return i18next.changeLanguage(locale);
};

export { i18next, translate, changeLocale };
