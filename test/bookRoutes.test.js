const app = require('../routes/books'); // Assuming your Express app instance is exported from index.js
const request = require('supertest');
const { expect } = require('chai');

describe('GET /books', () => {
  it('responds with JSON array of books', (done) => {
    request(app)
      .get('/books')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});