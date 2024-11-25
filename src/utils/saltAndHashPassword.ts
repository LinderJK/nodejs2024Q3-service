import * as bcrypt from 'bcrypt';
import * as process from 'node:process';

export class SaltAndHashPassword {
  private static saltRounds = process.env.CRYPT_SALT;

  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(parseInt(this.saltRounds));
    console.log(salt, 'SALT', this.saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  static async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}

export default SaltAndHashPassword;
