const Meteor = require('../../src/Meteor')

describe('Meteor', function() {
  describe('#isClient', function() {
    it('should always be true, this is a client side library', function() {
      Meteor.isClient.should.equal(true)
    })
  })
})