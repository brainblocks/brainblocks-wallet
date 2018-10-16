export default {
  accounts: {
    byId: {
      abcd: {
        id: 'abcd',
        balance: 55,
        name: 'Spending',
        color: 'purple',
        type: 'nano'
      },
      efg: {
        id: 'efg',
        balance: 12.3456,
        name: 'Trading',
        color: 'gold',
        type: 'nano'
      },
      hij: {
        id: 'hij',
        balance: 87.38291,
        type: 'vault',
        seed: 'abcd',
        name: 'Vault',
        color: 'gold',
        addresses: [
          'xrb_1brainb3zz81wmhxndsbrjb94hx3fhr1fyydmg6iresyk76f3k7y7jiazoji',
          'xrb_112345b3zz81wmhxndsbrjb94hx3fhr1fyydmg6iresyk76f3k7y7ji12345'
        ]
      }
    },
    allIds: ['abcd', 'efg', 'hij']
  },
  transactions: {
    byId: {
      abcd: {
        id: 'abcd',
        timestamp: Date.now() - 10000,
        amountNano: 2.1,
        valueUsd: 5.32,
        valueFiat: 5.32,
        type: 'send',
        toType: 'address',
        toAddress:
          'xrb_1brainb3zz81wmhxndsbrjb94hx3fhr1fyydmg6iresyk76f3k7y7jiazoji',
        note: '',
        accountId: 'abcd',
        status: 'pending',
        note: 'Electricity Bill'
      },
      efg: {
        id: 'efg',
        timestamp: 1539315703941,
        amountNano: 2.1,
        valueUsd: 5.32,
        valueFiat: 5.32,
        type: 'receive',
        fromType: 'address',
        fromAddress:
          'xrb_1brainb3zz81wmhxndsbrjb94hx3fhr1fyydmg6iresyk76f3k7y7jiazoji',
        note: '',
        accountId: 'efg',
        status: 'confirmed',
        note: ''
      },
      hij: {
        id: 'hij',
        timestamp: 1539315503941,
        amountNano: 12.21,
        valueUsd: 55.32,
        valueFiat: 55.32,
        type: 'receive',
        fromType: 'account',
        fromAccount: 'abcd',
        image:
          'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=44',
        note: '',
        accountId: 'hij',
        status: 'confirmed',
        note: 'Thanks for the beers'
      },
      klm: {
        id: 'klm',
        timestamp: 1539314503941,
        amountNano: 2.1,
        valueUsd: 5.32,
        valueFiat: 5.32,
        type: 'send',
        toType: 'contact',
        image:
          'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=44',
        toContact: 'abcd',
        note: '',
        accountId: 'abcd',
        status: 'pending',
        note: 'Electricity Bill'
      },
      nop: {
        id: 'nop',
        timestamp: 1538104703941,
        amountNano: 32.1234,
        valueUsd: 5.32,
        valueFiat: 5.32,
        type: 'transfer',
        fromAccount: 'abcd',
        toAccount: 'efg',
        note: '',
        accountId: 'abcd',
        status: 'confirmed',
        note: ''
      }
    },
    allIds: ['abcd', 'efg', 'hij', 'klm', 'nop']
  },
  nanoAddresses: {
    byId: {
      xrb_1brainb3zz81wmhxndsbrjb94hx3fhr1fyydmg6iresyk76f3k7y7jiazoji: {
        address:
          'xrb_1brainb3zz81wmhxndsbrjb94hx3fhr1fyydmg6iresyk76f3k7y7jiazoji',
        balance: 3.789,
        representative:
          'xrb_1brainb3zz81wmhxndsbrjb94hx3fhr1fyydmg6iresyk76f3k7y7jiazoji',
        name: 'HODL'
      },
      xrb_112345b3zz81wmhxndsbrjb94hx3fhr1fyydmg6iresyk76f3k7y7ji12345: {
        address:
          'xrb_112345b3zz81wmhxndsbrjb94hx3fhr1fyydmg6iresyk76f3k7y7ji12345',
        balance: 125.79,
        representative:
          'xrb_1brainb3zz81wmhxndsbrjb94hx3fhr1fyydmg6iresyk76f3k7y7jiazoji',
        name: 'Holiday Savings'
      }
    },
    allIds: [
      'xrb_1brainb3zz81wmhxndsbrjb94hx3fhr1fyydmg6iresyk76f3k7y7jiazoji',
      'xrb_112345b3zz81wmhxndsbrjb94hx3fhr1fyydmg6iresyk76f3k7y7ji12345'
    ]
  }
}
