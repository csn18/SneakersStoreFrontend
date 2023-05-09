import './App.css';
import NavMenu from './components/NavMenu/NavMenu'
import Catalog from './components/Catalog/Catalog'
import ModalWindow from "./components/Molad/ModalWindow";
import {useEffect, useState} from "react";
import CartService from "./API/CartService";
import {
    appendProductsFromDataBase,
    saveDataFirstLoad,
    updateCartProducts,
    updateStatusLoadedCartItems
} from "./store/Reducers/cartReducer";
import {useDispatch} from "react-redux";
import UserService from "./API/UserService";
import {setEmail, setFirstName} from "./store/Reducers/userReducer";
import {updatePriceProductsAction, updatePriceProductsStatusAction} from "./store/Reducers/shopItemsReducer";

function App() {
    const dispatch = useDispatch();
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            fetchFirstLoad().then(response => null);
        }, 1500)
    }, [])

    useEffect(() => {
        fetchUserProfile().then(response => null);
    }, [])

    useEffect(() => {
        const newSocket = new WebSocket(`ws://localhost:8000/ws/connection/`);
        setSocket(newSocket);

        newSocket.onopen = () => console.log("WebSocket connected");
        newSocket.onclose = () => console.log("WebSocket disconnected");

        return () => {
            newSocket.close();
        };
    }, [])

    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                switch (data['typeAction']) {
                    case 'updatePriceProduct':
                        dispatch(updatePriceProductsStatusAction(true));
                        dispatch(updateStatusLoadedCartItems(false));
                        return setTimeout(() => {
                            dispatch(updatePriceProductsAction(data));
                            fetchCartProducts();
                        }, 1500)
                    case 'updateCart':
                        dispatch(updateStatusLoadedCartItems(false));
                        return setTimeout(() => {
                            dispatch(updateCartProducts(data));
                        }, 1500)
                    default:
                        return
                }
            };
        }
    }, [socket]);

    async function fetchCartProducts() {
        const response = await CartService.getAllProductsCart();
        if (response) {
            dispatch(appendProductsFromDataBase(response.data['shop_items']));
        }
    }

    async function fetchFirstLoad() {
        const response = await CartService.firstLoad();
        if (response) {
            dispatch(saveDataFirstLoad(response.data))
        }
    }

    async function fetchUserProfile() {
        const response = await UserService.GetUserProfile();
        if (response) {
            dispatch(setEmail(response.data['username']));
            dispatch(setFirstName(response.data['first_name']));
        }
    }

    // async function fetchFavoritesProducts() {
    //     const response = await FavoriteService.getProductFavorite();
    //     if (response) {
    //         dispatch(appendFavoritesFromDataBase(response.data['shop_items']));
    //     }
    // }

    return (
        <div className="App">
            <NavMenu/>
            <Catalog/>
            <ModalWindow></ModalWindow>
        </div>
    );
}

export default App;
