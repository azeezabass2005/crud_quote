import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "./verify-jwt";

export const verifyRole = (allowedRoles: string[]) => (req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  const userRole = req?.token?.role
  console.log(`${userRole} is the user role`)
  
  if(allowedRoles.some((role: string) => userRole.includes(role))) {
    next()
  } else {
    return res.status(403).json({"message": "Access Denied, Route Accessible to Admin Only"})
  }
}