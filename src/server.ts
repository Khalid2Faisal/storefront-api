import app from "./app";

const port: number = (process.env.PORT as unknown as number) || 8080;
const address = `http://localhost:${port}`;

app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log(`starting app on: ${address}`);
});
