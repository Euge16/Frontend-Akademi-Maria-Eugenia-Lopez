import './ProductList.css';
import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from "../actions";


class ProductList extends React.Component {
  state = {
    selectedCategory: 'all'
    
  };

  componentDidMount() {
    this.props.fetchProducts();
  }

  categoryChange = (e) => {
    this.setState({selectedCategory: e.target.value});
  };

  

  getFilteredProducts() {
    const { selectedCategory } = this.state;
    const { products } = this.props;

    if(selectedCategory === 'all'){
      return products;
    }
    return products.filter(product => product.category === selectedCategory); 
    
  }


  render() {
    
    const products = this.props.products || [];
    const filteredProducts = this.getFilteredProducts();
    const categories = ['all', ...new Set(products.map(product => product?.category))];
    


    return (
      <div className="product-list-container">
        <h2>Listado de Productos</h2>
        
        <div className="filter-section">
          <label>Filtrar por categoría: </label>
          <select value={this.state.selectedCategory} onChange={this.categoryChange} className="category-filter">
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'Todas las categorías' : category}
              </option>
            ))}
          </select>
        </div>
        
      

        <div className="product-list-items">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-list-item">
              {product.image_url && (
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  className="product-list-image"
                />
              )}
              
              <div className="product-list-info">
                <h3 className="product-list-name">{product.name}</h3>
                <p className="product-list-category">{product.category}</p>
                <p className="product-list-price">${product.price.toLocaleString()}</p>
                <p className="product-list-stock">
                  {product.stock > 0 ? `Disponible (${product.stock})` : 'Agotado'}
                </p>
              </div>
              
              <div className="product-list-actions">
                
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
  
const mapStateToProps = state => ({
    products: state.products.products || []
});

export default connect(mapStateToProps, { fetchProducts })(ProductList);