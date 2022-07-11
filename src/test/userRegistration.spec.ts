import request from 'supertest'
import app from '../app'

describe('User Registration', () => {
	it('returns 200 OK when signup request is valid', (done) => {
		request(app)
			.post('/api/users')
			.send({
				email: 'test@test.com',
				password: 'password123',
				name: 'Test',
			})
			.expect(200, done)
	})
})
