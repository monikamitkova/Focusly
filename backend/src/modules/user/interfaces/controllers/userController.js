const CreateUserDTO = require("../../application/dtos/CreateUserDTO");
const CreateUser = require("../../application/use-case/CreateUser");
const MongooseUserRepository = require("../../infrastructure/repositories/UserRepository");
const User = require("../models/userModel");

const userRepository = new MongooseUserRepository();


const createUserUseCase = new CreateUser(userRepository);

exports.createUser = async (req, res) => {
    try {
        const { name } = req.body;
        const dto = new CreateUserDTO(name);
        const newUser = await createUserUseCase.execute(dto);

        return res.status(201).json(newUser);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}