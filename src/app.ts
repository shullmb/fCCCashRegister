// Cash Register Solution for fCC JavaScript Data Structures and Algoritms Certificate
type Denomination = [string, number] 

type Status = 'INSUFFICIENT_FUNDS' | 'CLOSED' | 'OPEN'

interface Result {
  status: Status;
  change: Denomination[]
}

interface Register {
  "PENNY": number;
  "NICKEL": number;
  "DIME": number;
  "QUARTER": number;
  "ONE": number;
  "FIVE": number;
  "TEN": number;
  "TWENTY": number;
  "ONE HUNDRED": number;
}

const CURRENCY =   {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100,
}

/**
 * Design a cash register drawer accepts purchase price (price), payment (cash), and cash-in-drawer (cid)
 * @param {number} price cost of purchase
 * @param {number} cash amount received in payment
 * @param {Denomination[]} cid cash in drawer as 2d array [string, number]
 * @returns { Result{} } 
 */
export function checkCashRegister(price: number, cash: number, cid: Denomination[]): Result {
  const result = {status: '' as Status, change: [] as Denomination[]} as Result
  var changeDue = round(cash - price)
  const REGISTER = generateRegister(cid)
  if (totalCashInDrawer(REGISTER) < changeDue) {
    result.status = 'INSUFFICIENT_FUNDS'
  } else if (totalCashInDrawer(REGISTER) === changeDue) {
    [result.status,result.change] = ['CLOSED', cid]
  } else {
      let keys = Object.keys(REGISTER).reverse()
      for (let key of keys) {
        if (REGISTER[key] > 0) {
          console.log('REGISTER[key]:',key, REGISTER[key])
          var denom = CURRENCY[key]
          var changeTuple = [key, 0] as Denomination
          while(REGISTER[key] - denom >= 0 || changeDue - denom >= 0) {
            REGISTER[key] -= denom
            changeDue -= denom
            changeTuple[1] += denom
          }
          changeTuple[1] = round(changeTuple[1])
          result.change.push(changeTuple)
          console.log('LENGTH', result.change.length)
        }        
      }
      if (changeDue > 0) {
        result.status = 'INSUFFICIENT_FUNDS'
        result.change = [] as Denomination[]
      } else {
        result.status = 'OPEN'
      }
    }
    
  console.log({changeDue, result: result.change})
  return result
}

/* Helper Functions */

/**
 * rounds amount to nearest cent
 * @param {number} amount
 */ 
function round(amount: number): number {
  return Math.round(100 * amount) / 100
}

/**
 * generate more accessible Register object
 * @param {Denomination[]} cid
 */
function generateRegister(cid: Denomination[]): Register {
  const register = cid.reduce((p, c) => {
    p[c[0]] = round(c[1])
    return p
  }, {})
  return register as Register
}

/**
 * totals up cash in drawer
 */
function totalCashInDrawer(cashInDrawer: Register): number {
  let sum = 0;
  for (let denomination in cashInDrawer) {
    sum += cashInDrawer[denomination]
  }
  return round(sum)
}