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
		
		it("Should return INSUFFICIENT_FUNDS if exact change is not available", () => {
			let noExactChange = checkCashRegister(19.5,20,[["PENNY", 0.01],["ONE",1]])
			expect(noExactChange).to.have.property('status', expected.status)
		})
	})
	
	describe('CLOSED', () => {
		const REGISTER = [
			["PENNY", 0.50],
			["NICKEL", 0],
			["DIME", 0],
			["QUARTER", 0],
			["ONE", 0],
			["FIVE", 0],
			["TEN", 0],
			["TWENTY", 0],
			["ONE HUNDRED", 0]
		]
		const expected = {status: 'CLOSED', change: REGISTER}
		const result = checkCashRegister(19.5,20,REGISTER)
		
		it("Should return INSUFFICIENT_FUNDS when cash in drawer == changeDue", () => {
			expect(result.status).to.be.equal(expected.status)
		})
		
		it("Should return everything in the register when cash in drawer == changeDue", () => {
			expect(result.change).to.be.eql(expected.change)
		})

	})

})



