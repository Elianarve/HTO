import UserModel from "../models/UserModel";

export const getUser = async(req, res) => {
    try {
        const news = await UserModel.findAll();
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
}

export const createdUser = async (req, res) => {
    try {
        // const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // req.body.password = hashedPassword;
        const createdNewUser = await UserModel.create(req.body)       
        res.status(201).json(createdNewUser);
    }catch(error){
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}

export const updateUser = async (req, res) => {   
    const userId = req.params.id;
    try {
        // const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // req.body.password = hashedPassword;
        await UserModel.update(req.body,{  where: {id: userId}});
        res.status(200).json({message: ` Users: ${userId}, Successfully updated`});
    } catch(error) {
        res.status(500).json({error: 'Internal Server Error'});
    }   
}

export const getOneUser = async (req, res) =>{
    const userId = req.params.id;
    try {
        const oneUser = await UserModel.findOne({ where: { id: userId}});
        res.status(200).json(oneUser);
    } catch(error) {
        res.status(500).json({error: 'Internal Server Error'});
    }   
}

export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        await UserModel.destroy({ where: { id: userId }});
        return res.status(201).send({ message: 'User deleted successfully' });

    } catch (error) {
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};