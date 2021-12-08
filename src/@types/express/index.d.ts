interface IUser {
  id: string;
  name: string;
  username: string;
  email: string
}

declare namespace Express {
  export interface Request {
    user: {
      index: number,
      data: IUser | undefined
    } | undefined;
  }
}