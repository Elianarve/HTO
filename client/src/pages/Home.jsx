import './css/Home.css';
import { useState, useEffect } from "react";
import { deleteProduct, getProducts } from '../services/productServices';
import delte from '../assets/delte.svg';
import edit from '../assets/edit.svg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgZoom, setImgZoom] = useState(false);
  const navigate = useNavigate();

  const handleClick = (image) => {
    setSelectedImage(image);
    setImgZoom(true);
    window.open(image, '_blank');
};

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchProducts();
  }, []);


  return (
    <div className='home-container'>
       <div className="table-container">
        <table className="responsive-table">
          <thead className="thead-home">
            <tr className="title-tr-home">
              <th className="title-th-home">IMAGEN</th>
              <th className="title-th-home">ID PRODUCTO</th>
              <th className="title-th-home">NOMBRE</th>
              <th className="title-th-home">DESCRIPCIÓN</th>
              <th className="title-th-home">UNIDADES</th>
              <th className="title-th-home">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                className="table-wrapper"
                key={product.id}>
                <td className="td-wrapper-img"><img className='img-tool-home' src={product.image} alt="img-product" onClick={() => handleClick(product.image)}/></td>
                <td className="td-wrapper">{product.id}</td>
                <td className="td-wrapper">{product.description}</td>
                <td className="td-wrapper">{product.name}</td>
                <td className="td-wrapper">{product.stock}</td>
                <td className="td-wrapper-icons">
                  <button><img className='img-icon' src={edit} alt="icon-edit" /></button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <button onClick={()=> {deleteProduct(product.id).then(()=> navigate(0) )}}><img className='img-icon' src={delte} alt="icon-delete" /></button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home;