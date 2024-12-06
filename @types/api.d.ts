export type ApiResponse<T = Object> = Promise<{
  data?: T;
  err?: string;
  errParams?: Array<Array<any> | string>;
}>

export type ApiContextType = {
  login: (payload: LoginForm) => ApiResponse<{ name: string }>;
  register: (payload: RegisterForm) => ApiResponse;
  getAllNote: () => ApiResponse<Note[]>;
  getNote: (id: string) => ApiResponse<Note>;
  addNote: () => ApiResponse<{ id: string }>;
  editNote: (id: string, payload: Note & { contents: string }) => ApiResponse;
  removeNote: (id: string) => ApiResponse;
  getTaliq: (noteId: string, contentId: string) => ApiResponse<Taliq>,
  addTaliq: (noteId: string, contentId: string) => ApiResponse,
  editTaliq: (noteId: string, contentId: string, payload: { text: string }) => ApiResponse,
}