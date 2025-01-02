"use strict";
/*                Slice()
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2)); // will return array element from index 2 to the last index so: c,d,e
console.log(arr.slice(2, 4)); //c and d
console.log(arr.slice(-2)); // last two index: d,e
console.log(arr.slice(-1)); // last index: e
console.log(arr.slice(1, -2)); // first index and last index: b and c
console.log(arr.slice());
*/
/*    Splice() this methode changes the array from it initial state
let arr = ['a', 'b', 'c', 'd', 'e'];
arr.splice(-1); //this will delete the last array index: e
console.log(arr);
arr.splice(1, 2); //from index 1 delete two element so: b and c are deleted
console.log(arr);
 */
/* Reverse() it mutes the original array and put array elements in reversed order
let arr = ['a', 'b', 'c', 'd', 'e'];
let arr2 = ['y', 'i', 'u', 'x', 'z'];
console.log(arr.reverse());
//Concat()
const letters = arr.concat(arr2);
console.log(letters);
//Join()
*/

/*at(index)
let arr = ['23', '45', '7', '13', '32'];

console.log(arr.at(2)); //return element at index 3
//Get Last element or index
console.log(arr.at(arr.length - 1)); //return last array element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(- 1));
 */

/*
forEach() 

for (const amount of movements) {
  if (amount > 0) {
    console.log(`You Deposited ${amount} in your account!`);
  } else {
    console.log(`You Withdrew ${Math.abs(amount)} from your account!`);
  }
}

/Using forEach()
movements.forEach(function (amount, index, arrOfElement) {
  if (amount > 0) {
    console.log(`You Deposited ${amount} in your account!`);
  } else {
    console.log(`You Withdrew ${Math.abs(amount)} from your account!`);
  }
});
*/
/*MAp
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
//Set
const uniqCurrencies = new Set([
  "USD",
  "RAND",
  "NAIRA",
  "GBP",
  "EUR",
  "USD",
  "RAND",
  "GBP",
]);
console.log(uniqCurrencies);
uniqCurrencies.forEach(function (value, _, set) {
  console.log(`${value}: ${value}`);
});
*/

/* Array Methods map() filter() reduce() 
map()
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const euroToUsdRate = 1.1;
const euroToUsd = movements.map(
  (euro) => `$${(euro * euroToUsdRate).toFixed(2)}`
);
console.log(euroToUsd);
console.log(movements);

const user = "Mutashiya Floribert Mutashiya";
const userInitial = user
  .toLowerCase()
  .split(" ")
  .map((usrName) => usrName[0])
  .join("");
console.log(userInitial);
//filter()

const deposit = movements.filter(function (mov) {
  return mov > 0;
});
console.log(deposit);
const deposit = movements.filter(function (mov) {
  return mov > 0;
});
const withdrawals = movements.filter(function (mov) {
  return mov < 0;
});
console.log(deposit);

If initialValue is provided, accumulator is set to initialValue.
If initialValue is not provided, accumulator is set to the first element of the array.

Reduce() the accumulator is not provided so the first array element is set as the accumulator

const balance__value = movements.reduce(
  function (accumulator, currentValue) {
    return accumulator + currentValue;
  } /the accumulator is set here it can be any value
);
console.log(balance__value);
*/
/*
The find method is used to search an array and return the first element that satisfies a given condition (predicate). If no element satisfies the condition, it returns

const numbers = [5, 12, 8, 130, 44];
const found = numbers.find((num) => num > 10);
console.log(found); // Output: 12
const acc = accounts.find((user) => user.owner.usrName === "Sarah Smith");
console.log(acc);
*/

/* findIndex()  findLast()  findLastIndex()

//findIndex
const numbers = [10, 15, 20, 25];
const index = numbers.findIndex(num => num > 15);
console.log(index); // Output: 2 (index of 20)

//
const users = [
  { id: 1, name: 'Alice', active: false },
  { id: 2, name: 'Bob', active: true },
  { id: 3, name: 'Charlie', active: true },
];

// Find the index of the first active user
const firstActiveIndex = users.findIndex(user => user.active);
console.log(firstActiveIndex); // Output: 1 (Bob)

// Find the last active user
const lastActiveUser = users.findLast(user => user.active);
console.log(lastActiveUser); // Output: { id: 3, name: 'Charlie', active: true }

// Find the index of the last active user
const lastActiveIndex = users.findLastIndex(user => user.active);
console.log(lastActiveIndex); // Output: 2 (Charlie)

//findLastIndex

//findLastIndex
const numbers = [10, 15, 20, 25];
const lastIndex = numbers.findLastIndex(num => num > 15);
console.log(lastIndex); // Output: 3 (index of 25)

console.log(movements);
const firsttWithdrawal = movements.findIndex(lstIndx => lstIndx < 0);
console.log('First Withdrawal: ' + firsttWithdrawal);
const lastWithdrawal = movements.findLastIndex(lstIndx => lstIndx < 0);
console.log('Last Withdrawal: ' + lastWithdrawal);
const lastValueWithdrawal = movements.findLast(lstIndx => lstIndx < 0);
console.log('the Value of the Last Withdrawal: ' + lastValueWithdrawal);
*/

