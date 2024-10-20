import {TUser} from "../interfaces/interfaces";

const users: TUser[] = [];

class UserController {
  getAllUsers() {
    return users;
  }
  getUserById(userId: string) {

  }
  createUser(body: any) {

  }
  editUser(body: any) {

  }
  deleteUser(userId: string) {

  }
}

export default new UserController();