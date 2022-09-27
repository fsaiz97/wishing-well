const { app, } = require("./app")

const port = 3000; // default port

// Start the server listening
app.listen(port, () => console.log(`Server now listening on port ${port}...`));
