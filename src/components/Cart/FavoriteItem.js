import React from 'react';
import {removeProductFromFavorite, addProductToCartFavorite} from "../../store/Reducers/cartReducer";
import {useDispatch} from "react-redux";
import CartService from "../../API/CartService";
import FavoriteService from "../../API/FavoriteService";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function FavoriteItem(props) {
    const dispatch = useDispatch();

    async function removeFavoriteElement() {
        await FavoriteService.deleteProductFavorite(props.id);
        dispatch(removeProductFromFavorite(props));
    }

    async function addProductToCartFromFavorite() {
        await CartService.addProductCart({itemId: props.id});
        dispatch(addProductToCartFavorite(props));
    }

    return (
        <div className='favorite-item'>
            <div className="cart-item__image">
                <img src={props.images && props.images[0].image} width={90} height={90} alt=""/>
            </div>
            <div className="cart-item__title">
                {props.title}
            </div>
            <div className="cart-item__price">
                {props.price} ₽
            </div>
            <div className="cart-item__remove">
                <Button variant="outlined"
                        onClick={addProductToCartFromFavorite}
                        startIcon={<ShoppingCartOutlinedIcon/>}>
                    В корзину
                </Button>
                <IconButton color='error'
                            aria-label="delete"
                            onClick={removeFavoriteElement}>
                    <DeleteIcon/>
                </IconButton>
            </div>
        </div>
    );
}

export default FavoriteItem;