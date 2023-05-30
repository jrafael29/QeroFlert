const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRETKEY = process.env.JWT_SECRET_KEY || "jrafaeldev";

const UserModel = require("../../models/user.model");
const Validator = require("../../helpers/validator.helper");
const {
    errorResponse,
    successResponse,
} = require("../../helpers/responseRequest.helper");

exports.login = async (request, response) => {
    const data = request.body;
    try {
        if (
            data &&
            data.hasOwnProperty("email") &&
            data.hasOwnProperty("password")
        ) {
            const { email, password } = data;

            const userObject = await UserModel.findOne({ email });

            if (userObject) {
                if (
                    email === userObject.email &&
                    bcrypt.compareSync(password, userObject.password)
                ) {
                    const tokenPayload = {
                        id: userObject._id,
                    };
                    const token = jwt.sign(tokenPayload, SECRETKEY, {
                        expiresIn: 300,
                    });

                    return successResponse(response, { token });
                }
            }

            return errorResponse(response, "Email ou senha inválidos");
        }
        return errorResponse(response, "Campos inválidos", 401);
    } catch (error) {
        console.log("ocorreu um erro: ", error);
        return errorResponse(response, error.message);
    }
};

exports.register = async (request, response) => {
    try {
        const data = request.body;

        if (
            data &&
            data.hasOwnProperty("email") &&
            data.hasOwnProperty("password") &&
            data.hasOwnProperty("name")
        ) {
            const { email, password, name } = data;

            if (Validator.validateEmailPattern(email)) {
                const passwordHash = await bcrypt.hash(password, 10);

                console.log("esse é o end do mongo", process.env.MONGO_URL);
                console.log("essa é a senha com hash", passwordHash);

                const user = new UserModel({
                    name,
                    email,
                    password: passwordHash,
                    createdAt: new Date(),
                });
                await user.save();

                return successResponse(response, user, 201);
            }
            return errorResponse(response, "Email inválido", 401);
        }

        return errorResponse(response, "Campos inválidos", 401);
    } catch (error) {
        console.log("ocorreu um erro", error);
        return errorResponse(response, error.message);
    }
};
