export interface Token {
  id: string;
  name: string;
  username: string;
}

export type TokenVerbose = JWTPayload & { data: Token }