import mongoose, { Document, Schema } from 'mongoose'
import { IDepartment } from '../definitions/department'

export interface IDepartmentModel extends IDepartment, Document {}

const DepartmentSchema: Schema = new Schema({
	name: {
		type: String,
		min: 4,
		max: 144,
		required: true,
	},
	officers: [
		{
			type: Schema.Types.ObjectId,
			default: [],
			ref: 'User',
		},
	],
})

export default mongoose.model<IDepartmentModel>('Department', DepartmentSchema)
