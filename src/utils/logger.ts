import { config, createLogger, format, transports } from 'winston'
const { combine, colorize, label, timestamp, printf } = format

const myCustomFormat = format.combine(
	colorize({
		all: true,
	}),
	label({
		label: '[Winston]',
	}),
	timestamp({
		format: 'YY-MM-DD HH:MM:SS',
	}),
	printf(
		(info) =>
			` ${info.label} ${info.timestamp}  ${info.level} : ${info.message}`,
	),
)

const logger = createLogger({
	levels: config.syslog.levels,
	format: combine(myCustomFormat),
	transports: [
		new transports.Console({
			handleExceptions: true,
			format: combine(myCustomFormat),
		}),
	],
})

export default logger
