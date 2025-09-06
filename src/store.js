export const initialStore=()=>{
  return{
    baseURL: "https://www.swapi.tech/api/",
    people: [],
    favorites: [],
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set-people':
    
      return {
        ...store,
        people: action.payload, 
      };

      case "set-favorites":
        return {
          ...store,
          favorites: [...store.favorites, action.payload]
        }
    
    default:
      throw Error('Unknown action.');
  }    
}
