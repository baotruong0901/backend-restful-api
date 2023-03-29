const apiService = require("../services/apiService");

module.exports = {
    postProjects: async (req, res) => {
        try {
            let result = await apiService.createProjects(req.body)
            return res.status(200).json(result)
        } catch (error) {
            console.log(error);
        }
    },
    getProjects: async (req, res) => {
        try {
            let result = await apiService.getProjects(req.query)
            return res.status(200).json(result)
        } catch (error) {
            console.log(error);
        }
    },
    deleteProjects: async (req, res) => {
        try {
            let id = req.body.id
            let result = await apiService.deleteProjects(id)
            return res.status(200).json(result)
        } catch (error) {
            console.log(error);
        }
    },
    updateProjects: async (req, res) => {
        try {
            let result = await apiService.updateProjects(req.body)
            return res.status(200).json(result)
        } catch (error) {
            console.log(error);
        }
    },
}