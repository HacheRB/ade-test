import bcrypt from 'bcrypt'

export async function checkPassword(
	password: string,
	hashedPassword: string,
): Promise<boolean> {
	return await bcrypt.compare(password, hashedPassword)
}

export async function hashPassword(
	password: string,
	saltRounds = 10,
): Promise<string> {
	return await bcrypt.hash(password, saltRounds)
}
