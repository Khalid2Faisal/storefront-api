import bcrypt from "bcrypt";

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS as string;

/**
 * It takes a password, adds a pepper to it, and then hashes it using bcrypt
 * @param {string} password - The password to hash
 * @returns A string representing the hashed password
 */
export const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(parseInt(saltRounds, 10));
  return bcrypt.hashSync(password + pepper, salt);
};

/**
 * It takes a password and a hashed password, and returns true if the password matches the hashed
 * password
 * @param {string} password - The password that the user entered
 * @param {string} hashedPassword - The hashed password that was stored in the database.
 * @returns A boolean value.
 */
export const comparePassword = (password: string, hashedPassword: string): boolean => {
  return bcrypt.compareSync(password + pepper, hashedPassword);
};
