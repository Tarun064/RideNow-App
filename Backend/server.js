const http = require('http');   
const app = require('./app');
const port = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(4000,()=>{ // hardcoded theserver because it is not accessing from process.env.PORT have to check it
    console.log(`Server is running on port ${port}`);
});

server.on("error", (error) => {
    console.error("Server Error:", error);
    process.exit(1); // Exit the process if there's an unrecoverable error
  });