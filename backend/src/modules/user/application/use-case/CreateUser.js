const User = require("../../domain/User");

class CreateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(createUserDTO) {
    const { name } = createUserDTO;

    const existingUser = await this.userRepository.findByName(name);

    if (existingUser) {
      throw new Error("User with this name already exists.");
    }

    const newUser = new User(null, name);
    const createdUser = await this.userRepository.save(newUser);

    return createdUser;
  }
}

module.exports = CreateUser;