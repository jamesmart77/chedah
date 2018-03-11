import axios from "axios";
import {
  decodeToken,
  getIdToken,
  getAccessToken
} from './AuthService';

// axios.defaults.headers.common['Authorization'] = `Bearer ${getAccessToken()}`;
// axios.defaults.headers.post['Authorization'] = `Bearer ${getAccessToken()}`;

export default {

  // #############################################
  // USERS
  // #############################################

  // if there is a token, get current user
  getUser: (data) => getIdToken() ? axios.get(`/api/users/${decodeToken(getIdToken()).sub}`) : Promise.reject({err: "There is no user son"}),

  createUserIfDoesNotExist: () => {
      const user = decodeToken(getIdToken());

      // const access = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJrSkZSa1EwUmpZMk4wVTVPREpHTVRCRE4wWkJNRFk1UVRRMU1EUXhNa0k1UWpFNE16aEdRUSJ9.eyJpc3MiOiJodHRwczovL2NoZWRhaC5hdXRoMC5jb20vIiwic3ViIjoiZmFjZWJvb2t8MTAxNTYxMzEzNzkzNjMwODgiLCJhdWQiOlsiaHR0cHM6Ly9jaGVkYWguaGVyb2t1YXBwLmNvbSIsImh0dHBzOi8vY2hlZGFoLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE1MjA4MDE2MjcsImV4cCI6MTUyMDgwODgyNywiYXpwIjoiazRRZm81cFpVVDhieEJhMFY0dlJtUm9hRDI2WTEyNEciLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.i4PElViVU4xdSAYZz07EWPXFdjMZBVGRiE61XfsjlkWef-y8oiNaHzlGTsSSS8M1J1DxbDWljSs4cv4-yhYs5Jr4SIls98SlrULbGn9ywKPgPdkpr06ulylj9z2ggZ_34HHZToMGn_U1siBvzaFrv6h6ZMG9xMmaXo-IYjB_b4HbPtq6abp-KbyG0nSoJjRo5xhnx6_cm-gABcH5qgv8oRTCcBnDknApFTR300PxpnM0Jfxs7XXk5oBTnWR21uHC57y3vCjNOR37DluJX4FXIBNppUrP_UewmWVwFeIw0GfrtrkzVFi3vO9JYXUQgFy1zrlmplqBAQCLWWtG7sKTVg'
      return axios.post("/api/users", user, { headers: { Authorization: `Bearer ${getAccessToken()}` }})
      
  },

  // #############################################
  // Gigs
  // #############################################

  // add a goal to the current gig
  createGig: data => axios.post(`/api/users/${decodeToken(getIdToken()).sub}/gigs`, {name: data}, { headers: { Authorization: `Bearer ${getAccessToken()}`}}),
  
  // add a gig to an account 
  // This Creates a new gig & attaches it's gig id to the account as 'defaultGigId'
  // data.name
  // data.accountId
  addGigToAccount: data => axios.post(`/api/gigs/account`, data, { headers: { Authorization: `Bearer ${getAccessToken()}`}}),


  // add a goal to the current gig
  addGig: data => {
    data.userId = decodeToken(getIdToken()).sub
    return axios.post(`/api/gigs`, data, { headers: { Authorization: `Bearer ${getAccessToken()}`}})
  },

  // add a goal to the current gig
  // data.gigId
  // data.name // this is the goal name
  // data.description
  // data.budget
  // data.categories []  // array of ids
  addGoalToGig: data => axios.post(`/api/goals`, data, { headers: { Authorization: `Bearer ${getAccessToken()}`}}),
  
  // #############################################
  // Accounts
  // #############################################
  
  getAccounts: () => axios.post('/api/accounts/', {userId: decodeToken(getIdToken()).sub}, { headers: { Authorization: `Bearer ${getAccessToken()}`}}),

  // data.accountId needs to be passed in
  getAccount: data => {

    data.userId = decodeToken(getIdToken()).sub
    console.log(`user id: `, data.userId);
    console.log(`account data: `, data);
    return axios.post(`/api/accounts/${data.accountId}`, data, { headers: { Authorization: `Bearer ${getAccessToken()}`}})
  },

  // data.accountId
  // data.defaultGigId
  updateDefaultGigOnAccount: data => {
    return axios.put(`/api/accounts/${data.accountId}`, data, { headers: { Authorization: `Bearer ${getAccessToken()}`}})
  },

  // data.accountId
  udpateAccount: data => {
    data.userId = decodeToken(getIdToken()).sub
    return axios.put(`/api/accounts/${data.accountId}`, data, { headers: { Authorization: `Bearer ${getAccessToken()}`}})
  },

  // data.accountId
  deleteAccount: data => {
    data.userId = decodeToken(getIdToken()).sub
    return axios.delete(`/api/accounts/${data.accountId}`, data, { headers: { Authorization: `Bearer ${getAccessToken()}`}})
  },

  getAccessToken: plaidObj => {
    const data = {};
    data.user = decodeToken(getIdToken());
    data.plaidObj = plaidObj;
    return axios.post('/api/users/items', data, { headers: { Authorization: `Bearer ${getAccessToken()}`}});
  },

  accountsSync: () => {
    console.log("Accounts syncing");
    const user = decodeToken(getIdToken());
    console.log("USER");
    console.log(user)
    axios.post('/api/users/transactions', user, { headers: { Authorization: `Bearer ${getAccessToken()}`}})
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  },

  gigData: (gigDetails) => {
    const user = decodeToken(getIdToken());
    //attach decoded user info
    gigDetails.user = user;

    axios.post('/api/gigs/' + gigDetails.gigId, gigDetails, { headers: { Authorization: `Bearer ${getAccessToken()}`}})
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  },

  //transactions
  getTransactionsByAccount: account => {
    return new Promise((resolve, reject) => {
      const data = [{
          id: 1,
          date: "11/23/14",
          vendor: "Google",
          category: "Advertising",
          gig: "Uber",
          ammount: 200.00
        },
        {
          id: 2,
          date: "11/23/14",
          vendor: "Staples",
          category: "Office Supplies",
          gig: "Uber",
          ammount: 15.00
        },
        {
          id: 3,
          date: "11/23/14",
          vendor: "Staples",
          category: "Office Supplies",
          gig: "Dev",
          ammount: 12.00
        },
        {
          id: 4,
          date: "11/23/14",
          vendor: "Staples",
          category: "Office Supplies",
          gig: "Uber",
          ammount: 16.00
        },
        {
          id: 5,
          date: "11/23/14",
          vendor: "Staples",
          category: "Office Supplies",
          gig: "Dev",
          ammount: 119.00
        },
        {
          id: 6,
          date: "11/23/14",
          vendor: "Staples",
          category: "Office Supplies",
          gig: "Dev",
          ammount: 219.00
        },
        {
          id: 7,
          date: "11/23/14",
          vendor: "Staples",
          category: "Promotion",
          gig: "Uber",
          ammount: 29.00
        }
      ];
      resolve(data);
    });
  },

///////////////// GIG DETAIL VIEW

loadGig: gigId => {
  console.log(gigId);
  const user = decodeToken(getIdToken());
  console.log(user);
  return Promise.resolve({
      gigName: "Landlording",
      gigId: '5a9efba71804d4cff93e9dd6',
      gigSummary: {
        moneyIn: 7200.25,
        expenses: 1875.11,
        net: 4575.22
      },
      expenseSummary: [
        {
          vendorName: "Shell",
		  category: "Gas",
          sum: 300.25
        },
        {
          vendorName: "Jiffy Lube",
		  category: "Repair",
          sum: 200.25
        },
        {
          vendorName: "Black Dog Car Wash",
		  category: "Maintainance",
          sum: 100.55
        }
      ],
      transactions: [
        {
          id: 1,
          date: "11/23/14",
          vendor: "Google",
          category: "Advertising",
          gig: "Uber",
          amount: 200.00
        },
        {
          id: 2,
          date: "11/23/14",
          vendor: "Staples",
          category: "Office Supplies",
          gig: "Uber",
          amount: 15.00
        },
        {
          id: 3,
          date: "11/23/14",
          vendor: "Staples",
          category: "Office Supplies",
          gig: "Dev",
          amount: 12.00
        },
        {
          id: 4,
          date: "11/23/14",
          vendor: "Staples",
          category: "Office Supplies",
          gig: "Uber",
          amount: 16.00
        },
        {
          id: 5,
          date: "11/23/14",
          vendor: "Staples",
          category: "Office Supplies",
          gig: "Dev",
          amount: 119.00
        },
        {
          id: 6,
          date: "11/23/14",
          vendor: "Staples",
          category: "Office Supplies",
          gig: "Dev",
          amount: 219.00
        },
        {
          id: 7,
          date: "11/23/14",
          vendor: "Staples",
          category: "Promotion",
          gig: "Uber",
          amount: 29.00
        }
      ],
      goals:  [
        { id: 1, name:"Spend Less On Tolls", budget: 200.00, spent: 100.00, net: 100.00, categories: ['tolls'] }, // id is goal id
        { id: 2, name:"Spend Less on Gas", budget: 425.00, spent: 300.00, net: 125.00, categories: ['gas', 'travel']}
    ],
    categories: [{
      id: '23748927489237',
      name: 'Travel'
    },
    {
      id: '23748927439237',
      name: 'Tolls'
    },{
      id: '23748927289237',
      name: 'Gas'
    }
  ]
  })
  // return axios.post('/api/gigs/:id', user);
},


editGoal: plaidObj => {
  // const data = {};
  // data.user = decodeToken(getIdToken());
  // data.plaidObj = plaidObj;
  // return axios.post('/api/users/items', data);
},

editTransaction: plaidObj => {
  // const data = {};
  // data.user = decodeToken(getIdToken());
  // data.plaidObj = plaidObj;
  // return axios.post('/api/users/items', data);
},

///////////////// END GIG DETAIL VIEW


///////////////// DASHBOARD/ACCOUNT DETAIL

// get the account data associated with the user
loadUserAccounts: userId => {
  return Promise.resolve(
      defaultAccounts
  )
},

getAccountDetails: accountId => {
    let matchedAccount = getAccountWithID(accountId);
    let gigData = getGigWithId(matchedAccount.gigId);
    matchedAccount.gig = gigData;
    delete matchedAccount.gigId;
    return Promise.resolve(matchedAccount);
},

// load user & associated accounts, goals, gigs & categories
loadUserData: userId => {
  const user = decodeToken(getIdToken());
  return Promise.resolve({
    user: user,
    accounts: defaultAccounts,
    gigs: defaultGigs,
    goals: defaultGoals,
    categories: ['Office Supplies', 'Advertising', 'Repair', 'Gas']
  })
},


// return user categories
loadUserCategories: userId => {
    return Promise.resolve(
        defaultCategories
    )
},


// return transactions associated with the given account id
//  - ( currently returns test data )
loadAccountTransactions: accountId => {
    return Promise.resolve(
        defaultTransactions
    )
},

// return gig data from a gigId
getGigData: gigId => {
    const gigData = getGigWithId(gigId)
    return Promise.resolve(
        gigData
    )
},



};


