export class LangConst {
  public static LOCALES: Locales = {
    ja: { lng: "ja", iso: "ja-JP" },
  };

  public static DEFAULT_LOCALE: Locale = this.LOCALES.ja;

  public static DEFAULT_NS: string = "common";
}

export type Locale = {
  lng: string;
  iso: string; // https://www.andiamo.co.uk/resources/iso-language-codes/
};

export type Locales = {
  ja: Locale;
};
