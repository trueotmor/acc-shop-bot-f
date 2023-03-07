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
        </div>
    )
}

export default ProductList;