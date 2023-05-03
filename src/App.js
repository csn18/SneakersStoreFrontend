import './App.css';
import NavMenu from './components/NavMenu/NavMenu'
import Catalog from './components/Catalog/Catalog'
import ModalWindow from "./components/Molad/ModalWindow";
import {useEffect} from "react";
import CartService from "./API/CartService";
import {appendProductsFromDataBase} from "./store/Reducers/cartReducer";
import {useDispatch} from "react-redux";
import UserService from "./API/UserService";
import {setEmail, setFirstName} from "./store/Reducers/userReducer";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchCartProducts();
    }, [])

    useEffect(() => {
        fetchUserProfile()
    }, [])

    async function fetchCartProducts() {
        const response = await CartService.getAllProductsCart();
        dispatch(appendProductsFromDataBase(response.data['shop_items']))
    }

    async function fetchUserProfile() {
        const response = await UserService.GetUserProfile();
        dispatch(setEmail(response.data['username']));
        dispatch(setFirstName(response.data['first_name']));
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
