// apiTest.js
const request = require('supertest');
const app = require('../app');

let reply;
//= ===================  replies API test ====================

/**
 * Testing get all comment's replies endpoint
 */
describe('GET /api/campgrounds/:id/comments/:comment_id/replies', function() {
  this.timeout(10000);
  it('respond with json containing a list of all replies for a comment', function(done) {
    request(app)
      .get(
        '/api/campgrounds/5dd26c12de2aed61ac14db3c/comments/5df0c5579e4496496c3a3be3/replies'
      )
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

/**
 * Testing post comment's replies endpoint
 */
describe('POST /api/campgrounds/:id/comments/:comment_id/replies', function() {
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
    text: 'New reply from UnitTests'
  };
  it('respond with 401 unauthorized', function(done) {
    request(app)
      .post(
        '/api/campgrounds/5dd26c12de2aed61ac14db3c/comments/5df0c5579e4496496c3a3be3/replies'
      )
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
  it('respond with 200 ok, reply was inserted into database', function(done) {
    request(app)
      .post(
        '/api/campgrounds/5dd26c12de2aed61ac14db3c/comments/5df0c5579e4496496c3a3be3/replies'
      )
      .set('x-auth-token', token)
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        reply = res.body;
        done();
      });
  });
});

/**
 * Testing get a comment's reply endpoint
 */
describe('GET /api/campgrounds/:id/comments/:comment_id/replies/:reply_id', function() {
  this.timeout(10000);
  it('respond with json reply not found', function(done) {
    request(app)
      .get(
        `/api/campgrounds/5dd26c12de2aed61ac14db3c/comments/5df0c5579e4496496c3a3be3/replies/whatisthisID`
      )
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404) // expecting HTTP status code
      .expect('{"msg":"Cant find the reply"}') // expecting content value
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
  it(`respond with json containing a single reply`, function(done) {
    request(app)
      .get(
        `/api/campgrounds/5dd26c12de2aed61ac14db3c/comments/5df0c5579e4496496c3a3be3/replies/${reply._id}`
      )
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

/**
 * Testing update campgrounds endpoint
 */
describe('PUT /api/campgrounds/:id/comments/:comment_id/replies/:reply_id', function() {
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
    text: `Updated Comment's reply from UnitTests`
  };
  it('respond with 404 not found', function(done) {
    request(app)
      .put(
        `/api/campgrounds/5dd26c12de2aed61ac14db3c/comments/5df0c5579e4496496c3a3be3/replies/weirdcommentid`
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
      .put(
        `/api/campgrounds/5dd26c12de2aed61ac14db3c/comments/5df0c5579e4496496c3a3be3/replies/${reply._id}`
      )
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
      .put(
        `/api/campgrounds/5dd26c12de2aed61ac14db3c/comments/5df0c5579e4496496c3a3be3/replies/${reply._id}`
      )
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
describe('DELETE /api/campgrounds/:id/comments/:comment_id/replies/:reply_id', function() {
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
      .delete(
        `/api/campgrounds/5dd26c12de2aed61ac14db3c/comments/5df0c5579e4496496c3a3be3/replies/somestrangeID`
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
      .delete(
        `/api/campgrounds/5dd26c12de2aed61ac14db3c/comments/5df0c5579e4496496c3a3be3/replies/${reply._id}`
      )
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
      .delete(
        `/api/campgrounds/5dd26c12de2aed61ac14db3c/comments/5df0c5579e4496496c3a3be3/replies/${reply._id}`
      )
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
