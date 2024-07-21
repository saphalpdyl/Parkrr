export enum ErrorCode {
  /*
    Levels:
      1 for authentication related errors
      4 for payload related errors
      5 for system errors
  */
  
  USER_DOES_NOT_EXISTS = "E101",
  USER_ALREADY_EXISTS = "E102",
  USER_PASSWORD_INCORRECT = "E103",
  USER_JWT_MISSING = "E104",
  USER_JWT_EXPIRED = "E105",
  USER_JWT_MALFORMED = "E106",
  PAYLOAD_ITEM_NOT_FOUND = "E401",
  SYSTEM_ITEM_NOT_FOUND = "E501",
  SYSTEM_USER_NOT_AUTHORIZED = "E502",
}