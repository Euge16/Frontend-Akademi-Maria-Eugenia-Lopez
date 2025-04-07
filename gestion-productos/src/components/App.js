import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import ProductEdit from './ProductEdit';
import ProductCreate from './ProductCreate';
import Footer from './Footer';
// Prueba para mostrar mis productos
/* function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
} */

const App = () => {
  return (
    
    <div className='app-container'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductList />}/>
          <Route path="/products/:id" element={<ProductDetail />}/>
          <Route path="/products/:id/edit" element={<ProductEdit />}/>
          <Route path="/add-product" element={<ProductCreate/>}/>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
    
  );
};

export default App;

