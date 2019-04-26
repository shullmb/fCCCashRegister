const {checkCashRegister} = require('../build/app')
const expect = require('chai').expect

describe('checkCashRegister', () => {
	describe('CASE: INSUFFICIENT FUNDS', () => {
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
			expect(result.change.length).to.be.equal(0)
		})
		
		it("Should return INSUFFICIENT_FUNDS if exact change is not available", () => {
			let noExactChange = checkCashRegister(19.5,20,[["PENNY", 0.01],["ONE",1]])
			expect(noExactChange).to.have.property('status', expected.status)
		})

		it("Should return an empty array if exact change is not available", () => {
			let noExactChange = checkCashRegister(19.5,20,[["PENNY", 0.01],["ONE",1]])
			expect(noExactChange.change.length).to.be.equal(0)
		})
	})
	
	describe('CASE: CLOSED', () => {
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

	describe('CASE: OPEN', () => {
		it("Should return OPEN when cash in drawer can accomodate change", () => {
			let result = checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
			expect(result).to.have.property('status','OPEN')
		})
		it("Should return correct change when cash in drawer can accomodate change", () => {
			let result = checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
			expect(result.change).to.eql([["QUARTER",0.5]])
		})
		it("Should return correct change when cash in drawer can accomodate change", () => {
			let result = checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
			expect(result.change).to.eql([["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]])
		})
	})
})



