import bcrypt from "bcrypt"
const SALT_ROUND = 10

const signup = async (req, res, next) => {
    const { id,username, email,password } = req.body;

    let hashPassword = password;
    hashPassword = await bcrypt.hash(hashPassword, SALT_ROUND);
    try {
        const result = await req.context.models.users.create({
            user_id:id,
            user_name: username,
            user_email: email,
            user_password: hashPassword
        });
        const { user_name, user_email } = result.dataValues;
        res.send({ user_name, user_email });
    } catch (error) {
        res.status(404).send(error);
    }
}

export default {
    signup
}