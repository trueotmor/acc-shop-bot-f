import React, { useEffect, useState, useCallback } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import './Form.css'


const Form = () => {

    const [country, setCountry] = useState('usa');
    const [street, setStreet] = useState('trump');
    const [subject, setSubject] = useState('physical');
    const {tg} = useTelegram();

    // const onSendData = useCallback(()=>{
    //     const data = {
    //         country,
    //         street,
    //         subject,
    //     };

    //     tg.sendData(JSON.stringify(data));
    //     tg.sendData('asdasda');
    //     console.log(data);
    // }, [country, street, subject]);

    const onSendData = useCallback(()=>{
        tg.sendData('asdasda');
    }, []);

    useEffect(()=>{
        tg.onEvent('mainButtonClicked', tg.sendData('asdasda'));
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        }
    }, [onSendData]);

    useEffect(()=>{
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, []);

    useEffect(()=>{
        if(!street || !country) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    },[country, street]);

    const onChangeCountry = (e) => {
        setCountry(e.target.value);
    };

    const onChangeStreet = (e) => {
        setStreet(e.target.value);
    };

    const onChangeSubject = (e) => {
        setSubject(e.target.value);
    };

    return (
        <div className='form'>
            <h3>Введите ваши данные</h3>
            <input 
                className={'input'} 
                type='text' 
                placeholder={'Страна'}
                value= {country}
                onChange={onChangeCountry}
            />
            <input 
                className={'input'}
                type='text' 
                placeholder={'Улица'} 
                value= {street}
                onChange={onChangeStreet}
            />
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'physical'}>Юр. лицо</option>
                <option value={'legal'}>Физ. лицо</option>
            </select>
        </div>
    );
};

export default Form;