import React, { useState } from "react";
import Button from "../Button/Button";
import { useTelegram } from "../../hooks/useTelegram";
import './ProductList.css'


const ProductList = () => {
    const {user, onClose} = useTelegram()
    const [adada, setAdada] = useState('')

    return (
        <div>
            Product List
            <div className='form'>
                <h3>Введите ваши данные</h3>
                <input 
                    className={'input'} 
                    type='text' 
                    placeholder={'Страна'}
                    value={adada}
                />
                <input 
                    className={'input'}
                    type='text' 
                    placeholder={'Улица'}
                    value='asdapdpadp' 
                />
                {/* <select value={subject} onChange={onChangeSubject} className={'select'}>
                    <option value={'physical'}>Физ. лицо</option>
                    <option value={'legal'}>Юр. лицо</option>
                </select> */}
            </div>
        </div>
    )
}

export default ProductList;