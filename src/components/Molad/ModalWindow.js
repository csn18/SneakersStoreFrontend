import React, {useRef} from 'react';
import {closeModal} from "../../store/Reducers/moladReducer";
import {useDispatch, useSelector} from "react-redux";
import ModalFavorites from "./ModalFavorites";
import ModalCart from "./ModalCart";
import ModalSignIn from "../Sign/ModalSignIn";
import ModalSignUp from "../Sign/ModalSignUp";
import ModalAccount from "../Sign/ModalAccount";

function ModalWindow({children}) {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.modal.isOpen);
    const modalRef = useRef();

    const openModalCart = useSelector((state) => state.modal.openModalCart);
    const openModalFavorite = useSelector((state) => state.modal.openModalFavorite);
    const openModalSignIn = useSelector((state) => state.modal.openModalSignIn);
    const openModalSignUp = useSelector((state) => state.modal.openModalSignUp);
    const openModalProfile = useSelector((state) => state.modal.openModalProfile);

    const closeModalOutside = () => {
        dispatch(closeModal(true));
    }

    const closeModalButton = () => {
        dispatch(closeModal(true));
    }

    return (
        <div>
            {
                <div className={isOpen ? 'modal-outside active' : 'modal-outside'} onClick={closeModalOutside}>
                    <div className={isOpen ? 'model-content active' : 'model-content'}
                         onClick={(event) => event.stopPropagation()}
                         ref={modalRef}
                    >
                        <div className="modal-header">
                            <button className='modal-close__btn' onClick={closeModalButton}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor" className="w-6 h-6" width={24} height={24}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        <div className="modal-content">
                            {
                                openModalCart ? <ModalCart/> : null
                            }
                            {
                                openModalFavorite ? <ModalFavorites/> : null
                            }
                            {
                                openModalSignIn ? <ModalSignIn/> : null
                            }
                            {
                                openModalSignUp ? <ModalSignUp/> : null
                            }
                            {
                                openModalProfile ? <ModalAccount/> : null
                            }
                        </div>
                    </div>
                </div>

            }
        </div>
    );
}

export default ModalWindow;