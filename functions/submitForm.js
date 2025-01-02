const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body);

    // Use your access key securely from environment variables
    const accessKey = process.env.ACCESS_KEY;

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, access_key: accessKey }),
    });

    const result = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error("Error submitting form:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
