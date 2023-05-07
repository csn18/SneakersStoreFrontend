import './App.css';
import NavMenu from './components/NavMenu/NavMenu'
import Catalog from './components/Catalog/Catalog'
import ModalWindow from "./components/Molad/ModalWindow";
import {useEffect} from "react";
import CartService from "./API/CartService";
import {
    appendFavoritesFromDataBase,
    appendProductsFromDataBase
} from "./store/Reducers/cartReducer";
import {useDispatch} from "react-redux";
import UserService from "./API/UserService";
import {setEmail, setFirstName} from "./store/Reducers/userReducer";
import FavoriteService from "./API/FavoriteService";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            fetchCartProducts();
        }, 1500)
    }, [])

    useEffect(() => {
        fetchUserProfile();
    }, [])

    useEffect(() => {
        setTimeout(() => {
            fetchFavoritesProducts();
        }, 1500)
    }, [])

    async function fetchCartProducts() {
        const response = await CartService.getAllProductsCart();
        if (response) {
            dispatch(appendProductsFromDataBase(response.data['shop_items']));
        }
    }

    async function fetchUserProfile() {
        const response = await UserService.GetUserProfile();
        if (response) {
            dispatch(setEmail(response.data['username']));
            dispatch(setFirstName(response.data['first_name']));
        }
    }

    async function fetchFavoritesProducts() {
        const response = await FavoriteService.getProductFavorite();
        if (response) {
            dispatch(appendFavoritesFromDataBase(response.data['shop_items']));
        }
    }

    return (
        <div className="App">
            <NavMenu/>
            <Catalog/>
            <ModalWindow></ModalWindow>
        </div>
    );
}

export default App;
