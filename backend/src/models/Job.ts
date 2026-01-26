import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export enum JobStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface JobAttributes {
  id?: number;
  title: string;
  description: string;
  budget: number;
  duration: string;
  skills: string[];
  status: JobStatus;
  clientId: number;
  freelancerId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

class Job extends Model<JobAttributes> implements JobAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public budget!: number;
  public duration!: string;
  public skills!: string[];
  public status!: JobStatus;
  public clientId!: number;
  public freelancerId?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    budget: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false
    },
    skills: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    status: {
      type: DataTypes.ENUM(...Object.values(JobStatus)),
      allowNull: false,
      defaultValue: JobStatus.OPEN
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    freelancerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    tableName: 'jobs',
    timestamps: true
  }
);

export default Job;
