import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export interface MessageAttributes {
  id?: number;
  senderId: number;
  receiverId: number;
  jobId?: number;
  content: string;
  read: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

class Message extends Model<MessageAttributes> implements MessageAttributes {
  public id!: number;
  public senderId!: number;
  public receiverId!: number;
  public jobId?: number;
  public content!: string;
  public read!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'jobs',
        key: 'id'
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    tableName: 'messages',
    timestamps: true
  }
);

export default Message;
