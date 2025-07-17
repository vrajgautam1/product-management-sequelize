const user = require("../models/user")
const bcrypt = require("bcrypt")

module.exports.signUp = async(req, res)=>{
    const {name, email, password} = req.body
    if(!name || !email || !password){
        return res.status(400).json({error:"name or email is missing"})
    }

    try {
        let encryptedPassword = await bcrypt.hash(password, 5)
        let newUser = await user.create({name, email, encryptedPassword})
        console.log("new user added inside the table")
        return res.status(201).json({success})
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ error: error.message });
    }
}