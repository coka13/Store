export const getAllUniqueCategories = (products) => {
    const temp = []
      products.map(element => {
        if(temp.includes(element["category"])===false){
          temp.push(element["category"])
        }
      });
      return temp
    }