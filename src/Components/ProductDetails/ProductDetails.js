import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetails = () => {
    const { key } = useParams();
    const [product, setProduct] = useState({})

    useEffect(() => {
        fetch('https://young-escarpment-51427.herokuapp.com/product/' + key)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [key])

    return (
        <div>
            <h2>Your Product Details Here...</h2>
            <Product key={Math.random()} showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;