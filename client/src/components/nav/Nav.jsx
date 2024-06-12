import logo from '../../assets/logoHto2.png';
import '../nav/Nav.css';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <>
    <nav className='navbar'>
    <div className="container-nav">
      <img className='logo-nav' src={logo} alt="logo" />
    </div>
    <ul className='nav-links'>
    <li className='button-nav'><Link to="/">Inicio</Link></li>
      <li className='button-nav'><Link to="/products">Añadir producto</Link></li>
    </ul>
    </nav>
    </>
  )
}

export default Nav;