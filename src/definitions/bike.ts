import { Types } from 'mongoose'

export enum BikeStatus {
	REPORTED = 'REPORTED',
	ASSIGNED = 'ASSIGNED',
	UNASSIGNED = 'UNASSIGNED',
	CLOSED = 'CLOSED',
}

export interface ILocation {
	latitude: string
	longitude: string
}

export interface IBike {
	license_number: string
	color: string
	type: string
	date_stolen: Date
	last_updated: Date
	theft_description: string
	theft_location: ILocation
	status: BikeStatus
	user: Types.ObjectId
	officer: Types.ObjectId
	department: Types.ObjectId
}
