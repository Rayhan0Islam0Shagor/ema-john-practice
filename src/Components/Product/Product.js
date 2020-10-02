import React from 'react';
import '../Shop/Shop.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


const Product = (props) => {
    const { img, name, stock, seller, price, key, shipping } = props.product;
    const { handleAddProduct, product } = props;

    return (
        <div>
            <div className="product">
                <div>
                    <img src={img} alt="" />
                </div>
                <div className="ml-5">
                    <h5><Link style={{ textDecoration: "none" }} to={'/product/' + key}>{name}</Link></h5> <br />
                    <small>By: <strong>{seller}</strong></small> <br />
                    <small><strong>Only {stock} left in stock-order soon</strong></small><br />
                    <small><strong>SHIPPING: ${shipping}</strong></small> <br /><br />
                    <strong>${price}</strong> <br /> <br />
                    {
                        props.showAddToCart &&
                        <button
                            style={{ backgroundColor: "orange", fontWeight: "bold" }}
                            onClick={() => handleAddProduct(product)} className="btn w-btn">
                            <FontAwesomeIcon icon={faCartPlus} />
                            add to cart
                        </button>
                    }
                </div>
            </div>
        </div >
    );
};

export default Product;