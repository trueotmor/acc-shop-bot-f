import React, { useState, useCallback, useEffect } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import ProductItem from "../ProductItem/ProductItem";
import { getTotalPrice } from "../../utils/getTotalPrice";
import './ProductList.css';

const accounts = [
    {id: '17485494', title: 'Стартовый аккаунт: Барклай + Гайранул + Блэкхорн', price: 6000, description: 'Аккаунт новый пройдено обучение до 1-8. Уровень: 3-4. Легендарные: Барклай + Гайранул + Блэкхорн Эпики: Аурея Хакрин Бакки Закари Харбег Джонатан Брузак Зарендил Томас Хелмар Хорри Ванс Хакрин Орах Гаджар Хью Привязка к вашей почте Gmail или к фейсбуку!', link: 'https://funpay.com/en/lots/offer?id=17485494', image: ''},
    {id: '17254468', title: 'Start account 5 legendary: Donovan + Garnet + Tashir + Fianna + Chiara', price: 5397, description: 'New account passed training to 1-8. Level: 3-4. Legendary: Donovan + Garnet + Tashir + Fianna + Chiara Epics: Zatlux, Windstrex, Hakrin, Lordrek, Helmar, Agustin, Aurea, Roslin, MarianBlood of Darkness, Andre, Windstrex, Kyle, Edikris, Harbeg, Trista', link: 'https://funpay.com/en/lots/offer?id=17254468', image: ''},
    {id: '17131179', title: 'Стартовый аккаунт: Алеся + ТОР + Балберит ', price: 4317, description: 'Аккаунт новый пройдено обучение до 1-8. Уровень: 3-4. Легендарные: Алеся + ТОР + Балберит Эпики: Виола, Скарлет, Азрина,Уильям, Хитоши, Рикард, Триста, Хакрин, Кейн, Закарий, Ванс, Криксус, Кейн, Меллиза, Лордрек', link: 'https://funpay.com/en/lots/offer?id=17131179', image: ''},
    {id: '16970799', title: 'Стартовый аккаунт: Элуна + Блэкхорн + Бачелард', price: 4317, description: 'Аккаунт новый пройдено обучение до 1-8. Уровень: 3-4. Легендарные: Элуна + Блэкхорн + Бачелард Эпики:Ноэлия,Виндстрекс,Легкокрылый Закари,Хитоши,Брузак,Беран,Марианкровьтьмы,Криксус', link: 'https://funpay.com/en/lots/offer?id=16970799', image: ''},
    {id: '16510631', title: 'Startup account: Guyronul + St. Windstreaks', price: 3562, description: 'New account passed training to 1-8. Level: 3-4. Legendary: Guyronul Epics: Saint Windstrex,Aurea,Hazel,Moon Melisa,Zatlux,Gajar,Jabez,Hitoshi,Windstrex,Virgil,Edikris,Thomas Link to your Gmail account.', link: 'https://funpay.com/en/lots/offer?id=16510631', image: ''},
    {id: '16387689', title: 'Стартовый аккаунт: Валерия', price: 2482, description: 'Аккаунт новый пройдено обучение до 1-8. Уровень: 3-4. Легендарные: Валерия Эпики: Беран, Бакки,Виндстрекс,Джейкоб,Виндстрекс', link: 'https://funpay.com/en/lots/offer?id=16387689', image: ''},
    {id: '16387672', title: 'Starting account: TOR + Nero', price: 3778, description: 'New account passed training to 1-8. Level: 3-4. Legendary: TOR + Nero Epics: Natasha, Epena, Horrie, Aurea, Jacob, Hazel, Borden, Virgil, Lordrek, Azrina, Orach, Scarlet, Mila, Andre', link: 'https://funpay.com/en/lots/offer?id=16387672', image: ''},
    {id: '16385128', title: 'Стартовый аккаунт: Балберит ', price: 2482, description: 'Аккаунт новый пройдено обучение до 1-8. Уровень: 3-4. Легендарные: Белла + Гектор Эпики: Эарендил,Ноэлия,ЛдКейн,Орхи,Бакки,МэрианКровьТьмы,Андре', link: 'https://funpay.com/en/lots/offer?id=16385128', image: ''},
    {id: '16385077', title: 'Стартовый аккаунт: Йоланда+Бэлла', price: 3778, description: 'Аккаунт новый пройдено обучение до 1-8. Уровень: 3-4. Легендарные: Йоланда+Бэлла Эпики: Уильям,Джоннатан,Эдикрис,Кайл,Окуби', link: 'https://funpay.com/en/lots/offer?id=16385077', image: ''},
    {id: '16384968', title: 'Стартовый аккаунт: ТОР+Гайронул', price: 4317, description: 'Аккаунт новый пройдено обучение до 1-8. Уровень: 3-4. Легендарные: ТОР+Гайронул Эпики: Беран,Харбег,Розлин,Борден,Кейн', link: 'https://funpay.com/en/lots/offer?id=16384968', image: ''},
];


const ProductList = () => {

    const [addedItems, setAddedItems] = useState([]);

    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(()=>{
        const data = {
            accounts: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId, 
        };
        fetch('https://acc-shop.herokuapp.com:8000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON',
            },
            body: JSON.stringify(data),
        })
    }, []);

    useEffect(()=>{
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        }
    }, [onSendData]);
    
    const onAdd = (account) => {
        const alreadyAdded = addedItems.find(item => item.id === account.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== account.id);
        } else {
            newItems = [...addedItems, account];
        }

        setAddedItems(newItems);

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {accounts.map(item => (
                <ProductItem
                    account={item}
                    onAdd={onAdd}
                    className={'item'}
                    key={item.id}
                />
            ))}
        </div>
    )
}

export default ProductList;