import { AdminUser } from "./users.model";
import { User } from "./users.interface";

export const newUserValidator = (password: string) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$!%*?&]{7,12}$/;
    return password.length >= 7 && passwordRegex.test(password);
}

export const ifUserExisting = async (reqUser: User) => {
    const userFromDB = await AdminUser.findOne({ where :{ username: reqUser.username } });
    return userFromDB !== null
}





