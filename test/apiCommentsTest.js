//apiTest.js
const request = require('supertest');
const app = require('../app');

var comment;
//==================== comments API test ====================

/**
 * Testing get all campground's comments endpoint
 */
describe('GET /api/campgrounds/:id/comments', function() {
  this.timeout(10000);
  it('respond with json containing a list of all comments for a campground', function(done) {
    request(app)
      .get('/api/campgrounds/5dd26c12de2aed61ac14db3c/comments')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

/**
 * Testing post campground's comments endpoint
 */
describe('POST /api/campgrounds/:id/comments', function() {
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
  let data = {
    text: 'New comment from UnitTests'
  };
  it('respond with 401 unauthorized', function(done) {
    request(app)
      .post('/api/campgrounds/5dd26c12de2aed61ac14db3c/comments')
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
      .post('/api/campgrounds/5dd26c12de2aed61ac14db3c/comments')
      .set('x-auth-token', token)
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        comment = res.body;
        done();
      });
  });
});

/**
 * Testing get a campground's comment endpoint
 */
describe('GET /api/campgrounds/:id/comments/:comment_id', function() {
  it('respond with json comment not found', function(done) {
    request(app)
      .get(`/api/campgrounds/5dd26c12de2aed61ac14db3c/comments/weirdcommentid`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404) //expecting HTTP status code
      .expect('{"msg":"Comment not found"}') // expecting content value
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
  it(`respond with json containing a single campground's comment`, function(done) {
    request(app)
      .get(`/api/campgrounds/5dd26c12de2aed61ac14db3c/comments/${comment._id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

/**
 * Testing update campgrounds endpoint
 */
describe('PUT /api/campgrounds/:id/comments/:comment_id', function() {
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
  let data = {
    text: `Updated Campground's Comment from UnitTests`
  };
  it('respond with 404 not found', function(done) {
    request(app)
      .put(
        `/api/campgrounds/5dd26c12de2aed61ac14db3c/comments/thisIdDoesNotExist`
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
      .put(`/api/campgrounds/5dd26c12de2aed61ac14db3c/comments/${comment._id}`)
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
      .put(`/api/campgrounds/5dd26c12de2aed61ac14db3c/comments/${comment._id}`)
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
describe('DELETE /api/campgrounds/:id/comments/:comment_id', function() {
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
        `/api/campgrounds/5dd26c12de2aed61ac14db3c/comments/notexistingid`
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
        `/api/campgrounds/5dd26c12de2aed61ac14db3c/comments/${comment._id}`
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
        `/api/campgrounds/5dd26c12de2aed61ac14db3c/comments/${comment._id}`
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
