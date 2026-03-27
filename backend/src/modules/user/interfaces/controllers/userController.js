const CreateUserDTO = require("../../application/dtos/CreateUserDTO");
const CreateUser = require("../../application/use-case/CreateUser");
const MongooseUserRepository = require("../../infrastructure/repositories/UserRepository");

const userRepository = new MongooseUserRepository();
const createUserUseCase = new CreateUser(userRepository);

// ✅ helper to format user (clean API response)
const formatUser = (user) => ({
    id: user.getId ? user.getId() : user.id,
    name: user.getName(),
    xp: user.getXp(),
    level: user.getLevel(),
    streak: user.getStreak(),
    totalMinutes: user.getTotalMinutes()
});

// ✅ SIGNUP
exports.signup = async (req, res) => {
    try {
        const { name } = req.body;

        // basic validation
        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            });
        }

        const userData = new CreateUserDTO(name);

        const newUser = await createUserUseCase.execute(userData);

        return res.status(201).json({
            message: "Account created successfully",
            user: formatUser(newUser)
        });

    } catch (error) {
        // 🔥 IMPORTANT DEBUG LOG
        console.error("🔥 SIGNUP ERROR:", error);

        // handle duplicate user
        if (error.code === 11000) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        return res.status(500).json({
            message: error.message || "Internal server error"
        });
    }
};

// ✅ LOGIN
exports.login = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            });
        }

        const user = await userRepository.findByName(name);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "Login successful",
            user: formatUser(user)
        });

    } catch (error) {
        // 🔥 IMPORTANT DEBUG LOG
        console.error("🔥 LOGIN ERROR:", error);

        return res.status(500).json({
            message: error.message || "Internal server error"
        });
    }
};