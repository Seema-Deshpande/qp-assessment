declare namespace Express {
    export interface Request {
      user?: any; // Add the `user` field here after decoding the JWT
    }
  }
