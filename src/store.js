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

    case "toggle-favorite":
      const exists = store.favorites.some(fav => fav.uid === action.payload.uid);
      return {
          ...store,
          favorites: exists
          ? store.favorites.filter(fav => fav.uid !== action.payload.uid)
          : [...store.favorites, action.payload],
      };
      default:
        throw Error('Unknown action.');
  }    
}
