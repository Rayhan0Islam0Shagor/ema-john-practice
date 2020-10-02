import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import happyImg from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const handleProceedCheckout = () => {
        history.push('/shipment');
    }

    const removeProduct = (key) => {
        const newCart = cart.filter(pd => pd.key !== key);
        setCart(newCart);
        removeFromDatabaseCart(key);
    }

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://young-escarpment-51427.herokuapp.com/productsByKeys', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data))

    }, []);

    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImg} alt="" />
    }
    return (
        <div>
            <div className="bg-dark d-flex p-1 justify-content-center align-items-center">
                <input className="w-75 m-2 form-control" type="text" />
                <button className="btn btn-outline-warning">Search</button>
                <p style={{ color: "white", marginTop: "12px", marginLeft: "50px", fontSize: "25px", cursor: "pointer" }}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <sup>
                        <span style={{ color: "orange" }}>{cart.length}</span>
                    </sup>
                </p>
            </div>
            <div className="shop-container p-4">
                <div className="product-container">
                    {
                        cart.map(pd => <ReviewItem
                            key={Math.random()}
                            removeProduct={removeProduct}
                            product={pd}
                            key={Math.random()}
                        />)
                    }
                    {thankYou}
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                        <button
                            onClick={handleProceedCheckout}
                            style={{ backgroundColor: "orange", fontWeight: "bold", width: "100%" }}
                            className="btn w-btn"
                        >
                            Proceed Checkout
                            </button>
                    </Cart>
                </div>
            </div>
        </div>

    );
};

export default Review;