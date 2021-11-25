import app from "./app";
import routes from "./routes/routes";
app.use('/auth', routes);
const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
  console.log(`Servidor de autenticação sendo executado na porta http://localhost:${PORT}`);
});