///////////////// TEST DATA

const defaultAccounts = [
  {
    "_id": "5a9b16b841480c455fec8d0a",
    "userId": null,
    "name": "Checking",
    "accountNum": "4117*****",
    "accountType": "checking",
    "limit": null,
    "balance": 14120.21,
    "apr": null,
    "fees": null,
    "dueDate": null,
    "gigId": "5a91b813513541155c819fa4"
  }, {
    "_id": "5a9b15a041480c455fec8c6b",
    "userId": null,
    "name": "Chase MasterCard",
    "accountNum": "624831******001",
    "accountType": "credit",
    "limit": 60000,
    "balance": 1325.81,
    "apr": 4,
    "fees": 84.24,
    "dueDate": 27,
    "gigId": "5a91b813513541155c819fa4"
  }, {
    "_id": "5a9b2497169fc87df959e4cb",
    "userId": null,
    "name": "Citi Visa",
    "accountNum": "224831*****007",
    "accountType": "credit",
    "limit": 20000,
    "balance": 271.02,
    "apr": 5,
    "fees": null,
    "dueDate": 14,
    "gigId": "5a91b813513541155c819fa5"
  }
]

const defaultGigs = [{
        "_id": "5a91b813513541155c819fa4",
        "name": "Uber",
        "userID": null,
        "description": "driving people around and shit",
        "accountID": null
    },
    {
        "_id": "5a91b813513541155c819fa5",
        "name": "Programming",
        "userID": null,
        "description": "app development",
        "accountID": null
    }, {
        "_id": "5a91dd105c357a324b3e9725",
        "name": "Horse Husbandry",
        "userID": null,
        "description": "Bring a mop",
        "accountID": null
    }
]

