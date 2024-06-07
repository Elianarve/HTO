import { useForm } from 'react-hook-form';
import { postProduct } from '../services/productServices';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Products.css';

const Products = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [Url_Image, setUrl_Image ] = useState("");
  const navigate = useNavigate()

  const onSubmit = async(data) =>{
    try { 
       data.image = Url_Image
       postProduct(data).then(() => {
        navigate('/'); 
      })
    } catch (error) {
        console.log('Error al publicar',error);
    }
  }

  const changeUploadImage = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset" , "imagenes_hto");
  
  const response = await axios.post("https://api.cloudinary.com/v1_1/dktiym01m/image/upload", data
  );  
  setUrl_Image(response.data.secure_url); 
  };
  const FunctionDeleteImage = () => {
    setUrl_Image("");
  };

  return (
    <form className='form-product' onSubmit={handleSubmit(onSubmit)}>
        <h2>AÑADIR PRODUCTO</h2>
        <div className='items'>
        <label className='label-item'>Imagen:</label>
        <input type="file" accept="image/*" {...register('image', { required: 'La imagen es requerida'})} onChange={changeUploadImage} />
        {errors.image && <p className="error-message">{errors.image.message}</p>} 
      </div>
      {Url_Image && (
               <div className='container-img'>
                   <img src={Url_Image} className="img-tools" />
                   <button className='delete-img-btn' onClick={FunctionDeleteImage}>Eliminar imagen</button>
               </div>
             )} 
        <div className='items'>
        <label className='label-item'>Nombre:</label>
        <input type="text" {...register('name', { required: 'El nombre es requerido'})} />
        {errors.name && <p className="error-message">{errors.name.message}</p>} 
      </div>
      <div className='items'>
        <label className='label-item'>Descripción:</label> 
        <textarea type="text" rows="5" cols="20" {...register('description', { required: 'La descripción es requerida'})} />
        {errors.description && <p className="error-message">{errors.description.message}</p>} 
      </div>
      <div className='items'>
        <label className='label-item'>Unidades:</label>
        <input type="number" min="0" max="200" {...register('stock', { required: 'El stock es requerido'})} />
        {errors.stock && <p className="error-message">{errors.stock.message}</p>} 
      </div>
      <button className='button-forms' type="submit">ENVIAR</button>

    </form>
  )
}

export default Products;