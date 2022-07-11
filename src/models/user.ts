import mongoose, { Document, Schema } from 'mongoose'
import { IUser } from '../definitions/user'

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	hashedPassword: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		min: 4,
		max: 144,
		required: true,
	},
	role: {
		type: String,
		enum: ['ADMIN', 'DIRECTOR', 'OFFICER', 'USER'],
		default: 'USER',
	},
	verified: {
		type: Boolean,
		default: false,
	},

	investigates_bikes: {
		type: Boolean,
		default: true,
	},

	is_available: {
		type: Boolean,
		default: true,
	},
	bikes: [
		{
			type: Schema.Types.ObjectId,
			required: false,
			ref: 'Bike',
		},
	],
})

export default mongoose.model<IUserModel>('User', UserSchema)