const defaultGoals = [{
  "_id": "5a9844d0be62dd795a0b8102",
  "gigId": "5a91b813513541155c819fa4",
  "name": "Spend Less on Tolls",
  "userID": null,
  "budget": 200,
  "spent": 100,
  "net": 100
}, {
  "_id": "5a9844d0be62dd795a0b8103",
  "gigId": "5a91b813513541155c819fa4",
  "name": "Spend Less on Gas",
  "userID": null,
  "budget": 425,
  "spent": 300,
  "net": 125
},{
  "_id": "5a9b24c9156b517e24d745a3",
  "gigId": "5a91b813513541155c819fa4",
  "name": "Buy programminig training",
  "userID": null,
  "budget": 600,
  "spent": 400,
  "net": 0
}]


const defaultTransactions = [
  {
    "_id": "5a9b184688171a76ec802bdf",
    "date": "2018-02-28T13:21-0500",
    "vendor": "Starbucks",
    "category": "Food",
    "gigId": "5a91b813513541155c819fa4",
    "amount": "-4.21"
  },
  {
    "_id": "5a9b184688171a76ec802be0",
    "date": "2018-02-27T16:02-0500",
    "vendor": "Mobil",
    "category": "Gas",
    "gigId": "5a91b813513541155c819fa4",
    "amount": "-37.81"
  },
  {
    "_id": "5a9b184688171a76ec802be1",
    "date": "2018-02-27T15:02-0500",
    "vendor": "Amazon",
    "category": "Books",
    "gigId": "5a91b813513541155c819fa5",
    "amount": "-71.47"
  },
  {
    "_id": "5a9b184688171a76ec802be2",
    "date": "2018-02-27T11:18-0500",
    "vendor": "Autozone",
    "category": "Parts",
    "gigId": "5a91b813513541155c819fa4",
    "amount": "-411.47"
  },
  {
    "_id": "5a9b184688171a76ec802be3",
    "date": "2018-02-27T09:02-0500",
    "vendor": "Moxi",
    "category": "Food & Drink",
    "gigId": "5a91b813513541155c819fa4",
    "amount": "-148.71"
  },
  {
    "_id": "5a9b184688171a76ec802be4",
    "date": "2018-02-26T17:21-0500",
    "vendor": "Starbucks",
    "category": "Food",
    "gigId": "5a91b813513541155c819fa5",
    "amount": "-4.98"
  },
  {
    "_id": "5a9b184688171a76ec802be5",
    "date": "2018-02-26T16:04-0500",
    "vendor": "Exxon",
    "category": "Gas",
    "gigId": "5a91b813513541155c819fa4",
    "amount": "-41.13"
  },
  {
    "_id": "5a9b184688171a76ec802be6",
    "date": "2018-02-26T11:02-0500",
    "vendor": "Barnes & Noble",
    "category": "Books",
    "gigId": "5a91b813513541155c819fa5",
    "amount": "-93.73"
  },
  {
    "_id": "5a9b184688171a76ec802be7",
    "date": "2018-02-26T10:18-0500",
    "vendor": "Autozone",
    "category": "Parts",
    "gigId": "5a91b813513541155c819fa4",
    "amount": "-258.45"
  },
  {
    "_id": "5a9b184688171a76ec802be8",
    "date": "2018-02-26T09:02-0500",
    "vendor": "Portsmouth Gaslight",
    "category": "Food & Drink",
    "gigId": "5a91b813513541155c819fa5",
    "amount": "-218.68"
  },
  {
    "_id": "5a9b184688171a76ec802be9",
    "date": "2018-02-25T14:31-0500",
    "vendor": "Starbucks",
    "category": "Food",
    "gigId": "5a91b813513541155c819fa4",
    "amount": "-4.21"
  },
  {
    "_id": "5a9b184688171a76ec802bea",
    "date": "2018-02-25T11:34-0500",
    "vendor": "Mobil",
    "category": "Gas",
    "gigId": "5a91b813513541155c819fa4",
    "amount": "-37.81"
  },
  {
    "_id": "5a9b184688171a76ec802beb",
    "date": "2018-02-25T10:57-0500",
    "vendor": "Amazon",
    "category": "Books",
    "gigId": "5a91b813513541155c819fa5",
    "amount": "-71.47"
  },
  {
    "_id": "5a9b184688171a76ec802bec",
    "date": "2018-02-25T09:11-0500",
    "vendor": "Autozone",
    "category": "Parts",
    "gigId": "5a91b813513541155c819fa4",
    "amount": "-411.47"
  },
  {
    "_id": "5a9b184688171a76ec802bed",
    "date": "2018-02-25T07:00-0500",
    "vendor": "Payroll",
    "category": "Income",
    "gigId": "5a91b813513541155c819fa5",
    "amount": "4600.00"
  },
  {
    "_id": "5a9b184688171a76ec802bee",
    "date": "2018-02-24T09:02-0500",
    "vendor": "Jumpin\" Jays",
    "category": "Food & Drink",
    "gigId": "5a91b813513541155c819fa4",
    "amount": "-148.71"
  },
  {
    "_id": "5a9b184688171a76ec802bef",
    "date": "2018-02-24T17:21-0500",
    "vendor": "Dunkin Donuts",
    "category": "Food",
    "gigId": "5a91b813513541155c819fa5",
    "amount": "-12.97"
  },
  {
    "_id": "5a9b184688171a76ec802bf0",
    "date": "2018-02-24T16:04-0500",
    "vendor": "Shell",
    "category": "Gas",
    "gigId": "5a91b813513541155c819fa4",
    "amount": "-40.02"
  },
  {
    "_id": "5a9b184688171a76ec802bf1",
    "date": "2018-02-24T11:02-0500",
    "vendor": "Apple Developer Connection",
    "category": "Research",
    "gigId": "5a91b813513541155c819fa5",
    "amount": "-99.00"
  },
  {
    "_id": "5a9b184688171a76ec802bf2",
    "date": "2018-02-24T10:18-0500",
    "vendor": "Two Guys Auto",
    "category": "Parts",
    "gigId": "5a91b813513541155c819fa4",
    "amount": "-278.54"
  },
  {
    "_id": "5a9b184688171a76ec802bf3",
    "date": "2018-02-24T09:02-0500",
    "vendor": "Massimo",
    "category": "Food & Drink",
    "gigId": "5a91b813513541155c819fa5",
    "amount": "-356.81"
  },
  {
    "_id": "5a9b184688171a76ec802bf4",
    "date": "2018-01-27T09:02-0500",
    "vendor": "Jumpin\" Jays",
    "category": "Food & Drink",
    "gigId": "5a91b813513541155c819fa4",
    "amount": "-148.71"
  },
  {
    "_id": "5a9b184688171a76ec802bf5",
    "date": "2018-01-26T17:21-0500",
    "vendor": "Dunkin Donuts",
    "category": "Food",
    "gigId": "5a91b813513541155c819fa5",
    "amount": "-12.97"
  },
  {
    "_id": "5a9b184688171a76ec802bf6",
    "date": "2018-01-26T16:04-0500",
    "vendor": "Shell",
    "category": "Gas",
    "gigId": "5a91b813513541155c819fa4",
    "amount": "-40.02"
  },
  {
    "_id": "5a9b184688171a76ec802bf7",
    "date": "2018-01-26T11:02-0500",
    "vendor": "Apple Developer Connection",
    "category": "Research",
    "gigId": "5a91b813513541155c819fa5",
    "amount": "-99.00"
  },
  {
    "_id": "5a9b184688171a76ec802bf8",
    "date": "2018-01-25T10:18-0500",
    "vendor": "Two Guys Auto",
    "category": "Parts",
    "gigId": "5a91b813513541155c819fa4",
    "amount": "-198.45"
  },
  {
    "_id": "5a9b184688171a76ec802bf9",
    "date": "2018-01-25T09:02-0500",
    "vendor": "Massimo",
    "category": "Food & Drink",
    "gigId": "5a91b813513541155c819fa5",
    "amount": "-356.81"
  },
  {
    "_id": "5a9b184688171a76ec802bfa",
    "date": "2018-01-25T07:00-0500",
    "vendor": "Payroll",
    "category": "Income",
    "gigId": "5a91b813513541155c819fa5",
    "amount": "4400.00"
  },
  {
    "_id": "5a9b184688171a76ec802bfb",
    "date": "2018-01-24T17:21-0500",
    "vendor": "Dunkin Donuts",
    "category": "Food",
    "gigId": "5a91b813513541155c819fa4",
    "amount": "-22.91"
  },
  {
    "_id": "5a9b184688171a76ec802bfc",
    "date": "2018-01-24T16:04-0500",
    "vendor": "Shell",
    "category": "Gas",
    "gigId": "5a91b813513541155c819fa4",
    "amount": "-39.72"
  },
  {
    "_id": "5a9b184688171a76ec802bfd",
    "date": "2018-01-24T11:02-0500",
    "vendor": "freeCodeCamp Subsciption",
    "category": "Research",
    "gigId": "5a91b813513541155c819fa5",
    "amount": "-211.99"
  },
  {
    "_id": "5a9b184688171a76ec802bfe",
    "date": "2018-01-24T10:18-0500",
    "vendor": "Audi Stratham",
    "category": "Parts",
    "gigId": "5a91b813513541155c819fa4",
    "amount": "-2198.45"
  },
  {
    "_id": "5a9b184688171a76ec802bff",
    "date": "2018-01-24T09:02-0500",
    "vendor": "Amazon AWS",
    "category": "Misc",
    "gigId": "5a91b813513541155c819fa5",
    "amount": "-237.19"
  },
  {
    "_id": "5a9b184688171a76ec802c00",
    "date": "2018-01-24T09:02-0500",
    "vendor": "McDonald's",
    "category": "Food & Drink",
    "gigId": "5a91b813513541155c819fa4",
    "amount": "-32.18"
  }
]

const defaultCategories = [
    {
        id: '9DF0A0DD19B2',
        name: 'Travel'
    }, {
        id: 'DCCBD8F37DA3',
        name: 'Tolls'
    }, {
        id: 'D2AA8A93CA76',
        name: 'Gas'
    }, {
        id: 'C86EE76D90B4',
        name: 'Gas'
    }
]

// match an accountId with an account
function getAccountWithID(accountID) {
    let result = {};
    defaultAccounts.forEach(acct => {
        if (acct._id === accountID) {
            result = acct;
        }
    })
    return result;
}


// match an accountId with an account
function getGigWithId(gigId) {
    let result = {};
    defaultGigs.forEach(gig => {
        if (gig._id === gigId) {
            result = gig;
        }
    })
    return result;
}
