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

  await fetch("https://kitco-gcdn-prod.stellate.sh/", {
    headers: {
      accept: "*/*",
      "accept-language": "en,ru;q=0.9,en-US;q=0.8,ka;q=0.7",
      "cache-control": "no-cache",
      "content-type": "application/json",
      pragma: "no-cache",
      "sec-ch-ua":
        '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "x-query-id":
        '{"query":"MetalFragment","variables":{"timestamp":1711814610,"currency":"USD"}}',
    },
    referrer: "https://www.kitco.com/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: '{"query":"fragment MetalFragment on Metal { ID symbol currency name results { ...MetalQuoteFragment } } fragment MetalQuoteFragment on Quote { ID timestamp high low open close ask bid mid originalTime change changePercentage unit } query AllMetalsQuote($currency: String!, $timestamp: Int) { gold: GetMetalQuote( symbol: \\"AU\\" timestamp: $timestamp currency: $currency ) { ...MetalFragment } silver: GetMetalQuote( symbol: \\"AG\\" timestamp: $timestamp currency: $currency ) { ...MetalFragment } platinum: GetMetalQuote( symbol: \\"PT\\" timestamp: $timestamp currency: $currency ) { ...MetalFragment } palladium: GetMetalQuote( symbol: \\"PD\\" timestamp: $timestamp currency: $currency ) { ...MetalFragment } rhodium: GetMetalQuote( symbol: \\"RH\\" timestamp: $timestamp currency: $currency ) { ...MetalFragment } }","variables":{"timestamp":1711814610,"currency":"USD"}}',
    method: "POST",
    mode: "cors",
    credentials: "omit",
  }).then((res) => console.log(res));

  // If something goes wrong, log an error
  error("Hello, Errors!");

  // The `req` object contains the request data
  if (req.method === "GET") {
    // Send a response with the res object helpers
    // `res.send()` dispatches a string back to the client
    return res.send("Hello, World!");
  }

  // `res.json()` is a handy helper for sending JSON
  return res.json({
    motto: "Build like a team of hundreds_",
    learn: "https://appwrite.io/docs",
    connect: "https://appwrite.io/discord",
    getInspired: "https://builtwith.appwrite.io",
  });
};
