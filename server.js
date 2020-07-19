const http = require('http');
const app = require('./Backend/app');
const port = process.env.PORT || '3000';

// app.set('port',port);
// const server = http.createServer(app);

// server.listen(port,()=>{

//     console.log(`Example app listening at http://localhost:${port}`);



// });

let apps = http.createServer(app);


apps.listen(port);
console.log('Node server running on port 3000');