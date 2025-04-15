const UserDao = require('../daos/userDao');
const { generateHash, verify } = require('../utils/hashUtils');
const CustomError = require('../utils/errorHandler');

class UserService {
  constructor() {
    this.userDao = new UserDao();
  }
  
  async createUser(user) {
    try {
      console.log("Inside createUser method");
      user.password = await generateHash(user.password);
      const createdUser = await this.userDao.createUser(user);
      return createdUser;
    } catch (error) {
      throw new CustomError(500, "Internal server error");
    }
  }

  async authenticateUser(reqBody) {
    try {
      const user = await this.userDao.getUserByEmail(reqBody.email);
      if (!user) {
        throw new CustomError(404, "User not found");
      }
      const isValid = await verify(reqBody.password, user.password);
      if (isValid) {
        return user;
      } else {
        throw new CustomError(401, "Invalid credentials");
      }
    } catch (error) {
      throw new CustomError(500, "Internal server error");
    }
  }
  
  async getUserById(userId) {
    try {
      const user = await this.userDao.getUserById(userId);
      if (!user) {
        throw new CustomError(404, "User not found");
      }
      return user;
    } catch (error) {
      throw new CustomError(500, "Internal server error");
    }
  }
  
  async getUserByEmail(email) {
    try {
      const user = await this.userDao.getUserByEmail(email);
      if (!user) {
        throw new CustomError(404, "User not found");
      }
      return user;
    } catch (error) {
      throw new CustomError(500, "Internal server error");
    }
  }
  
  async updateUser(user) {
    try {
      const result = await this.userDao.updateUser(user);
      if (!result) {
        throw new CustomError(404, "User not found");
      }
      return result;
    } catch (error) {
      throw new CustomError(500, "Internal server error");
    }
  }
  
  async deleteUser(userId) {
    try {
      const result = await this.userDao.deleteUser(userId);
      return result;
    } catch (error) {
      throw new CustomError(500, "Internal server error");
    }
  }
}

module.exports = UserService;
