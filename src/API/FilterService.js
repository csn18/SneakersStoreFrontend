import axios from "axios";

export default class FilterService {
    static async getAllFilters() {
        return await axios.get('http://localhost:8000/api/filters/')
    };

    static async getItemsFilter(params) {
        return await axios.get(`http://localhost:8000/api/items/${params}`)
    };
};
