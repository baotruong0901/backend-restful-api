const apiService = require("../services/apiService");

module.exports = {
    postCreateTask: async (req, res) => {
        try {
            let result = await apiService.createTask(req.body)
            return res.status(200).json(result)
        } catch (error) {
            console.log(error);
        }
    },
    getTasks: async (req, res) => {
        try {
            let result = await apiService.getTasks(req.query)
            return res.status(200).json(result)
        } catch (error) {
            console.log(error);
        }
    },
    deleteTasks: async (req, res) => {
        try {
            let id = req.body.id
            let result = await apiService.deleteTasks(id)
            return res.status(200).json(result)
        } catch (error) {
            console.log(error);
        }
    },
    updateTasks: async (req, res) => {
        try {
            let result = await apiService.updateTasks(req.body)
            return res.status(200).json(result)
        } catch (error) {
            console.log(error);
        }
    },
}