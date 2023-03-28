const path = require('path')
const uploadSingleFile = (fileObject) => {
    return new Promise(async (resolve, reject) => {
        try {
            //folder upload 'Backend-restful-api/src/public/images/uploadFiles'
            let uploadPath = path.resolve(__dirname, '../public/images/uploadFiles');
            // console.log(">>>check file:", path.resolve(__dirname, '../public/images/uploadFiles'));

            // rename image: abc.png=> abc-timeStamp.png

            //get image extension
            let extName = path.extname(fileObject.name)
            let baseName = path.basename(fileObject.name, extName)
            let finalName = `${baseName}-${Date.now()}${extName}`
            let finalPath = `${uploadPath}/${finalName}`
            // Use the mv() method to place the file somewhere on your server
            await fileObject.mv(finalPath)
            resolve({
                EC: 0,
                EM: "Succeed!",
                path: finalName
            })
        } catch (error) {
            reject(error)
        }
    })
}

const uploadMultipleFiles = (filesArr) => {
    return new Promise(async (resolve, reject) => {
        try {
            let uploadPath = path.resolve(__dirname, '../public/images/uploadFiles');
            let data = []
            let countSucceed = 0
            for (let i = 0; i < filesArr.length; i++) {
                // rename image: abc.png=> abc-timeStamp.png

                //get image extension
                let extName = path.extname(filesArr[i].name)
                let baseName = path.basename(filesArr[i].name, extName)
                let finalName = `${baseName}-${Date.now()}${extName}`
                let finalPath = `${uploadPath}/${finalName}`
                // Use the mv() method to place the file somewhere on your server
                await filesArr[i].mv(finalPath)
                data.push({
                    EC: 0,
                    EM: "Succeed!",
                    path: finalName,
                    fileName: filesArr[i].name
                })
                countSucceed++
            }
            resolve({
                EC: 0,
                EM: "Succeed!",
                data: {
                    countSucceed: countSucceed,
                    datails: data
                }
            })
        } catch (error) {
            reject({
                EC: -1,
                EM: "Failed!",
                path: null,
                fileName: filesArr[i].name,
                error: JSON.stringify(error)
            })
        }
    })
}

module.exports = {
    uploadSingleFile,
    uploadMultipleFiles,
}