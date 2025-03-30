import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { auth, db } from '../FirebaseConfigs/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import CartCard from './CartCard';
import './Cart.css';
import picoImage from './Assets/upicodearham.jpg'; // Import the image

const Cart = () => {
    function GetCurrentUser() {
        const [user, setUser] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(async (userlogged) => {
                if (userlogged) {
                    const q = query(collection(db, "users"), where("uid", "==", userlogged.uid));
                    const data = await getDocs(q);
                    setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                } else {
                    setUser(null);
                }
            });
        }, []);
        return user;
    }

    const loggeduser = GetCurrentUser();
    const [cartdata, setcartdata] = useState([]);

    useEffect(() => {
        if (loggeduser) {
            const getcartdata = async () => {
                const cartArray = [];
                const path = `cart-${loggeduser[0].uid}`;
                try {
                    const querySnapshot = await getDocs(collection(db, path));
                    querySnapshot.forEach((doc) => {
                        cartArray.push({ ...doc.data(), id: doc.id });
                    });
                    setcartdata(cartArray);
                } catch (error) {
                    console.error('Error fetching cart data:', error);
                }
            };
            getcartdata();
        }
    }, [loggeduser]);

    // Calculate total sale price using the provided formula
    const totalSalePrice = cartdata.reduce((acc, item) => {
        // Get base price from nested product object
        const basePrice = item.product && item.product.price ? parseInt(item.product.price) : 0;
        const quantity = parseInt(item.quantity) || 1;
        
        // Apply the pricing formula
        const overalltax = 10 / 100;
        const overallcommission = 10 / 100;
        const extraforfun = 10 / 100;
        
        // Calculate MRP with all additions
        let mrp = basePrice;
        mrp = mrp + overalltax * mrp + overallcommission * mrp + extraforfun * mrp;
        
        // Calculate sale price (MRP - extraforfun portion) * quantity
        const salePrice = (mrp - extraforfun * mrp) * quantity;
        
        return acc + salePrice;
    }, 0);

    return (
        <div>
            <Navbar />
            {cartdata.length > 0 ? (
                <div>
                    <div className='cart-head'>Your Cart Items</div>
                    <div className='allcartitems'>
                        {cartdata.map((item) => (
                            <CartCard key={item.id} itemdata={item} userid={loggeduser[0].uid} />
                        ))}
                        <div className='total-price'>
                            <h3>Total Sale Price: ₹{totalSalePrice.toFixed(2)}</h3>
                        </div>
                        
                        {/* Added image element here */}
                        <div className='payment-image'>
                            <img src={picoImage} alt="Payment Method" />
                        </div>
                        
                        <div className='proceed'>
                            <button>Proceed</button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Your Cart is empty</p>
            )}
        </div>
    );
};

export default Cart;