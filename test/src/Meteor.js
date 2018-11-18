const { Meteor } = require('../../src/Meteor');
const { Collection } = require('../../src/Collection');

describe('Meteor', function() {
  describe('#isClient', function() {
    it('should always be true, this is a client side library', function() {
      Meteor.isClient.should.equal(true);
    });
  });
  describe('#Collection', function() {
    it('Should be a Collection', function() {
      Meteor.Collection.should.equal(Collection);
    });
  });
  describe('#absoluteUrl', function() {
    it('#Should give the correct absolute url', function() {
      ['', 'http://'].forEach(function(prefix) {
        Meteor.absoluteUrl({ rootUrl: prefix + 'asdf.com' }).should.equal('http://asdf.com/');
        Meteor.absoluteUrl(undefined, { rootUrl: prefix + 'asdf.com' }).should.equal('http://asdf.com/');
        Meteor.absoluteUrl(undefined, { rootUrl: prefix + 'asdf.com/' }).should.equal('http://asdf.com/');
        Meteor.absoluteUrl('foo', { rootUrl: prefix + 'asdf.com/' }).should.equal('http://asdf.com/foo');
        Meteor.absoluteUrl('/foo', { rootUrl: prefix + 'asdf.com' }).should.equal('http://asdf.com/foo');
        Meteor.absoluteUrl('#foo', { rootUrl: prefix + 'asdf.com' }).should.equal('http://asdf.com/#foo');
        Meteor.absoluteUrl('foo', { rootUrl: prefix + 'asdf.com', secure: true }).should.equal('https://asdf.com/foo');
        Meteor.absoluteUrl('foo', { rootUrl: 'https://asdf.com', secure: true }).should.equal('https://asdf.com/foo');
        Meteor.absoluteUrl('foo', { rootUrl: 'https://asdf.com', secure: false }).should.equal('https://asdf.com/foo');
        Meteor.absoluteUrl('foo', { rootUrl: prefix + 'localhost', secure: true }).should.equal('http://localhost/foo');
        Meteor.absoluteUrl('foo', {
          rootUrl: prefix + 'localhost:3000',
          secure: true,
        }).should.equal('http://localhost:3000/foo');
        Meteor.absoluteUrl('foo', {
          rootUrl: 'https://localhost:3000',
          secure: true,
        }).should.equal('https://localhost:3000/foo');
        Meteor.absoluteUrl('foo', {
          rootUrl: prefix + '127.0.0.1:3000',
          secure: true,
        }).should.equal('http://127.0.0.1:3000/foo');
      });
    });
    it('should replace localhost if requested', function() {
      ['', 'http://'].forEach(function(prefix) {
        Meteor.absoluteUrl('foo', {
          rootUrl: prefix + 'localhost:3000',
          replaceLocalhost: true,
        }).should.equal('http://127.0.0.1:3000/foo');
        Meteor.absoluteUrl('foo', {
          rootUrl: prefix + 'localhost',
          replaceLocalhost: true,
        }).should.equal('http://127.0.0.1/foo');
        Meteor.absoluteUrl('foo', {
          rootUrl: prefix + '127.0.0.1:3000',
          replaceLocalhost: true,
        }).should.equal('http://127.0.0.1:3000/foo');
        Meteor.absoluteUrl('foo', {
          rootUrl: prefix + '127.0.0.1',
          replaceLocalhost: true,
        }).should.equal('http://127.0.0.1/foo');
        // don't replace just any localhost
        Meteor.absoluteUrl('foo', {
          rootUrl: prefix + 'foo.com/localhost',
          replaceLocalhost: true,
        }).should.equal('http://foo.com/localhost/foo');
        Meteor.absoluteUrl('foo', {
          rootUrl: prefix + 'foo.localhost.com',
          replaceLocalhost: true,
        }).should.equal('http://foo.localhost.com/foo');
      });

    });
  });
  describe('#isCordova', function() {
    it('should be false', function() {
      Meteor.isCordova.should.equal(false)
    })
  })
});