/*
some() every() include()
console.log(movements);
//Equality
console.log(movements.includes(-130));
//Condition
console.log(movements.some((mov) => mov === -130)); //it returns true if it exist else false
console.log(movements.some((mov) => mov > 1500));
//Every
console.log(account4.movements.every((mov) => mov > 0)); //this returns true cause evry element in this array are deposits

*/
/* Flat() FlatMap()
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); // it rtuens: [1,2,3,4,5,6,7,8]

const arrDeep = [[1, [2, 3]], [[4, 5], 6], 7, 8];
console.log(arrDeep.flat()); // output: [1,[array(2)],[array(2)],7,8] it can't go deep
//Calculate all the bank user balance in one movements

const overAllBalance = accounts
  .map((acc) => acc.movements) // creating a new array with all the movements
  .flat() //puting all arrays movement into one array
  .reduce((acc, mov) => acc + mov); //calculation the overall Balance

  //using Flat()
const overAllBalance = accounts
  .map(acc => acc.movements) // creating a new array with all the movements
  .flat() //puting all arrays movement into one array
  .reduce((acc, mov) => acc + mov); //calculation the overall Balance
console.log(overAllBalance);

//usinf FlatMap()
const overOlBalance = accounts
  .flatMap(acc => acc.movements) // creating a new array with all the movements puting all arrays movement into one array with flatMap()
  .reduce((acc, mov) => acc + mov); //calculation the overall Balance
console.log(overOlBalance);
 */

/* Sorting Array
const numbers = [200, -100, 450, 0, -650, 3000, 70, 1300];
slice(): Creates a shallow copy of the array to avoid modifying the original array.

// Ascending order (smallest to largest)
const ascending = numbers.slice().sort((a, b) => a - b);
console.log("Ascending:", ascending); // Output: [-650, -100, 0, 70, 200, 450, 1300, 3000]

// Descending order (largest to smallest)
const descending = numbers.slice().sort((a, b) => b - a);
console.log("Descending:", descending); // Output: [3000, 1300, 450, 200, 70, 0, -100, -650]

//********************** Array Grouping ************************

const groupMovements = Object.groupBy(movements, movement =>
  movement > 0 ? 'Deposit' : 'Withdrawals'
);
console.log(groupMovements);
//Categorising Accounts based movements

const accountByActivities = Object.groupBy(accounts, account => {
  const movementCount = account.movements.length;
  if (movementCount >= 8) return 'Very active';
  if (movementCount >= 4) return 'active';
  if (movementCount >= 1) return 'moderate';
  return 'inactive';
});
console.log(accountByActivities);
//Group account by types
// const groupAccounts = Object.groupBy(accounts, account => account.type);
// console.log(groupAccounts);
const groupAccounts = Object.groupBy(accounts, ({ type }) => type);
console.log(groupAccounts);

*************************************************
// Ascending order
const ascending = numbers.toSorted((a, b) => a - b);
console.log("Original:", numbers); // Original: [200, -100, 450, 0, -650, 3000]
console.log("Ascending:", ascending); // Ascending: [-650, -100, 0, 200, 450, 3000]

// Descending order
const descending = numbers.toSorted((a, b) => b - a);
console.log("Descending:", descending); // Descending: [3000, 450, 200, 0, -100, -650]

const reversed = numbers.toReversed();
console.log("Original:", numbers); // Original: [200, -100, 450, 0, -650, 3000]
console.log("Reversed:", reversed); // Reversed: [3000, -650, 0, 450, -100, 200]

// Replace the element at index 2 with 999
const updated = numbers.with(2, 999);
console.log("Original:", numbers); // Original: [200, -100, 450, 0, -650, 3000]
console.log("Updated:", updated); // Updated: [200, -100, 999, 0, -650, 3000]

*/
