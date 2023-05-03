import React from 'react';
import {useSelector} from "react-redux";
import FavoriteItem from "../Cart/FavoriteItem";

function ModalFavorites(props) {
    const favoriteList = useSelector((state) => state.cart.favoriteItems);

    return (
        <div>
            {
                favoriteList.length > 0
                    ? <div>
                        <h1 className='modal-header'>
                            Избранное
                        </h1>
                        <div className="favorite-items__header"></div>
                        <hr className='favorite-modal__hr'/>
                        <div className="favorite-items__list">
                            {
                                favoriteList?.map(element => <FavoriteItem {...element}/>)
                            }
                        </div>
                    </div>
                    : <h1>Тут ничего нет</h1>
            }
        </div>
    );
}

export default ModalFavorites;