const defaultData = {
    "stocks" : []
  }, storeName = "rdl4199-p1-settings";
  
  export const readLocalStorage = () => {
    let allValues = null;
  
    try{
      allValues = JSON.parse(localStorage.getItem(storeName)) || defaultData;
    }catch(err){
      console.log(`Problem with JSON.parse() and ${storeName} !`);
      throw err;
    }
  
    return allValues;
  };
  
  export const writeLocalStorage = (allValues) => {
    localStorage.setItem(storeName, JSON.stringify(allValues));
  };
  
  export const clearLocalStorage = () => {
    writeLocalStorage(defaultData);
    document.querySelector(".stock-cards").innerHTML = "";
  }
  
  export const addStock = (str) => {
    const allValues = readLocalStorage();
  
    allValues.stocks.push(str);
    writeLocalStorage(allValues);
  };
  
  export const getStocks = () => readLocalStorage().stocks;
  