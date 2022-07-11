import mongoose, { Document, Schema } from 'mongoose'
import { BikeStatus, IBike } from '../definitions/bike'

export interface IBikeModel extends IBike, Document {}

const BikeSchema: Schema = new Schema({
	license_number: {
		type: String,
		required: true,
		unique: true,
	},
	color: {
		type: String,
		min: 3,
		max: 144,
		required: true,
	},
	type: {
		type: String,
		min: 3,
		max: 144,
		required: true,
	},
	date_stolen: {
		type: Date,
		default: Date.now,
	},
	last_updated: {
		type: Date,
		default: Date.now,
	},
	theft_description: {
		type: String,
		max: 500,
		required: true,
	},
	status: {
		type: String,
		enum: ['REPORTED', 'ASSIGNED', 'UNASSIGNED', 'CLOSED'],
		default: 'UNASSIGNED',
	},
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	officer: {
		type: Schema.Types.ObjectId,
		required: false,
		ref: 'User',
	},
})

// Use Schema.pre to update last_updated

export default mongoose.model<IBikeModel>('Bike', BikeSchema)
