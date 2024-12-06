export type LocaleContextType = {
  localeValue: string;
  setLocaleValue: (localeValue: string) => void;
  locale: (text: string, params?: Array<Array<any> | string>) => string;
};

export interface LocaleMap {
  [string]: {
    id: string;
    en: string;
    ar: string;
  };
}