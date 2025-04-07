import './ProductList.css';
import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts, deleteProduct} from "../actions";
import { Link } from 'react-router-dom';
import Pagination from './Pagination';


class ProductList extends React.Component {
  state = {
    selectedCategory: 'all',
    sortByPrice: 'all',
    sortByName: 'all',
    currentPage: 1, 
    productsPerPage: 5 
  };

  componentDidMount() {
    this.props.fetchProducts();
  }

  categoryChange = (e) => {
    this.setState({selectedCategory: e.target.value});
  };

  priceChange = (e) => {
    this.setState({sortByPrice: e.target.value});
  }

  nameChange = (e) => {
    this.setState({sortByName: e.target.value});
  }

  changePage = (page) => {
    this.setState({ currentPage: page });
  };
 

  getFilteredProducts() {
    const { selectedCategory } = this.state;
    const { products } = this.props;

    if(selectedCategory === 'all'){
      return products;
    }
    return products.filter(product => product.category === selectedCategory); 
    
  }

  getSortedProducts(filteredProducts) {
    const { sortByPrice, sortByName } = this.state;

    if (sortByPrice === 'asc') {
      return [...filteredProducts].sort((a, b) => a.price - b.price); // Menor a mayor
    } else if (sortByPrice === 'desc') {
      return [...filteredProducts].sort((a, b) => b.price - a.price); // Mayor a menor
    }

    if (sortByName === 'asc') {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name)); // A-Z
    } else if (sortByName === 'desc') {
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name)); // Z-A
    }

    return filteredProducts;
  }

  handleDelete (id)  {
    const confirmar = window.confirm('¿Seguro querés eliminar este producto?');
    if (!confirmar) return;
  
    this.props.deleteProduct(id);
  };

  

  render() {
    
    const products = this.props.products || [];
    const filteredProducts = this.getFilteredProducts();
    const sortedProducts = this.getSortedProducts(filteredProducts);
    
    const categories = ['all', ...new Set(products.map(product => product?.category))];
   
    const { currentPage, productsPerPage } = this.state;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    
    
    return (
      <div className="product-list-container">
        <div className="header">
          <h1 className="main-title">Akademi Femme Edition</h1>
          <Link to="/add-product" className="add-product-button">
            Agregar Producto
          </Link> 
        </div>
        
        <div className='filter-container'>
          <div className="filter-section">
            {/* <label>Filtrar por categoría: </label> */}
            <select value={this.state.selectedCategory} onChange={this.categoryChange} className="category-filter">
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Todas las categorías' : category}
                </option>
              ))}
            </select>
          </div>

          <div className="price-sort-section">
            {/* <label>Ordenar por precio: </label> */}
            <select value={this.state.sortByPrice} onChange={this.priceChange} className="price-sort">
              <option value="all">Todos los precios</option>
              <option value="asc">Menor a mayor</option>
              <option value="desc">Mayor a menor</option>
            </select>
          </div>

          <div className="name-sort-section">
            {/* <label>Ordenar por nombre: </label> */}
            <select value={this.state.sortByName} onChange={this.nameChange} className="name-sort">
              <option value="all">Orden predeterminado</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </div>
        </div>

        <div className="product-list-items">
          {currentProducts.map(product => (
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
                <Link to={`/products/${product.id}`}>
                  <button>Detalle</button>
                </Link>
                <Link>
                <button onClick={() => this.handleDelete(product.id)}>Eliminar</button>
                </Link> 
                
              </div>
            </div>
          ))}
        </div>
        
        <div className="pagination-container">
          <Pagination
            currentPage={this.state.currentPage}
            totalPages={Math.ceil(sortedProducts.length / this.state.productsPerPage)}
            onPageChange={(page) => this.changePage(page)}
          />
        </div>
        
      </div>
    );
  }
}
  
const mapStateToProps = state => ({
    products: state.products.products || []
});

export default connect(mapStateToProps, { fetchProducts, deleteProduct })(ProductList);