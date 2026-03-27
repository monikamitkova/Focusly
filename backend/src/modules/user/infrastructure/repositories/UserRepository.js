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
      doc.totalMinutes,
      doc.todayFocusSessions,
      doc.lastFocusSessionDate
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
      todayFocusSessions: user.getTodayFocusSessions(),
      lastFocusSessionDate: user.getLastFocusSessionDate(),
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

  async findById(id) {
    const doc = await this.UserModel.findById(id);
    return this._toDomain(doc);
  }


  async save(user) {
    const updatedDoc = await this.UserModel.findByIdAndUpdate(
      user.getId(),
      this._toMongooseObject(user),
      { new: true }
    );
    return this._toDomain(updatedDoc);
  }
}

module.exports = MongooseUserRepository;