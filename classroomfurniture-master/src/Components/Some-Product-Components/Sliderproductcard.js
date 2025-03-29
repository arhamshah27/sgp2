import React from 'react';
import { Link } from 'react-router-dom';
import './Sliderproductcard.css';

const Sliderproductcard = ({ product }) => {
    let p = product;
    let overalltax = 10 / 100;
    let overallcommission = 10 / 100;
    let extraforfun = 10 / 100;

    let mrp = parseFloat(p.price);
    mrp = mrp + overalltax * mrp + overallcommission * mrp + extraforfun * mrp;
    const saleprice = mrp - extraforfun * mrp;

    return (
        <div className='mini-product-container'>
            <div className='mini-img-container'>
                <img src={p.prodimage} alt={p.producttitle} />
            </div>
            <div className='mini-product-details'>
                <p className='mini-producttitle'>{p.producttitle}</p>
                <div className='mini-price-container'>
                    <p className='mrp'>
                        MRP: <span className='rate'>₹{mrp.toFixed(2)}</span>
                    </p>
                    <p className='saleprice'>
                        Price: <span className='rate'>₹{saleprice.toFixed(2)}</span>
                    </p>
                    <p className='yousave'>
                        You Save: ₹{(mrp - saleprice).toFixed(2)}
                    </p>
                </div>
                <Link to={`/product/${p.producttype}/${p.id}`}>
                    <button className='showmore-btn'>More Details &gt;</button>
                </Link>
            </div>
        </div>
    );
};

export default Sliderproductcard;
