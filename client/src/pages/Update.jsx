import { useForm } from 'react-hook-form';
import { getOneProduct, updateProduct } from '../services/productServices';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './css/Products.css';


const Update = () => {
  const { handleSubmit, register, formState: { errors }, setValue } = useForm();
  const [Url_Image, setUrl_Image ] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async()=> {
        try {
        const response = await getOneProduct(id);
        console.log(response.data)
        const data = response.data;
        setValue('name', data.name);
        setValue('description', data.description);
        setValue('stock', data.stock);
        setUrl_Image('image', data.image);
        setUrl_Image(data.image);
        } catch(error){
          console.error('Error:', error);
        }  
    }
    fetchData();
}, [id, setValue]);

  const onSubmit = async(data) =>{
    try { 
       data.image = Url_Image
       updateProduct(id, data);
        navigate('/'); 
    } catch (error) {
        console.log('Error al publicar',error);
    }
  }

  const changeUploadImage = async (e) => {
    const file = e.target.files[0];
    const newData = new FormData();
    newData.append("file", file);
    newData.append("upload_preset" , "imagenes_hto");
  
  const response = await axios.put("https://api.cloudinary.com/v1_1/dktiym01m/image/upload", newData);  
  setUrl_Image(response.data.secure_url); 
  };
  const FunctionDeleteImage = () => {
    setUrl_Image("");
  };

  return (
    <form className='form-product' onSubmit={handleSubmit(onSubmit)}>
        <h2>MODIFICAR PRODUCTO</h2>
        <div className='items'>
        <label className='label-item'>Imagen:</label>
        <input type="file" id="image" accept="image/*" name="image" {...register('image')} onChange={changeUploadImage} />
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
      <button className='button-forms' type="submit">MODIFICAR</button>

    </form>
  )
}

export default Update;