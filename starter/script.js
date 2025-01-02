'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Mutashiya Floribert Mutashiya',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: 'premium',
};

const account2 = {
  owner: 'Jonas Schmedtmann',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: 'premium',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: 'standard',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'basic',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
//
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

//Calculate account Balance
const calDisplayBalance = function (acc) {
  acc.balance__value = acc.movements.reduce(
    function (accumulator, currentValue) {
      return accumulator + currentValue;
    } /*the accumulator is set here it can be any value*/
  );
  labelBalance.textContent = `${acc.balance__value}€`;
};

//Add Data toMovement Container
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const moves = sort ? movements.slice().sort((a, b) => a - b) : movements;
  moves.forEach((mov, index) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const hmtl = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', hmtl);
  });
};

//Calculate the summary and display
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, val) => acc + val, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outGoing = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, val) => acc + val, 0);
  labelSumOut.textContent = `${Math.abs(outGoing)}€`;

  const interest = acc.movements
    .filter(desposit => desposit > 0)
    .map(desposit => (desposit * acc.interestRate) / 100) //calculate each deposit interest
    .filter(interests => interests >= 1) //the interst will will if only it's >= 1
    .reduce((acc, val) => acc + val, 0); //summing all the interests in one amount
  labelSumInterest.textContent = `${interest}€`;
};
//Create userName by getting Initials
const creatUserName = function (accs) {
  accs.forEach(eachAcc => {
    eachAcc.usrName = eachAcc.owner
      .toLowerCase()
      .split(' ')
      .map(usrName => usrName[0])
      .join('');
  });
};
creatUserName(accounts);

//Update UI function
const updateUI = function (account) {
  //Display Movement
  displayMovements(account.movements);
  //Display Balance
  calDisplayBalance(account);
  //Display Summary
  calcDisplaySummary(account);
};
//Event Handlers: get user name and pin
let currentAccount;
btnLogin.addEventListener('click', function (event) {
  event.preventDefault(); //prevent form from submitting

  currentAccount = accounts.find(
    user => user.usrName === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and Message
    labelWelcome.textContent = `Welcome Back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    //Clear input field user and pin
    (inputLoginUsername.value = ''), (inputLoginPin.value = '');
    inputLoginPin.blur();
    //Updating the UI calling the function
    updateUI(currentAccount);
  }
});
//console.log(currentAccount);
//Transfer money from user to a specific user
btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiveAcc = accounts.find(
    acc => acc.usrName === inputTransferTo.value
  ); //find the username to transfer to...
  if (
    amount > 0 &&
    receiveAcc &&
    currentAccount.balance__value >= amount &&
    receiveAcc?.usrName !== currentAccount.usrName
  ) {
    //Setting the transactions
    currentAccount.movements.push(-amount);
    receiveAcc.movements.push(amount);
    updateUI(currentAccount);
    //console.log(`${amount} Transfered Succefully`);
  }
  //clear input fields
  inputTransferTo.value = '';
  inputTransferAmount.value = '';
});
//Button Loan request
btnLoan.addEventListener('click', function (event) {
  event.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentAccount.movements.some(mov => mov > loanAmount * 0.1)
  ) {
    //check if the last deposit is greater than 10% of the loan if so grant the loan
    currentAccount.movements.push(loanAmount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

//Close an Account using splice(index) & findIndex()
btnClose.addEventListener('click', function (event) {
  event.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.usrName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.usrName === currentAccount.usrName
    );
    accounts.splice(index, 1); //Delete Account, 1 item from the array accounts
    containerApp.style.opacity = 0; //Hide account, or remove from the UI
    //console.log(currentAccount.usrName + ' Account Deleted');
  }
  inputCloseUsername.value = '';
  inputClosePin.value = '';
});
//sorting movements and State variable to monitor sorting btn
const sorted = false;
btnSort.addEventListener('click', function (event) {
  event.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
