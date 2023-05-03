import './App.css';
import NavMenu from './components/NavMenu/NavMenu'
import Catalog from './components/Catalog/Catalog'
import ModalCart from './components/Molad/ModalCart'
import ModalWindow from "./components/Molad/ModalWindow";
import ModalFavorites from "./components/Molad/ModalFavorites";
import {useSelector} from "react-redux";

function App() {
    const openModalCart = useSelector((state) => state.modal.openModalCart);
    const openModalFavorite = useSelector((state) => state.modal.openModalFavorite);

    return (
        <div className="App">
            <NavMenu/>
            <Catalog/>
            <ModalWindow>

            </ModalWindow>
        </div>
    );
}

export default App;
