declare namespace Express {
  export interface Request {
    user: {
      index: number,
      data: User | undefined
    } | undefined;
  }
}