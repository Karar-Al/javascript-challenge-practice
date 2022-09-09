const account = {
  balance: 100,
  getBalance: function () {
    return this.balance
  },
  deposit: function (amount) {
    const num = Number(amount)
    if (this.accountError('deposit', num)) return
    this.balance += num
  },
  withdrawal: function (amount) {
    const num = Number(amount)
    if (this.accountError('withdraw', num)) return
    if ((this.balance - num) < 0) return 'Amount to withdraw exceeds your available balance.'
    this.balance -= num
  },
  getAccountName: function () {
    return this.accountName
  },
  exitAccount: function () {
    const yes = confirm('Are you sure?')
    if (yes) return null
  },
  accountError: function (action, value) {
    if (isNaN(value)) return true
    if (value < 0) {
      alert(`You cannot ${action} negative amounts.`)
      return true
    }
  },
  accountName: 'My Account Name',
}

function atm() {
  const message = prompt("Select a choice 1) See balance 2) Make a deposit 3) Make a withdrawal 4) Get account name 5) Exit".replace(/ ([0-9]\))/g, '\n$1'))
  // you need to answer the question why we are using parseFloat() method here
  // All prompts and most user input, including from input elements of all varying type attribute are string values.

  if (message === null) return // Close ATM early.

  const request = Number(message)

  if (isNaN(request)) return atm()

  // either use a if/else statement or a switch. Write a comment and motivate your choice
  // How bout neither, for fun.
  let value
  if (request === 2 || request === 3) value = Number(prompt(`How much would you like to ${request === 3 ? 'withdraw' : 'deposit'}?`))

  /* Very unreadable JavaScript. Don't do this. Ever. */
  // This code is reliant on account object always having the exact properties in the same places.
  // JavaScript isn't very keen on keeping this where they should be. This may get ugly in the future.
  const func = Object.values(account)[request]
  let response
  if (func) response = func.bind(account)(value)
  /* End-of-unreadable code */

  if (response != null) alert(response)

  // Null but not undefined, only exitAccount returns null.
  if (response !== null) atm()
}

atm()
