const db = require("../models");
const user = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");
require("dotenv").config();
const secretKey = process.env.SECRETKEY;
const { SigninSchema, SignupSchema } = require("../validations/userValidation");

module.exports.signUp = async (req, res) => {
  const { error } = SignupSchema.validate(req.body);

  if (error) {
    const messages = error.details.map((err) => err.message);
    return res.status(400).json({ error: messages });
  }

  const { name, email, password } = req.body;
  // if (!name || !email || !password) {
  //   return res.status(400).json({ error: "name or email is missing" });
  // }

  // const passwordRegex = /^.{8,}$/;

  // if (!passwordRegex.test(password)) {
  //   return res
  //     .status(400)
  //     .json({ error: "password must be atleast 8 characters long" });
  // }
  try {
    let encryptedPassword = await bcrypt.hash(password, 5);
    let existingUser = await user.findOne({ where: { email: email } });

    if (existingUser) {
      return res.status(400).json({ error: "user already exists" });
    }

    let newUser = await user.create({
      name,
      email,
      password: encryptedPassword,
    });
    console.log("new user added inside the table");
    return res
      .status(201)
      .json({ success: "user created successfuly", user: newUser });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};

module.exports.login = async (req, res) => {
  const { errors } = SigninSchema.validate(req.body);

  if (errors) {
    const messages = error.details.map((err) => err.message);
    return res.status(400).json({ error: messages });
  }

  const { password, email } = req.body;

  try {
    //1-check if user exists = check the email in db
    let existingUser = await user.findOne({ where: { email: email } });

    if (!existingUser) {
      return res.status(400).json({ error: "no user found" });
    }

    //-2 check if the pw entered is true - compare the pw in body with existingUser's pw
    let pwCorrect = await bcrypt.compare(password, existingUser.password);

    console.log(pwCorrect);

    if (!pwCorrect) {
      return res.status(400).json({ error: "password incorrect" });
    }

    //-3 make jwt token
    const token = jwt.sign(
      { email: existingUser.email, role: existingUser.role },
      secretKey,
      {
        expiresIn: "12h",
      }
    );

    //-4 send a response
    return res
      .status(200)
      .json({ success: "user logged in successfully", token: token });
  } catch (error) {}
};

module.exports.deleteUser = async (req, res) => {
  const { email } = req.body;
  try {
    await user.destroy({ where: { email: email } });
    console.log("user deleted successfully");
    return res.json({ success: "user deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};
