//模拟后台的响应接口
module.exports = {
    "GET /api/product": (req, res) => {
        const params = req.query;
        console.log(params);
        res.send({ "name": "高粱" })
    }
}