import axios from "axios";
import Swal from 'sweetalert2';

// const URL = 'http://localhost:5000/product';
const URL = 'https://hto-mvbs.onrender.com/product';

export const getProducts = async () => {
    try {
        const response = await axios.get(`${URL}`);
        const data = await response.data
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getOneProduct = async (id) => {
    try {
        const response = await axios.get(`${URL}/${id}`);
        return response;
    } catch (error) {
        console.error("Error", error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const confirmDelete = await Swal.fire({
            title: '¿Estás seguro que deseas borrar el producto?',
            showCancelButton: true,
            confirmButtonColor: '#FA6649',
            cancelButtonColor: '#171717',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (confirmDelete.isConfirmed) {
            const response = await axios.delete(`${URL}/${id}`);
            if (response.status === 200) {
                Swal.fire('Eliminado correctamente');
            }
        }
    } catch (error) {
        console.error("Error al eliminar", error);
        throw error;
    }
};

export const postProduct = async (data) => {
    const response = await axios.post(URL, data);
    return response;
  }

export const updateProduct = async (id, data) => {
    try {
        const response = await axios.put(`${URL}/${id}`,data);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error("Error", error);
        throw error;
    }
};

