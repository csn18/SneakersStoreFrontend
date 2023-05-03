import axios from "axios";

export default class UserService {
    static async GetUserProfile() {
        return await axios.get('http://localhost:8000/api/user/profile/', {
            headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}
        });
    };
};