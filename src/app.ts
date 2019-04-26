enum Currency  {
  "PENNY"= 0.01,
  "NICKEL"= 0.05,
  "DIME"= 0.1,
  "QUARTER"= 0.25,
  "ONE"= 1,
  "FIVE"= 5,
  "TEN"= 10,
  "TWENTY"= 20,
  "ONE HUNDRED"= 100,
}

type Denomination = [string, number] 
type Status = 'INSUFFICIENT_FUNDS' | 'CLOSED' | 'OPEN'
interface Result {
  status: Status;
  change: Denomination[]
}

function checkCashRegister(price: number, cash: number, cid: Denomination[]): Result {
  let result: Result = {status: '' as Status, change: [] as Denomination[]}

  return result
}