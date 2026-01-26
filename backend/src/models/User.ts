import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import bcrypt from 'bcryptjs';

export enum UserRole {
  CLIENT = 'client',
  FREELANCER = 'freelancer',
  ADMIN = 'admin'
}

export interface UserAttributes {
  id?: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  profilePicture?: string;
  bio?: string;
  skills?: string[];
  hourlyRate?: number;
  rating?: number;
  completedJobs?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public role!: UserRole;
  public profilePicture?: string;
  public bio?: string;
  public skills?: string[];
  public hourlyRate?: number;
  public rating?: number;
  public completedJobs?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
      defaultValue: UserRole.FREELANCER
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    skills: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    hourlyRate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0
    },
    completedJobs: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeCreate: async (user: User) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async (user: User) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      }
    }
  }
);

export default User;
