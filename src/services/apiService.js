const User = require("../models/user")
const Customer = require("../models/customer")
const Project = require("../models/project")
const aqp = require('api-query-params')
const Task = require("../models/task")

const getUSers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.find({})
            resolve({
                EC: 0,
                EM: "Succeed!",
                user
            })
        } catch (error) {
            reject(error)
        }
    })
}

const createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { email, name, city } = data
            let user = await User.create({
                email,
                name,
                city,
            })
            resolve({
                EC: 0,
                EM: "Succeed!",
                user
            })
        } catch (error) {
            reject(error)
        }
    })
}

const updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { email, name, city, userId } = data

            let user = await User.updateOne({ _id: userId }, {
                email, name, city
            })
            resolve({
                EC: 0,
                EM: "Succeed!",
                user
            })
        } catch (error) {
            reject(error)
        }
    })
}

const deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.deleteOne({ _id: userId })
            resolve({
                EC: 0,
                EM: "Succeed!",
                user
            })
        } catch (error) {
            reject(error)
        }
    })
}

const checkEmailExists = (customerEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            //fine email
            let customer = await Customer.findOne({ email: customerEmail }).exec();
            if (customer) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {
    getUSers,
    createUser,
    updateUser,
    deleteUser,
    checkEmailExists,
    createCustomer: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                // console.log(">>check: ", data);
                let { name, email, phone, address, description, image } = data
                let check = await checkEmailExists(email)
                if (check === true) {
                    resolve({
                        EC: 1,
                        EM: "your email already exists. pleaser enter another email!"
                    })
                } else {
                    let result = await Customer.create({
                        name, email, phone, address, image, description
                    })
                    resolve({
                        EC: 0,
                        EM: "Succeed!",
                        data: result
                    })
                }
            } catch (error) {
                reject({
                    EC: -1,
                    EM: error.message
                })
            }
        })
    },
    createArrayCustomer: (array) => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await Customer.insertMany(array)
                resolve({
                    EC: 0,
                    EM: "Succeed!",
                    data: result
                })
            } catch (error) {
                reject({
                    EC: -1,
                    EM: error.message
                })
            }
        })
    },
    getCustomers: (limit, page, queryString) => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = null
                if (limit && page) {
                    // skip
                    let offset = (page - 1) * limit
                    const { filter } = aqp(queryString);
                    delete filter.page
                    console.log("filter: ", filter);
                    result = await Customer.find(filter).skip(offset).limit(limit).exec()
                } else {
                    result = await Customer.find({})
                }
                resolve({
                    EC: 0,
                    EM: "Succeed!",
                    data: result
                })
            } catch (error) {
                reject({
                    EC: -1,
                    EM: error.message
                })
            }
        })
    },
    updateCustomer: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                let { id, name, email, address, description, phone } = data
                let result = await Customer.updateOne({ _id: id }, { name, email, address, description, phone })
                resolve({
                    EC: 0,
                    EM: "Succeed!",
                    data: result
                })
            } catch (error) {
                reject({
                    EC: -1,
                    EM: error.message
                })
            }
        })
    },
    deleteCustomer: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await Customer.deleteById(id)
                resolve({
                    EC: 0,
                    EM: "Succeed!",
                    data: result
                })
            } catch (error) {
                reject({
                    EC: -1,
                    EM: error.message
                })
            }
        })
    },
    deleteArrayCustomers: (arrayId) => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await Customer.delete({ _id: { $in: arrayId } })
                resolve({
                    EC: 0,
                    EM: "Succeed!",
                    data: result
                })
            } catch (error) {
                reject({
                    EC: -1,
                    EM: error.message
                })
            }
        })
    },
    createProjects: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = null
                if (data.type === "EMPTY-PROJECT") {
                    result = await Project.create(data)
                }
                if (data.type === "ADD-USERS") {
                    let findProject = await Project.findById(data.projectId).exec()
                    let check = true
                    for (let i = 0; i < data.usersArr.length; i++) {
                        if (findProject.usersInfor.indexOf(data.usersArr[i]) === -1) {
                            findProject.usersInfor.push(data.usersArr[i])
                            check = false
                        }
                    }
                    if (check) {
                        resolve({
                            EC: 0,
                            EM: "UserArr isExist!"
                        })
                    }
                    result = await findProject.save()
                    console.log(findProject);
                }
                if (data.type === "REMOVE-USERS") {
                    let findProject = await Project.findById(data.projectId).exec()
                    for (let i = 0; i < data.usersArr.length; i++) {
                        findProject.usersInfor.pull(data.usersArr[i])
                    }
                    result = await findProject.save()
                }
                if (data.type === "ADD-TASKS") {
                    let findProject = await Project.findById(data.projectId).exec()
                    for (let i = 0; i < data.taskArr.length; i++) {
                        findProject.tasks.push(data.taskArr[i])
                    }
                    result = await findProject.save()

                    // console.log(findProject);
                }
                resolve({
                    EC: 0,
                    EM: "Succeed!",
                    data: result
                })
            } catch (error) {
                reject({
                    EC: -1,
                    EM: error.message
                })
            }
        })
    },
    getProjects: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { filter, limit, population } = aqp(data);
                let page = data.page
                let offset = (page - 1) * limit
                delete filter.page
                // console.log("filter: ", filter);
                let result = await Project.find(filter)
                    // chuyển userId thành userInfor
                    .populate(population)
                    // bỏ qua "offset" phần tử
                    .skip(offset)
                    //lấy "limit" phần tử
                    .limit(limit).exec()
                resolve({
                    EC: 0,
                    EM: "Succeed!",
                    data: result
                })
            } catch (error) {
                reject({
                    EC: -1,
                    EM: error.message
                })
            }
        })
    },
    deleteProjects: (projectId) => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await Project.delete({ _id: projectId })
                resolve({
                    EC: 0,
                    EM: "Succeed!",
                    data: result
                })
            } catch (error) {
                reject({
                    EC: -1,
                    EM: error.message
                })
            }
        })
    },
    updateProjects: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                let { id, name, description, endDate } = data
                let result = await Project.updateOne({ _id: id }, { name, description, endDate })
                resolve({
                    EC: 0,
                    EM: "Succeed!",
                    data: result
                })
            } catch (error) {
                reject({
                    EC: -1,
                    EM: error.message
                })
            }
        })
    },
    //task
    createTask: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = null
                if (data.type === "EMPTY-TASK") {
                    result = await Task.create(data)
                }
                resolve({
                    EC: 0,
                    EM: "Succeed!",
                    data: result
                })
            } catch (error) {
                reject({
                    EC: -1,
                    EM: error.message
                })
            }
        })
    },
    getTasks: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { filter, limit } = aqp(data);
                let page = data.page
                let offset = (page - 1) * limit
                delete filter.page
                // console.log("filter: ", filter);
                let result = await Task.find(filter)
                    // chuyển userId thành userInfor
                    // .populate(population)
                    // bỏ qua "offset" phần tử
                    .skip(offset)
                    //lấy "limit" phần tử
                    .limit(limit).exec()
                resolve({
                    EC: 0,
                    EM: "Succeed!",
                    data: result
                })
            } catch (error) {
                reject({
                    EC: -1,
                    EM: error.message
                })
            }
        })
    },
    deleteTasks: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await Task.delete({ _id: id })
                resolve({
                    EC: 0,
                    EM: "Succeed!",
                    data: result
                })
            } catch (error) {
                reject({
                    EC: -1,
                    EM: error.message
                })
            }
        })
    },
    updateTasks: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                // let { id, name, description, endDate, startDate, status } = data
                let result = await Task.updateOne({ _id: data.id }, { ...data })
                resolve({
                    EC: 0,
                    EM: "Succeed!",
                    data: result
                })
            } catch (error) {
                reject({
                    EC: -1,
                    EM: error.message
                })
            }
        })
    },
}