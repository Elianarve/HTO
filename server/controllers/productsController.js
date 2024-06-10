import ProductsModel from "../models/productsModel.js";
import searchModel from "../helpers/searchHelper.js";

export const getProducts = async(req, res) => {
    try {
        const products = await ProductsModel.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error: error + 'Internal Server Error'});
    }
}

export const deleteProducts = async (req, res) => {
    const productId = req.params.id;
    try {
        await ProductsModel.destroy({ where: { id: productId }});
        return res.status(200).send({ message: 'Deleted successfully' });

    } catch (error) {
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};

export const createdProducts = async (req, res) => {
    try {
        const createdNewProduct = await ProductsModel.create(req.body);       
        res.status(201).json(createdNewProduct);
    } catch(error){
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}

export const updateProducts = async (req, res) => {   
    const productId = req.params.id;
    try {
        await ProductsModel.update(req.body,{  where: {id: productId}});
        res.status(200).json({message: `${productId}, Successfully updated`});
    } catch(error) {
        res.status(500).json({error: 'Internal Server Error'});
    }   
}

export const getOneProducts = async (req, res) =>{
    const productId = req.params.id;
    try {
        const products = await ProductsModel.findOne({ where: { id: productId}});
        res.status(200).json(products);
    } catch(error) {
        res.status(500).json({error: 'Internal Server Error'});
    }   
}

export const searchProducts = async (req, res) => {
    const searchText = req.query.searchText;
    try {
        const searchResults = await searchModel(ProductsModel, 'name', 'description', searchText);
        res.json(searchResults);
    } catch (error) {
        console.error('Error al buscar :', error);
        res.status(500).json({ error: 'Error al buscar' });
    }
};