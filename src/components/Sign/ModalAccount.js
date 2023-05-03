import React, {useRef} from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setEmail, setFirstName} from "../../store/Reducers/userReducer";
import {useForm} from 'react-hook-form';
import {closeModal} from "../../store/Reducers/moladReducer";

function ModalAccount(props) {
    const dispatch = useDispatch();

    const userEmail = useSelector((state) => state.user.userEmail);
    const userFirstName = useSelector((state) => state.user.userFirstName);

    const {register, handleSubmit, getValues, formState: {errors}} = useForm();


    axios.get('http://localhost:8000/api/user/profile/', {
        headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}
    }).then((response) => {
        dispatch(setEmail(response.data.username));
        dispatch(setFirstName(response.data.first_name));
    })

    const onSubmit = () => {
        const data = getValues();
        axios.put('http://localhost:8000/api/user/profile/', data, {
            headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}
        })
            .then((response) => {
                if (response.status === 200) {
                    dispatch(closeModal(true));
                } else {
                    console.log(response)
                }
            })
    };

    return (
        <div>
            <h1 className='modal-header'>Профиль</h1>
            {
                userEmail
                    ? <form onSubmit={handleSubmit(onSubmit)} className='sign-form'>
                        <div className='sign-form__input-wrapper'>
                            <input type="text"
                                   name='email'
                                   placeholder="Email"
                                   defaultValue={userEmail}
                                   {...register("email", {required: true, pattern: /^\S+@\S+$/i})}
                                   aria-invalid={errors.email ? "true" : "false"}
                            />
                            {errors.email?.type === 'pattern' && <p role="alert">В email допущена ошибка</p>}
                            {errors.email?.type === 'required' && <p role="alert">Это обязательное поле</p>}
                        </div>
                        <div className="sign-form__input-wrapper">
                            <input type="text"
                                   placeholder="Имя"
                                   defaultValue={userFirstName}
                                   {...register("first_name", {})}
                            />
                        </div>

                        <input className='sign-form__submit-button' type="submit" value='Сохранить'/>
                    </form>
                    : <form action=""></form>
            }
        </div>
    );
}

export default ModalAccount;