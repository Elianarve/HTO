import './css/Home.css';
import { useState, useEffect } from "react";
import { deleteProduct, getProducts } from '../services/productServices';
import delte from '../assets/delte.svg';
import edit from '../assets/edit.svg';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/search/Search';
import Swal from 'sweetalert2';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgZoom, setImgZoom] = useState(false);
  const navigate = useNavigate();

  const handleClick = (image) => {
    setSelectedImage(image);
    setImgZoom(true);
    window.open(image, '_blank');
  };

  const handleSearch = (searchTerm) => {
    const filteredResults = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredProducts(filteredResults);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        setFilteredProducts(productsData);       
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProducts();
  }, []);

  // return (
  //   <div className='home-container'>
  //     <div className="table-container">
  //       <SearchBar onSearch={handleSearch} />
  //       <table className="responsive-table">
  //         <thead className="thead-home">
  //           <tr className="title-tr-home">
  //             <th className="title-th-home">IMAGEN</th>
  //             <th className="title-th-home">NOMBRE</th>
  //             <th className="title-th-home">DESCRIPCIÓN</th>
  //             <th className="title-th-home">STOCK</th>
  //             <th className="title-th-home">ACCIONES</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {filteredProducts.map((product) => (
  //             <tr
  //               className="table-wrapper"
  //               key={product.id}>
  //               <td className="td-wrapper-img"><img className='img-tool-home' src={product.image} alt="img-product" onClick={() => handleClick(product.image)} /></td>
  //               <td className="td-name">{product.name}</td>
  //               <td className="td-description">{product.description}</td>
  //               <td className="td-wrapper" style={{ color: product.stock === 0 || product.stock === 1 ? 'red' : 'green' && product.stock >= 4 ? 'green' : 'blue', fontWeight: product.stock === 0 ? 'bold' : 'bold', fontSize: product.stock === 1 ? '3em' : '3em'}}>{product.stock}</td>
  //               <td className="td-wrapper-icons">
  //                 <button className='button-icon-edit' onClick={() => navigate(`/update/${product.id}`)}><img className='img-icon-edit' src={edit} alt="icon-edit" /></button>
  //                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  //                 <button className='button-icon-delete' onClick={() => { deleteProduct(product.id).then(() => navigate(0)) }}><img className='img-icon-delete' src={delte} alt="icon-delete" /></button>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // )
  return (
    <div className='home-container'>
      <div className="table-container">
        <SearchBar onSearch={handleSearch} />
        <table className="responsive-table">
          <thead className="thead-home">
            <tr className="title-tr-home">
              <th className="title-th-home">IMAGEN</th>
              <th className="title-th-home">NOMBRE</th>
              <th className="title-th-home">DESCRIPCIÓN</th>
              <th className="title-th-home">STOCK</th>
              <th className="title-th-home">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr
                className="table-wrapper"
                key={product.id}>
                <td className="td-wrapper-img"><img className='img-tool-home' src={product.image} alt="img-product" onClick={() => handleClick(product.image)} /></td>
                <td className="td-wrapper td-name">{product.name}</td>
                <td className="td-wrapper td-description">{product.description}</td>
                <td className="td-wrapper" style={{ color: product.stock === 0 || product.stock === 1 ? 'red' : 'green' && product.stock >= 4 ? 'green' : 'blue', fontWeight: product.stock === 0 ? 'bold' : 'bold', fontSize: product.stock === 1 ? '3em' : '3em'}}>{product.stock}</td>
                <td className="td-wrapper-icons">
                  <button className='button-icon-edit' onClick={() => navigate(`/update/${product.id}`)}><img className='img-icon-edit' src={edit} alt="icon-edit" /></button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <button className='button-icon-delete' onClick={() => { deleteProduct(product.id).then(() => navigate(0)) }}><img className='img-icon-delete' src={delte} alt="icon-delete" /></button>
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
