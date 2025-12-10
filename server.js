// server.js
const app = require('./app');



// const PORT = process.env.PORT || 8005;
const PORT = process.env.PORT || 8005;
// const HOST = "192.168.2.30";
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
