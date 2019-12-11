// apiTest.js
const request = require('supertest');
const app = require('../app');

let review;
//= =================== reviews API test ====================

/**
 * Testing get all campground's reviews endpoint
 */
describe('GET /api/campgrounds/:id/reviews', function() {
  this.timeout(10000);
  it('respond with json containing a list of all reviews for a campground', function(done) {
    request(app)
      .get('/api/campgrounds/5df0c3b3bb69ba19804fb4a6/reviews')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

/**
 * Testing post campground's reviews endpoint
 */
describe('POST /api/campgrounds/:id/reviews', function() {
  let token;
  before(done => {
    request(app)
      .post('/api/auth')
      .send({
        email: 'joe@gmail.com',
        password: 'john123'
      })
      .end((err, response) => {
        token = response.body.token; // save the token!
        done();
      });
  });
  const data = {
    rating: 4,
    text: 'New review from UnitTests'
  };
  it('respond with 401 unauthorized', function(done) {
    request(app)
      .post('/api/campgrounds/5df0c3b3bb69ba19804fb4a6/reviews')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
  it('respond with 200 ok', function(done) {
    request(app)
      .post('/api/campgrounds/5df0c3b3bb69ba19804fb4a6/reviews')
      .set('x-auth-token', token)
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        review = res.body;
        done();
      });
  });
});

/**
 * Testing get a campground's reviews endpoint
 */
describe('GET /api/campgrounds/:id/reviews/:review_id', function() {
  it('respond with json review not found', function(done) {
    request(app)
      .get(`/api/campgrounds/5df0c3b3bb69ba19804fb4a6/reviews/weirdcommentid`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404) // expecting HTTP status code
      .expect('{"msg":"Review not found"}') // expecting content value
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
  it(`respond with json containing a single campground's review`, function(done) {
    request(app)
      .get(`/api/campgrounds/5df0c3b3bb69ba19804fb4a6/reviews/${review._id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

/**
 * Testing update campgrounds endpoint
 */
describe('PUT /api/campgrounds/:id/reviews/:review_id', function() {
  let token;
  before(done => {
    request(app)
      .post('/api/auth')
      .send({
        email: 'joe@gmail.com',
        password: 'john123'
      })
      .end((err, response) => {
        token = response.body.token; // save the token!
        done();
      });
  });
  const data = {
    text: `Updated Campground's Review from UnitTests`
  };
  it('respond with 404 not found', function(done) {
    request(app)
      .put(
        `/api/campgrounds/5df0c3b3bb69ba19804fb4a6/reviews/thisIdDoesNotExist`
      )
      .set('x-auth-token', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
  it('respond with 401 unauthorized', function(done) {
    request(app)
      .put(`/api/campgrounds/5df0c3b3bb69ba19804fb4a6/reviews/${review._id}`)
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
  it('respond with 200 ok', function(done) {
    request(app)
      .put(`/api/campgrounds/5df0c3b3bb69ba19804fb4a6/reviews/${review._id}`)
      .set('x-auth-token', token)
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});

/**
 * Testing delete campgrounds endpoint
 */
describe('DELETE /api/campgrounds/:id/reviews/:review_id', function() {
  let token;
  before(done => {
    request(app)
      .post('/api/auth')
      .send({
        email: 'joe@gmail.com',
        password: 'john123'
      })
      .end((err, response) => {
        token = response.body.token; // save the token!
        done();
      });
  });
  it('respond with 404 not found', function(done) {
    request(app)
      .delete(`/api/campgrounds/5df0c3b3bb69ba19804fb4a6/reviews/notexistingid`)
      .set('x-auth-token', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
  it('respond with 401 unauthorized', function(done) {
    request(app)
      .delete(`/api/campgrounds/5df0c3b3bb69ba19804fb4a6/reviews/${review._id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
  it('respond with 200 ok', function(done) {
    request(app)
      .delete(`/api/campgrounds/5df0c3b3bb69ba19804fb4a6/reviews/${review._id}`)
      .set('x-auth-token', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});
