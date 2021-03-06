import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import File from '../app/models/File';
import Folder from '../app/models/Folder';
import User from '../app/models/User';

const models = [File, User, Folder];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

}

export default new Database();
