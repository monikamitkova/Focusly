class CreateUserDTO {
    constructor(name){
        const trimmedName =name?.trim();

        if (!trimmedName){
            throw new Error("User name cannot be empty.");
        }

        this.name = trimmedName;
    }
}

module.exports = CreateUserDTO;