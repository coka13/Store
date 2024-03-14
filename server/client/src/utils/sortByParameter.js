export const sorting = (products, sortParameter) => {
    const sortedProducts = [...products];

    if (sortParameter === "Price: low to high") {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortParameter === "Price: high to low") {
        sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortParameter === "A-Z") {
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortParameter === "Z-A") {
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    }

    return sortedProducts;
};
