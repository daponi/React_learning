// export default {
//     ...require("./mock/product")
// };

import fs from 'fs';
import path from 'path';

//读取mock文件夹里的网络请求    
const mock = {}
fs.readdirSync(path.join(__dirname + '/mock')).forEach(function (file) {
    if (file.match(/\.js$/)) {
        Object.assign(mock, require('./mock/' + file))
    }
})
export default mock