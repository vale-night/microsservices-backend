import app from "./app";
import { initDb } from "./db";
import routes from "./routes/routes";
app.use('/auth', routes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await initDb();
  console.log(`Servidor de usuários sendo executado na porta http://localhost:${PORT}`);
});