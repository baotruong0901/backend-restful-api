const User = require("../models/user")
const apiService = require("../services/apiService")
const fileService = require("../services/fileService")
const getAllUser = async (req, res) => {
    let users = await apiService.getUSers()
    return res.status(200).json(users)
}

const postCreateUser = async (req, res) => {
    let user = await apiService.createUser(req.body)

    return res.status(200).json(user)
}
const putUpdateUser = async (req, res) => {
    let user = await apiService.updateUser(req.body)
    return res.status(200).json(user)
}

const deleteUser = async (req, res) => {
    let user = await apiService.deleteUser(req.body.userId)
    return res.status(200).json(user)
}

const postUploadSingleFile = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            EC: 1,
            EM: "No files were uploaded.'"
        });
    }
    //object {}
    let data = await fileService.uploadSingleFile(req.files.image)
    return res.status(200).json(data)
}

const postUploadMultipleFiles = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            EC: 1,
            EM: "No files were uploaded.'"
        });
    }
    // array []
    if (Array.isArray(req.files.image)) {
        //upload []
        let data = await fileService.uploadMultipleFiles(req.files.image)
        return res.status(200).json(data)
    } else {
        //upload {}
        return await postUploadSingleFile(req, res)
    }

}

module.exports = {
    getAllUser,
    postCreateUser,
    putUpdateUser,
    deleteUser,
    postUploadSingleFile,
    postUploadMultipleFiles,

}