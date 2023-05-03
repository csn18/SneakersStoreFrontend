import React from 'react';
import './Sign.css'
import {useForm} from 'react-hook-form';
import {closeModal, isOpen, openModalSignUp} from "../../store/Reducers/moladReducer";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "./RequestBackend";
import {setPassword} from "../../store/Reducers/userReducer";

function ModalSignIn(props) {
    const dispatch = useDispatch();
    const userPassword = useSelector((state) => state.user.userPassword);

    const openModalWindowSignUp = () => {
        dispatch(closeModal(true));
        dispatch(openModalSignUp(true));
        dispatch(isOpen(true));
    }

    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = (data) => {
        dispatch(setPassword(data.password));
        loginUser(data);
        dispatch(closeModal(true));
    };

    return (
        <div>
            <h1 className='modal-header'>Логин</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='sign-form'>
                <div className='sign-form__input-wrapper'>
                    <input type="text"
                           name='email'
                           placeholder="Email"
                           {...register("email", {required: true, pattern: /^\S+@\S+$/i})}
                           aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email?.type === 'pattern' && <p role="alert">В email допущена ошибка</p>}
                    {errors.email?.type === "required" && <p role="alert">Это обязательное поле</p>}
                </div>

                <div className='sign-form__input-wrapper'>
                    <input type="password"
                           name='password'
                           placeholder="Пароль"
                           autoComplete="new-password"
                           {...register("password", {required: true, maxLength: 24, minLength: 6})}
                           aria-invalid={errors.password ? "true" : "false"}
                    />
                    {
                        errors.password?.type === "minLength" &&
                        <p role="alert">Пароль должен содержать минимум 6 символов</p>
                    }
                    {
                        errors.password?.type === "maxLength" &&
                        <p role="alert">Пароль должен содержать максиму 24 символа</p>
                    }
                    {
                        errors.password?.type === "required" && <p role="alert">Это обязательное поле</p>
                    }
                </div>

                <div className='sign-form__more-action'>
                    Еще нет аккаунта?
                    <button onClick={openModalWindowSignUp}>
                        Зарегистрируйтесь
                    </button>
                </div>

                <input className='sign-form__submit-button' type="submit" value='Войти'/>
            </form>
        </div>
    );
}

export default ModalSignIn;