import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('https://young-escarpment-51427.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    })

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
    }, [products])

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct]
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
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
            <div className="shop-container">
                <div className="product-container">
                    {
                        products.map(product => <Product key={Math.random()} showAddToCart={true} handleAddProduct={handleAddProduct} product={product}></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                        <Link to='/review'>
                            <button
                                style={{ backgroundColor: "orange", fontWeight: "bold", width: "100%" }}
                                className="btn w-btn"
                            >
                                Review Order
                            </button>
                        </Link>
                    </Cart>
                </div>
            </div >
        </div>
    );
};

export default Shop;