const CreateUserDTO = require("../../application/dtos/CreateUserDTO");
const CreateUser = require("../../application/use-case/CreateUser");
const MongooseUserRepository = require("../../infrastructure/repositories/UserRepository");

const userRepository = new MongooseUserRepository();
const createUserUseCase = new CreateUser(userRepository);

const formatUser = (user) => ({
    id: user.getId ? user.getId() : user.id,
    name: user.getName(),
    xp: user.getXp(),
    level: user.getLevel(),
    streak: user.getStreak(),
    totalMinutes: user.getTotalMinutes(),
    todayFocusSessions: user.getTodayFocusSessions()
});

exports.signup = async (req, res) => {
    try {
        const { name } = req.body;

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
        console.error("🔥 SIGNUP ERROR:", error);

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
        console.error("🔥 LOGIN ERROR:", error);

        return res.status(500).json({
            message: error.message || "Internal server error"
        });
    }
};

exports.updateProgress = async (req, res) => {
    try {
        const { id } = req.params;
        const { earnedXp, minutes } = req.body;

        const user = await userRepository.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (earnedXp > 0) {
            const currentDate = new Date();

            user.addXp(earnedXp);
            user.updateStreak(currentDate);
            user.updateTodayFocusSessions(currentDate);
        }


        if (minutes > 0) {
            user.addTotalMinutes(minutes);
        }

        const updatedUser = await userRepository.save(user);

        return res.status(200).json({
            message: "Progress updated successfully",
            user: formatUser(updatedUser)
        });
    } catch (error) {
        console.error("UPDATE PROGRESS ERROR:", error);

        return res.status(500).json({
            message: error.message || "Internal server error"
        });
    }
};