import { AuthenticatedRouteContext } from "../types";
import { AuthError, ServiceError } from "./error";

export default function withErrorHandling<T>(fn: (c: AuthenticatedRouteContext) => Promise<T>) {
  return async (c: AuthenticatedRouteContext) => {
    try {
      return await fn(c);
    } catch (e) {
      if (e instanceof ServiceError ) {
        c.status(400);
        return c.json(e.toJSON());
      } else if ( e instanceof AuthError ) {
        c.status(403);
        return c.json(e.toJSON());
      }

      c.status(500);
      return c.json({
        message: "Internal Server Error",
        details: e,
      });
    }
  }
}