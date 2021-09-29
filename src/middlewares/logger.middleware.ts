import { Request, Response, NextFunction } from 'express';

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('req', req);
  console.log('res', res);

  console.log(`Phải qua middleware`);
  next();
}
