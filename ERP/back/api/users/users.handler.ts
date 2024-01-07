import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (err) {
        throw err;
    }
};

export const comparePasswrd = async (password: string, passwordFromDB: string) => {
    try {
        const result = await bcrypt.compare(password, passwordFromDB);
        return result;
    } catch (error) {
        throw error;
    }
}


export const generateRandomToken = (length = 32) => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      token += charset[randomIndex];
    }
  
    return token;
  }
  