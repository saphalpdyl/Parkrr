export enum ErrorCode {
  /*
    Levels:
      1 for authentication related errors
  */
  
  USER_DOES_NOT_EXISTS = "E101",
  USER_ALREADY_EXISTS = "E102",
  USER_PASSWORD_INCORRECT = "E103",
  USER_JWT_MISSING = "E104",
  USER_JWT_EXPIRED = "E105",
  USER_JWT_MALFORMED = "E106",
}