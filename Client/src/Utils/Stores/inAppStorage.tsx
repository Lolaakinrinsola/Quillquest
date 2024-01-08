const isBrowser = () => typeof window !== "undefined";

export const Storage = {

    setItem: (itemKey: string, itemValue: any) => {
      if (typeof itemValue === "object") {
        itemValue = JSON.stringify(itemValue);
      }
      isBrowser() && localStorage.setItem(itemKey, itemValue);
    },
  
    appendItem: (itemKey: string, itemValue: any) => {
      let initialItemValue = isBrowser() && localStorage.getItem(itemKey);
      if (!initialItemValue) {
        initialItemValue = JSON.stringify([]);
        isBrowser() && localStorage.setItem(itemKey, initialItemValue);
      }
  
      try {
        initialItemValue = JSON.parse(initialItemValue);

        let finalItemValue;

        if (Array.isArray(initialItemValue)) {

          initialItemValue.push(itemValue);

          finalItemValue = JSON.stringify(initialItemValue);
        
        } else return initialItemValue;

        isBrowser() && localStorage.setItem(itemKey, finalItemValue);

      } catch (err) {
        return initialItemValue;
      }
    },
  
    subtractItem: (itemKey: string, itemValue: any) => {
      let initialItemValue = isBrowser() && localStorage.getItem(itemKey);
      if (!initialItemValue) return;
  
      try {
        initialItemValue = JSON.parse(initialItemValue);
        let finalItemValue: any;
        if (Array.isArray(initialItemValue)) {
          let filteredValues: any = initialItemValue.filter((val) => val.tab !== itemValue.tab);
          if (!filteredValues) filteredValues = [];
  
          finalItemValue = JSON.stringify(filteredValues);
        } else return initialItemValue;
        isBrowser() && localStorage.setItem(itemKey, finalItemValue);
      } catch (err) {
        return initialItemValue;
      }
    },
  
    getItem: (itemKey: string) => {
      const itemValue = isBrowser() && localStorage.getItem(itemKey);
      if (!itemValue) return;
  
      try {
        return JSON.parse(itemValue);
      } catch (err) {
        return itemValue;
      }
    },
  
    removeItem: (itemKey: string) => {
      isBrowser() && localStorage.removeItem(itemKey);
    },

    clearItem: () => {
      isBrowser() && localStorage.clear();
    },
    
  };