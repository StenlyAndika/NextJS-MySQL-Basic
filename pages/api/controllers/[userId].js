import User from "../models/userm.js";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return await getUser(req, res);
        case "DELETE":
            return await deleteUser(req, res);
        case "PUT":
            return await updateUser(req, res);
    }
}

const getUser = async (req, res) => {
    try {
        const {userId} = req.query;
        const product = await User.findOne({
            where: {
                id: parseInt(userId)
            }
        });
        if (!product) return res.status(404).json({msg: "User Not Found..."});
        const result = await User.findOne({
            where: {
                id: parseInt(userId)
            }
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const deleteUser = async (req, res) => {
    try {
        const {userId} = req.query;
        const product = await User.findOne({
            where: {
                id: parseInt(userId)
            }
        });
        if (!product) return res.status(404).json({msg: "User Not Found..."});
        const result = await User.destroy({
            where: {
                id: parseInt(userId)
            }
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const updateUser = async (req, res) => {
    try {
        const {username, email} = req.body;
        const data = {
            username: username,
            email: email
        }
        const {userId} = req.query;
        const product = await User.findOne({
            where: {
                id: parseInt(userId)
            }
        });
        if (!product) return res.status(404).json({msg: "User Not Found..."});
        const result = await User.update(data,{
            where: {
                id: parseInt(userId)
            }
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}