// src/utils/api.ts
import productsData from '../data/products.json';

export const fetchProducts = (page: number, pageSize: number) => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedProducts = productsData.slice(start, end);
    const totalProducts = productsData.length;

    return new Promise<{ products: typeof productsData; total: number }>((resolve) => {
        setTimeout(() => {
            resolve({ products: paginatedProducts, total: totalProducts });
        }, 500); // Simulate a network delay
    });
};
