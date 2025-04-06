import './ProductDetail.css';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ProductDetail = ({ products }) => {
  const { id } = useParams(); 
  console.log(id);
  const product = products.find(p => p.id.toString() === id.toString());
  console.log("Product:", product);
  
  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <h1 className="product-title">{product.name}</h1>
        <div className="product-image-container">
          <img
            src={product.image_url} 
            alt={product.name}
            className="product-detail-image"
          />
        </div>
        
        <div className="product-info-container">
          
            <Link to="/" className="back-button">
                  Editar
            </Link>
          
          <div className="price-section">
            <span className="product-price">${product.price?.toLocaleString('es-AR')}</span> 
          </div>
          <div className="product-extra-info">
            <p><strong>Categoría:</strong> {product.category}</p>
            <p><strong>Stock disponible:</strong> {product.stock}</p>
          </div>
          <div className="product-description">
            <h3>Descripción</h3>
            <p>{product.description || 'Este producto no tiene descripción.'}</p>
          </div>

          
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  products: state.products?.products || []
});

export default connect(mapStateToProps)(ProductDetail);