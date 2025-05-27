import { app } from "./infra/server";

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 HTTP Server running on http://localhost:${PORT}`);
});
