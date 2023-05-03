import axios from "axios";

export default class FavoriteService {
    static async addToFavorite(data) {
        const accessToken = localStorage.getItem('accessToken')
        return await axios.post('http://localhost:8000/api/user/favorite/',
            data, {headers: {Authorization: `Bearer ${accessToken}`}}
        );
    };

    static async getProductFavorite() {
        const accessToken = localStorage.getItem('accessToken');
        return await axios.get('http://localhost:8000/api/user/favorite/', {
                headers: {Authorization: `Bearer ${accessToken}`}
            },
        );
    };

    static async deleteProductFavorite(productId) {
        const accessToken = localStorage.getItem('accessToken');
        return await axios.delete(`http://localhost:8000/api/user/favorite/${productId}/`,
            {
                headers: {Authorization: `Bearer ${accessToken}`}
            },
        );
    };
};