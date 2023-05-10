const smartphones = {
  apple: ["iphone-10", "iphone-11", "iphone-12", "iphone-13"],
  samsung: ["Galaxy A32", "Galaxy A03s", "Galaxy A73 5G"],
  oneplus: ["Nord AC2003", "9 LE2113", "8T KB2003"],
};

smartphones[Symbol.iterator] = function() {
  const self = this;
  const objKeys = Object.keys(this);
  let objIndex = 0;
  let arrIndex = 0;

  return {
    next() {
      const objKey = objKeys[objIndex];
      
      if (objIndex < objKeys.length) {
        if (arrIndex < self[objKeys[objIndex]].length) {
          const arrName = self[objKey][arrIndex++];
          const value = `${objKey} - ${arrName}`;        
          return { done: false, value: value};
        }
        
        objIndex++;
        arrIndex = 0;
        
        return this.next();
      }
      
      return { done: true};
    }
  }
}

for (const smartphone of smartphones) {
  console.log(smartphone); 
}
