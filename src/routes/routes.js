const defaultHandler = require('../handlers/defaultHandler');
const getApiHandler = require('../handlers/getApiHandler');
const searchApiHandler = require('../handlers/searchApiHandler');


const routes = (router) => {
    // Default route
    router.get('/', function(req, res) {
        const result = defaultHandler.defaultPage();
        res.send(result);
    });
    // GET API
    router.get('/get/:page', async function(req, res) {
        const result = await getApiHandler.getPage(req.params.page);
        console.log("GET Final result", result);
        res.send(result);
    });
    // SEARCH API
    router.get('/search/:string', async function(req, res) {
        const result = await searchApiHandler.search(req.params.string);
        console.log("SEARCH Final result", result);
        res.send(result);
    });
}

module.exports = routes;
