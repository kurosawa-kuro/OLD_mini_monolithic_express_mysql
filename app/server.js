const printRoutes = require("express-list-endpoints");

const app = require('.')

app.listen(3000, () => {
    console.log('Server up on http://localhost:3000')
    // console.log(printRoutes(app));
});