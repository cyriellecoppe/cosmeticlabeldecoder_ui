'use strict'

import fs from 'fs'
import path from 'path'

const fixturesPath = path.join(__dirname, 'fixtures')


export default function readJSONFile(fileNameJSON) {
    let filePath = path.join(fixturesPath, fileNameJSON)
    let res = new Promise(function (resolve, reject) {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    console.error('File does not exist')
                    reject(err)
                }
                throw err
            }
            let fixture = JSON.parse(data)
            resolve(fixture)
        })
    })
    return res
}
