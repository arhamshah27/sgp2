import React from 'react'
import './Productcontainer.css'
import { Link } from 'react-router-dom';
const ProductCard = ({ product }) => {
    const formattedPrice = (price) => parseFloat(price).toFixed(2);
    
    let overallTax = 10 / 100;
    let overallCommission = 10 / 100;
    let extraForFun = 10 / 100;

    let mrp = parseFloat(product.price);
    mrp = mrp + overallTax * mrp + overallCommission * mrp + extraForFun * mrp;
    const salePrice = mrp - extraForFun * mrp;
    const savings = mrp - salePrice;

    return (
        <div className='product-container'>
            <img src={product.prodimage} alt={product.producttitle} />
            <div className='product-details'>
                <Link to={`/product/${product.producttype}/${product.id}`}>
                    <button className='producttitle'>{product.producttitle}</button>
                </Link>

                <div className='price-container'>
                    <div className='mrp'>
                        <span>MRP:</span>
                        <span className='rate' style={{ textDecoration: 'line-through', color: 'red' }}>₹{formattedPrice(mrp)}</span>
                    </div>
                    <div className='saleprice'>
                        <span>Discount Price:</span>
                        <span className='rate' style={{ color: 'green', fontWeight: 'bold' }}>₹{formattedPrice(salePrice)}</span>
                    </div>
                    <div className='yousave'>
                        <span>You Save:</span>
                        <span className='rate'>₹{formattedPrice(savings)}</span>
                    </div>
                </div>
                <Link to={`/product/${product.producttype}/${product.id}`}>
                    <button className='showmore-btn'>More Details &gt;</button>
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
