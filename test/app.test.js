const {checkCashRegister} = require('../build/app')
const expect = require('chai').expect

describe('checkCashRegister', () => {
	describe('INSUFFICIENT FUNDS', () => {
		const REGISTER = [
			["PENNY", 1.01],
			["NICKEL", 2.05],
			["DIME", 3.1],
			["QUARTER", 4.25],
			["ONE", 90],
			["FIVE", 55],
			["TEN", 20],
			["TWENTY", 60],
			["ONE HUNDRED", 100]
		]
		const expected = { status: 'INSUFFICIENT_FUNDS', change: [] }
		const result = checkCashRegister(1,400,REGISTER)
		it("Should return INSUFFICIENT_FUNDS when cash in drawer < changeDue", () => {
			expect(result.status).to.be.equal(expected.status)
		})
	
		it("Should return an empty array when cash in drawer < changeDue", () => {
			expect(result.change.length).to.be.equal(expected.change.length)
		})
	})

})



