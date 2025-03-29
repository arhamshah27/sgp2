import React from 'react';
import { useLocation } from 'react-router-dom';

const BillPage = () => {
    const location = useLocation();
    const { product } = location.state || {};

    if (!product) {
        return <p>No product found!</p>;
    }

    return (
        <div>
            <h2>Billing Details</h2>
            <p>Product: {product.producttitle}</p>
            <p>Price: ₹{product.price}</p>
        </div>
    );
};

export default BillPage;
