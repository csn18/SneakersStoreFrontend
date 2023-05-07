import axios from "axios";

export default class UserService {
    static async GetUserProfile() {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            return await axios.get('http://localhost:8000/api/user/profile/', {
                headers: {Authorization: `Bearer ${accessToken}`}
            });
        }
    };
};