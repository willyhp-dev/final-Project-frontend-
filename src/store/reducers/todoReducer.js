const todoReducer = (state = [], action) => {
    switch (action.type) {
      case "SEARCH_PELANGGAN":
        return action.result.data;

      case "SEARCH_TRANSAKSI":
        return action.result.data;

      case "SEARCH_PRODUCT":
        return action.result.data;

      case "HITUNG_TRANSAKSI":
        return action.result.data;

      case "SAVE_TRANSAKSI":
        return [action.result.data, ...state];
        
      default:
        return state;
    }
  };
  
  export default todoReducer;