const buyers = [
  {
    id:1,
    name: 'John',
    averageCheck: 20,
    purchaseNumber: 4,
    totalRevenues: 80
  },
  {
    id:2,
    name: 'Mike',
    averageCheck: 45,
    purchaseNumber: 7,
    totalRevenues: 315
  },
  {
    id:3,
    name: 'Rodger',
    averageCheck: 63,
    purchaseNumber: 8,
    totalRevenues: 504
  },
  {
    id:4,
    name: 'Rodger',
    averageCheck: 30,
    purchaseNumber: 5,
    totalRevenues: 150
  },
  {
    id:5,
    name: 'Freyd',
    averageCheck: 80,
    purchaseNumber: 2,
    totalRevenues: 160
  },
  {
    id:6,
    name: 'Diego',
    averageCheck: 50,
    purchaseNumber: 9,
    totalRevenues: 450
  },
  {
    id:7,
    name: 'Mike',
    averageCheck: 40,
    purchaseNumber: 3,
    totalRevenues: 120
  },
  {
    id:8,
    name: 'Steaven',
    averageCheck: 70,
    purchaseNumber: 4,
    totalRevenues: 280
  },
  {
    id:9,
    name: 'Kris',
    averageCheck: 30,
    purchaseNumber: 4,
    totalRevenues: 120
  },
  {
    id:10,
    name: 'Diego',
    averageCheck: 50,
    purchaseNumber: 9,
    totalRevenues: 450
  },
  {
    id:11,
    name: 'Jacob',
    averageCheck: 50,
    purchaseNumber: 6,
    totalRevenues: 300
  },
  {
    id:12,
    name: 'William',
    averageCheck: 45,
    purchaseNumber: 2,
    totalRevenues: 90
  },
  {
    id:13,
    name: 'Mike',
    averageCheck: 200,
    purchaseNumber: 7,
    totalRevenues: 1400
  },
  {
    id:14,
    name: 'Jayden',
    averageCheck: 200,
    purchaseNumber: 1,
    totalRevenues: 200
  },
  {
    id:15,
    name: 'Kris',
    averageCheck: 50,
    purchaseNumber: 10,
    totalRevenues: 500
  }
]

const initialState = {
    login: '',
    password: '',
    avatarUrl: '',
    userIsAuthorized: false,
    terminalList: [],
    buyersList: buyers,
    visibleBuyers: buyers,
    newTerminal: '',
    newDescription: '',
    terminalID: 1,
    term: '',
    ascendingDirection: true 
}


export function rootReducer(state = initialState, action){
    switch (action.type) {
        case 'setLogin':
          return {
            ...state,
            login: action.payload
        };

        case 'setPassword':
          return {
            ...state,
            password: action.payload  
        };

        case 'setAvatarURL':
          return {
            ...state,
            avatarUrl: action.payload  
        };

        case 'changeUserIsAuthorized':
          return {
            ...state,
            userIsAuthorized: !state.userIsAuthorized  
        };

        case 'addNewTerminal': 
          return {
             ...state,
             terminalList: [...state.terminalList, action.payload]  
      };

        case 'setNewTerminal':
              return {
              ...state,
              newTerminal: action.payload
        };

        case 'setNewDescription':
              return {
              ...state,
              newDescription: action.payload
        };

        case 'increaseTerminalID':
              return {
              ...state,
              terminalID: state.terminalID + 1
        };

        case 'setTerminalListToNull':
          return {
          ...state,
          terminalList: []
        };

        case 'setVisibleBuyersToNull':
          return {
          ...state,
          visibleBuyers: []
        };

        case 'changeVisibleBuyers':
          return {
          ...state,
          visibleBuyers: [...state.visibleBuyers ,action.payload]
         };

        case 'setTerm':
          return {
            ...state,
            term: action.payload
        };

        case 'changeDirection':
            return {
            ...state,
            ascendingDirection: !state.ascendingDirection
        };

        default:
          return state;
      }
}
