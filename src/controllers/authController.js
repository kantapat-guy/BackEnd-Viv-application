const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../models/userModel");
// const { expressjwt } = require("express-jwt");



const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};


exports.login= async (req,res) => {
    try {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(401).send({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!validPassword)
        return res.status(401).send({ message: "Invalid Email or Password" });

    const email = req.body.email

    const getToken = () =>{ 
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {expiresIn:'7d'})
            return {token, email}
    }

    // const token = User.generateAuthToken();

    res.status(200).send({ data: getToken(), message: "logged in successfully" });
} catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
}
};


// exports.requireLogin = expressjwt({
//     secret:process.env.JWT_SECRET,
//     algorithms: ["HS256"],
//     userProperty:"auth"
// })