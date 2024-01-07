import { AdminUser } from "./users.model";
import { User } from "./users.interface";
import * as handelUsers from './users.handler'
import * as usersValidation from './users.validation';

export const loginUser = async (reqBody: User) => {
  const { username, password } = reqBody;

  try {
    const userInstance = await AdminUser.findOne({
      where: { username: username }
    });

    const user: User = userInstance!.dataValues;
    console.log(user.password);


    if (!user.password) {
      return { content: { message: 'User not found' }, status: 404 };
    }

    if ( await handelUsers.comparePasswrd(password, user.password)) {
      return { content: user, status: 200 };
    } else {
      return { content: { message: 'Incorrect password' }, status: 401 };
    }
  } catch (err) {
    console.error(err);
    return { content: { message: 'Internal Server Error' }, status: 500 };
  }
};
export const registerUser = async (reqBody: User) => {

    const { username, password } = reqBody
  
    try {
      if (!usersValidation.newUserValidator(password!)) {
        return { message: 'The password must contain 7 characters with at least one uppercase letter and one lowercase letter.', status: 400 };
      } else if (await usersValidation.ifUserExisting(reqBody)) {
        return { message: 'User already exists', status: 409 };
      }
  
      const passwordHashed = await handelUsers.hashPassword(password!);
  
      const user = await AdminUser.create({
        username: username,
        password: passwordHashed,
      });
  
      return { user: user, status: 201 }; // 201 Created
    } catch (error) {
      console.error('An error occurred while creating a new user:', error);
      throw error;
    }
  };
  
