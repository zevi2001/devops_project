import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY

export function authenticateToken (req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  jwt.verify(token, secretKey!, (err) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
    next();
  });
};

