const User = require("../models/user")
const Customer = require("../models/customer")
const aqp = require('api-query-params')

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
}