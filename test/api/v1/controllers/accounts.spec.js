const { expect } = require('chai')
const Helpers = require('../helpers')

const AddressActive = 'DRac35wghMcmUSe5jDMLBDLWkVVjyKZFxK'
const AddressCold = 'DCs3EeTAME7W61fx5YiJKe9nhWn61YpRMJ'

describe('GET api/accounts/?address', () => {
  it('should return account/wallet information', (done) => {
    Helpers.request(`accounts/?address=${AddressActive}`).end((err, res) => {
      Helpers.assertSuccessful(err, res)

      expect(res.body.account).to.have.all.keys(['address', 'publicKey', 'secondPublicKey', 'vote', 'username', 'balance', 'votebalance'])
      expect(res.body.account.vote).to.be.a('string')
      expect(res.body.account.balance).to.be.a('number')
      expect(res.body.account.votebalance).to.be.a('number')
      expect(res.body.account.address).to.be.a('string')
      expect(res.body.account.publicKey).to.be.a('string')

      done()
    })
  })

  it('should return error with Not Found', (done) => {
    Helpers.request(`accounts/?address=${AddressCold}`).end((err, res) => {
      Helpers.assertError(err, res)

      expect(res.body.error).to.be.a('string').contains('Not found')

      done()
    })
  })
})

describe('GET api/accounts/getBalance?address', () => {
  it('should return balance', (done) => {
    Helpers.request(`accounts/getBalance?address=${AddressActive}`).end((err, res) => {
      Helpers.assertSuccessful(err, res)

      expect(res.body.balance).to.be.a('number')
      expect(res.body.unconfirmedBalance).to.be.a('number')

      done()
    })
  })

  it('should return info not existing address', (done) => {
    Helpers.request(`accounts/getBalance?address=${AddressCold}`).end((err, res) => {
      Helpers.assertError(err, res)

      expect(res.body.error).to.be.a('string').contains('Not found')

      done()
    })
  })
})

describe('GET /api/accounts/getPublicKey?address', () => {
  it('should return public key for address', (done) => {
    Helpers.request(`accounts/getPublicKey?address=${AddressActive}`).end((err, res) => {
      Helpers.assertSuccessful(err, res)

      expect(res.body.publicKey).to.be.a('string')

      done()
    })
  })

  it('should return info not existing address', (done) => {
    Helpers.request(`accounts/getPublicKey?address=${AddressCold}`).end((err, res) => {
      Helpers.assertError(err, res)

      expect(res.body.error).to.be.a('string').contains('Not found')

      done()
    })
  })
})

describe('GET /api/accounts/delegates?address', () => {
  it('should return delegate info the address has voted for', (done) => {
    Helpers.request(`accounts/delegates?address=${AddressActive}`).end((err, res) => {
      Helpers.assertSuccessful(err, res)

      expect(res.body.delegates).to.be.an('array')
      expect(res.body.delegates[0].producedblocks).to.be.a('number')

      done()
    })
  })

  it('should return info that the address is not found', (done) => {
    Helpers.request(`accounts/delegates?address=${AddressCold}`).end((err, res) => {
      Helpers.assertError(err, res)

      expect(res.body.error).to.be.a('string').contains('Address not found.')

      done()
    })
  })
})