import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error.message);
        throw new Error('Failed to fetch products. Please try again later.');
    }
};

export const fetchProductById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error.message);
        throw new Error('Failed to fetch the product. Please try again later.');
    }
};