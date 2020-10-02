import React from 'react';


const Inventory = () => {
    const handleAddProduct = () => {
        const product = {};
        fetch('https://young-escarpment-51427.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
    }

    return (
        <div className="container pb-5 mt-4">
            <div className="row">
                <div className="col-md-6">
                    <form action="">
                        <p><span>Name: </span><input className="form-control w-50" type="text" /></p>
                        <p><span>Price: </span><input className="form-control w-50" type="text" /></p>
                        <p><span>Quantity: </span><input className="form-control w-50" type="text" /></p>
                        <p><span>Product Image:  </span><input className="form-control w-50" type="file" /></p>
                        <button className="btn btn-warning mt-2" onClick={handleAddProduct}>add Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Inventory;