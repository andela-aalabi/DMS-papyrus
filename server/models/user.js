import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      },
      unique: {
        args: true,
        msg: 'email already in use'
      }
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username already in use'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2
    },
  }, {
    hooks: {
      beforeCreate(user) {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      },
      beforeUpdate(user) {
        if (user.password) {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
          user.updateAt = Date.now();
        }
      },
      beforeBulkUpdate(users) {
        if (users.attributes && users.attributes.password) {
          const salt = bcrypt.genSaltSync();
          const password = users.attributes.password;
          users.attributes.password = bcrypt.hashSync(password, salt);
        }
      }
    },
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        User.belongsTo(models.Roles, {
          foreignKey: {
            name: 'roleId',
            onDelete: null
          }
        });
        User.hasMany(models.Documents, {
          foreignKey: {
            name: 'ownerId',
            onDelete: null
          }
        });
      }
    },
    freezeTableName: true,
    instanceMethods: {
      isPassword(password) {
        return bcrypt.compareSync(password, this.password);
      }
    }
  });
  return User;
};
