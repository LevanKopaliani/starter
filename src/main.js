import { Client } from "node-appwrite";

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  // Why not try the Appwrite SDK?
  //
  // const client = new Client()
  //    .setEndpoint('https://cloud.appwrite.io/v1')
  //    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
  //    .setKey(process.env.APPWRITE_API_KEY);

  // You can log messages to the console
  log("Hello, Logs!");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const graphql = JSON.stringify({
    query:
      'fragment MetalFragment on Metal { ID symbol currency name results { ...MetalQuoteFragment } } fragment MetalQuoteFragment on Quote { ID timestamp high low open close ask bid mid originalTime change changePercentage unit } query AllMetalsQuote($currency: String!, $timestamp: Int) { gold: GetMetalQuote( symbol: "AU" timestamp: $timestamp currency: $currency ) { ...MetalFragment } silver: GetMetalQuote( symbol: "AG" timestamp: $timestamp currency: $currency ) { ...MetalFragment } platinum: GetMetalQuote( symbol: "PT" timestamp: $timestamp currency: $currency ) { ...MetalFragment } palladium: GetMetalQuote( symbol: "PD" timestamp: $timestamp currency: $currency ) { ...MetalFragment } rhodium: GetMetalQuote( symbol: "RH" timestamp: $timestamp currency: $currency ) { ...MetalFragment } }',
    variables: { currency: "USD", unit: "GRAMM" },
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
    redirect: "follow",
  };

  const rame = await fetch(
    "https://kitco-gcdn-prod.stellate.sh/",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

  // If something goes wrong, log an error
  error("Hello, Errors!");

  // The `req` object contains the request data
  if (req.method === "GET") {
    // Send a response with the res object helpers
    // `res.send()` dispatches a string back to the client
    res.send(rame);
    return res.send("Hello, World!");
  }

  // `res.json()` is a handy helper for sending JSON
  // return res.json({
  //   motto: "Build like a team of hundreds_",
  //   learn: "https://appwrite.io/docs",
  //   connect: "https://appwrite.io/discord",
  //   getInspired: "https://builtwith.appwrite.io",
  // });
};
