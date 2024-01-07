import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as userService from './users.service';

const SECRET_KEY = 'erp';

const generateToken = (userId: string) => {
  return jwt.sign({ userId }, SECRET_KEY!, { expiresIn: '3h' });
};

export const loginUser = async (req: Request, res: Response) => {  
  try {
    const user = await userService.loginUser(req.body);
    if (user.status === 200){
      const token = generateToken(SECRET_KEY!);
      res.status(user.status).json({ token });
    } else {
      res.status(user.status).json(user.content);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const registerUser = async (req: Request, res: Response) => {
  try {
      const userCreationResult = await userService.registerUser(req.body);

      if (userCreationResult.status === 201) {
          res.status(userCreationResult.status).json({ user: userCreationResult.user, message: 'User created successfully' });
      } else {
          res.status(userCreationResult.status).json({ message: userCreationResult.message });
      }
  } catch (error) {
      console.error('An error occurred while processing the request:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};