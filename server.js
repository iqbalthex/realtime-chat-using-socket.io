const app = require("express")();
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

app.set("views", "views");
app.set("view engine", "ejs");


app.get('/', (req, res) => {
  const data = { title: "Realtime Chat" };
  res.render("chat", data);
});


io.on("connection", socket => {
  socket.on("send", data => {
    socket.broadcast.emit("send", data);
  })
});


server.listen(8000, _ => {
  console.log("Server on, listening on https://localhost:8000 ...");
});
