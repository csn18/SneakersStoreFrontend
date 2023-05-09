import axios from "axios";

export default class CartService {
    static async getAllProductsCart() {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            return await axios.get('http://localhost:8000/api/user/cart/', {
                headers: {Authorization: `Bearer ${accessToken}`}
            });
        }
    };

    static async deleteProductCart(productId) {
        return await axios.delete(`http://localhost:8000/api/user/cart/item/${productId}/`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}
        });
    };

    static async addProductCart(data) {
        return await axios.post('http://localhost:8000/api/user/cart/', data, {
            headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}
        });
    };

    static async firstLoad() {
        return await axios.get('http://localhost:8000/api/first-load/', {
            headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}
        });
    }
};
