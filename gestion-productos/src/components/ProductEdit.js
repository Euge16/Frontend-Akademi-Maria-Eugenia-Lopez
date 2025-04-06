import './ProductEdit.css';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { updateProduct } from '../actions';
import { Link } from 'react-router-dom';

const ProductEdit = ({ products }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id.toString() === id.toString());

  const [formData, setFormData] = useState({...product});
  const [successMessage, setSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    if (name === "price"){
        if(Number(value) < 0){
            alert("El precio debe ser mayor a 0 (cero)");
            return;
        }
    }
    if (name === "stock"){
        if(Number(value) < 0){
            alert("Stock no puede ser negativo");
            return;
        }
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct(id, formData));
    setSuccessMessage(true);
    setTimeout(() => {
        setSuccessMessage(false);
        navigate(`/products/${id}`); 
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      {successMessage && <p className='success-message'>Producto actualizado correctamente</p>}
      <div className='field-group'>
        <label>Nombre:</label>
        <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange }
        />
      </div>

      <div className='field-group'>
        <label>Precio:</label>
        <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
        />
      </div>
      <div className='field-group'>
        <label>Stock:</label>
        <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
        />
      </div>
      <div className='field-group'>
        <label>Categoría:</label>
        <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
        />
      </div>
      <div className='field-group'>
        <label>Descripción:</label>
        <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
        />
      </div>
      <div className='field-group'>
        <label>URL de Imagen:</label>
        <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
        />
      </div>
      <button type="submit" className='save-button'>Guardar cambios</button>
      <Link to={'/'} className="cancel-link">
            Cancelar
      </Link>
    </form>
  );
};

const mapStateToProps = (state) => ({
    products: state.products.products || []
});
  
export default connect(mapStateToProps)(ProductEdit);
