import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export enum ProposalStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected'
}

export interface ProposalAttributes {
  id?: number;
  jobId: number;
  freelancerId: number;
  coverLetter: string;
  proposedBudget: number;
  estimatedDuration: string;
  status: ProposalStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

class Proposal extends Model<ProposalAttributes> implements ProposalAttributes {
  public id!: number;
  public jobId!: number;
  public freelancerId!: number;
  public coverLetter!: string;
  public proposedBudget!: number;
  public estimatedDuration!: string;
  public status!: ProposalStatus;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Proposal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'jobs',
        key: 'id'
      }
    },
    freelancerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    coverLetter: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    proposedBudget: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    estimatedDuration: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(...Object.values(ProposalStatus)),
      allowNull: false,
      defaultValue: ProposalStatus.PENDING
    }
  },
  {
    sequelize,
    tableName: 'proposals',
    timestamps: true
  }
);

export default Proposal;
