import { hash } from "bcrypt";

const password = "";

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);
    console.log("Hashed Password:", hashedPassword);
  } catch (err) {
    console.error("Error hashing password:", err);
  }
};

hashPassword(password);
