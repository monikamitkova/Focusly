const User = require("../../domain/User");
const UserModel = require("../models/userModel");

class MongooseUserRepository {
  constructor(userModel = UserModel) {
    this.UserModel = userModel;
  }

  _toDomain(doc) {
    if (!doc) return null;

    return new User(
      doc._id.toString(),
      doc.name,
      doc.xp,
      doc.level,
      doc.streak,
      doc.lastActiveDate,
      doc.totalMinutes
    );
  }

  _toMongooseObject(user) {
    return {
      name: user.getName(),
      xp: user.getXp(),
      level: user.getLevel(),
      streak: user.getStreak(),
      lastActiveDate: user.getLastActiveDate(),
      totalMinutes: user.getTotalMinutes(),
    };
  }

  async create(userEntity) {
    const data = this._toMongooseObject(userEntity);

    const created = await this.UserModel.create(data);

    return this._toDomain(created);
  }

  async findByName(name) {
    const doc = await this.UserModel.findOne({ name });
    return this._toDomain(doc);
  }
}

module.exports = MongooseUserRepository;