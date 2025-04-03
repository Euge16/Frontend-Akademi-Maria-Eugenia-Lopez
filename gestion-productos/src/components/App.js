import React from 'react';
import './App.css';
import ProductList from './ProductList';
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
      <ProductList />
    </div>
    
  );
};

export default App;

