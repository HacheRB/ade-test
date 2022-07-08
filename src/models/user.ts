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
		select: false,
	},
	verified: {
		type: Boolean,
		default: false,
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
	bike_case: {
		type: Schema.Types.ObjectId,
		required: false,
		ref: 'Bike',
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
