export interface FormValue {
  [string]: any;
}

export type Rule = (value: any, formValue: FormValue) => string | boolean

export interface FormRules {
  [string]: Rule[];
}

export interface FormMessage {
  [string]: string | boolean;
}

export interface FormError {
  [string]: boolean;
}

export type FormContextType = {
  formValue: FormValue;
  setFormValue: (formValue: FormValue) => void;
  formMessage: FormMessage;
  setFormMessage: (formMessage: FormMessage) => void;
  formError: FormError;
  setFormError: (formError: FormError) => void;
  formErrorAll: boolean;
  setFormErrorAll: (boolean) => void;
  formRules: FormRules;
  setFormRules: (formRules: FormRules) => void;
  initForm: ({ value: FormValue, rules: FormRules }) => void;
  setForm: (name: string, value: any) => void;
  getFormMessage: (name: string) => ({ value: any, message: string, error: boolean });
  getFormErrorAll: (error: FormError) => boolean;
}