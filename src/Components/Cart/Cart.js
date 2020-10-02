import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    // const totalPrice = cart.reduce((total, prd) => total + (prd.price * (prd.quantity || 1)), 0);

    // Explain Reduce using for loop 👇
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        totalPrice = totalPrice + product.price * product.quantity || 1;
    }

    // shipping Price 
    let shipping = 0;
    if (totalPrice > 35) {
        shipping = 0;
    }
    else if (totalPrice > 15) {
        shipping = 4.99;
    }
    else if (totalPrice > 0) {
        shipping = 12.99;
    }

    const tax = (totalPrice / 10).toFixed(2);

    const grandTotal = (totalPrice + shipping + Number(tax)).toFixed(2)


    const formatNumber = num => {
        const precison = num.toFixed(2);
        return Number(precison);
    }

    return (
        <div>
            <div style={{ border: "2px solid orange", padding: "35px", marginRight: "20px" }}>
                <h4>This is cart </h4>
                <p>Product Price: ${formatNumber(totalPrice)}</p>
                <p>shipping: ${shipping}</p>
                <p><small>TAX & VAT: ${tax}</small></p>
                <h5>total Price: ${grandTotal}</h5>
                {
                    props.children
                }
            </div>
            <h1 className="text-center mt-5 text-primary">ADS HERE</h1>
        </div>
    );
};

export default Cart;