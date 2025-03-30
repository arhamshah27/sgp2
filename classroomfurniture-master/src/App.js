
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import PgFoF from './Components/PgFoF';
import Cart from './Components/Cart';
import UserProfile from './Components/UserProfile';
import Addproduct from './Components/Addproduct';
import Allproductpage from './Components/Some-Product-Components/Allproductpage.js';
import Specificproductpage from './Components/Some-Product-Components/Specificproductpage.js';

function App() {
  return (
   <BrowserRouter>
   <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/cart" element={<Cart />} />
      <Route exact path="/userprofile" element={<UserProfile />} />
      <Route exact path="/sellproduct" element={<Addproduct />} />
      <Route exact path="/product-type/tiles" element={<Allproductpage type={'Tiles'} />} />
      <Route exact path="/product-type/windows" element={<Allproductpage type={'Windows'} />} />
      <Route exact path="/product-type/benches" element={<Allproductpage type={'Benches'} />} />
      <Route exact path="/product-type/lab-tables" element={<Allproductpage type={'Lab-Tables'} />} />
      <Route exact path="/product/:type/:id" element={<Specificproductpage />} />
      

      <Route exact path="/cartdata" element={<Cart />} />

      <Route exact path="*" element={<PgFoF />} />
   </Routes>
   </BrowserRouter>
  );
}

export default App
