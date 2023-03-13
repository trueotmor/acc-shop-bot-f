import React from 'react';
import Button from "../Button/Button";
import './ProductItem.css';

const ProductItem = ({account, className, onAdd}) => {

    const onAddHandler = () => {
        onAdd(account);
    }

    return (
        <div className={'product ' + className}>
            <div className={'img'}/>
            <div className={'title'}>{account.title}</div>
            <div className={'description'}>{account.description}</div>
            <div className={'price'}>
                <span>Стоимость: <b>{account.price}</b></span>
            </div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                Добавить в корзину
            </Button>
        </div>
    );
};

export default ProductItem;