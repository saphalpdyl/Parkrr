import { ErrorCode } from "../constants/enum";

class ApiError extends Error {
  public errCode: string;
  
  constructor(message: string, errCode: ErrorCode) {
    super(message);
    this.message = message;
    this.errCode = errCode;
  }
  
  toJSON() {
    return {
      message: this.message,
      errCode: this.errCode,
    };
  }
}

export class ServiceError extends ApiError {}

export class AuthError extends ApiError {}