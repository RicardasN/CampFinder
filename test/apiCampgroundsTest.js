const request = require('supertest');
const app = require('../app');

let campground;
//= =================== campgrounds API test ====================

/**
 * Testing get all campgrounds endpoint
 */
describe('GET /api/campgrounds', function() {
  this.timeout(10000);
  it('respond with json containing a list of all campgrounds', function(done) {
    request(app)
      .get('/api/campgrounds')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

/**
 * Testing post campgrounds endpoint
 */
describe('POST /api/campgrounds', function() {
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
    name: 'New Campground from UnitTests',
    image:
      'https://images.unsplash.com/photo-1562620891-080f718db384?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1655&q=80',
    description: 'This is a test description',
    price: '21.22',
    location: 'Kaunas, Lithuania'
  };
  it('respond with 401 unauthorized', function(done) {
    request(app)
      .post('/api/campgrounds')
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
      .post('/api/campgrounds')
      .set('x-auth-token', token)
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        campground = res.body;
        done();
      });
  });
});

/**
 * Testing get a campgrounds endpoint by giving an existing campground
 */
describe('GET /api/campgrounds/:id', function() {
  it('respond with json containing a single campground', function(done) {
    request(app)
      .get(`/api/campgrounds/${campground._id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  it('respond with json campground not found', function(done) {
    request(app)
      .get('/api/campgrounds/idisnonexisting')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404) // expecting HTTP status code
      .expect('{"message":"Cant find the campground"}') // expecting content value
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});

/**
 * Testing update campgrounds endpoint
 */
describe('PUT /api/campgrounds/:id', function() {
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
    name: 'Updated Campground from UnitTests',
    description: 'This is an updated test description',
    price: '21.22',
    location: 'Kaunas, Lithuania'
  };
  it('respond with 404 not found', function(done) {
    request(app)
      .put(`/api/campgrounds/thisIdDoesNotExist`)
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
      .put(`/api/campgrounds/${campground._id}`)
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
      .put(`/api/campgrounds/${campground._id}`)
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
describe('DELETE /api/campgrounds/:id', function() {
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
      .delete(`/api/campgrounds/thisIdDoesNotExist`)
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
      .delete(`/api/campgrounds/${campground._id}`)
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
      .delete(`/api/campgrounds/${campground._id}`)
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
