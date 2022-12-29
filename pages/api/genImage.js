// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  organization: "org-nOLmsqIjJWNlJLFZ0UlR1ycZ",

  apiKey: process.env.NEXT_PUBLIC_OPENAI_APIKEY,
});
export default function handler(req, res) {
  if (req.method === "POST") {
    // Process a POST request
    console.log(process.env.NEXT_PUBLIC_OPENAI_APIKEY)
    const promt = req.body.prompt;
    console.log(req.body);
    const openai = new OpenAIApi(configuration);
    openai
      .createImage({
        prompt: promt,
        n: 1,
        size: "1024x1024",
      })
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(400).send({ err });
        console.log(err.message);
      });
  } else {
    // Handle any other HTTP method
  }
}
