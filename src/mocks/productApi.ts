export interface Product {
    id?: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
    images: string[];
    assets: string[];
}

let products: Product[] = [];

export const fetchProducts = async (): Promise<Product[]> => {
    return products;
};

export const addProduct = async (product: Product): Promise<Product> => {
    product.id = String(products.length + 1);
    products.push(product);
    return product;
};

export const updateProduct = async (updatedProduct: Product): Promise<Product> => {
    products = products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
    );
    return updatedProduct;
};

export const deleteProduct = async (id: string): Promise<void> => {
    products = products.filter((product) => product.id !== id);
};
