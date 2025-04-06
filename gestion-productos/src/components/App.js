import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
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
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
};

export default App;

