import React from 'react';
import './Modal.css'
import {closeModal, isOpen, openModalSignIn, openModalSignUp} from "../../store/Reducers/moladReducer";
import {useDispatch} from "react-redux";

export const ModalNotAuth = () => {
    const dispatch = useDispatch();

    const openModalWindowSignUp = () => {
        dispatch(closeModal(true));
        dispatch(openModalSignUp(true));
        dispatch(isOpen(true));
    }

    const openModalWindowSignIn = () => {
        dispatch(closeModal(true));
        dispatch(openModalSignIn(true));
        dispatch(isOpen(true));
    }

    return (
        <div>
            <h1>Похоже вы не авторизовались</h1>
            <div className='not-auth__container'>
                <button className='sign-form__submit-button' onClick={openModalWindowSignIn}>
                    Войти
                </button>
                <div className='sign-form__more-action'>
                    Еще нет аккаунта?
                    <button onClick={openModalWindowSignUp}>
                        Зарегистрируйтесь
                    </button>
                </div>
            </div>
        </div>

    );
}
