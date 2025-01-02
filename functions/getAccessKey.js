exports.handler = async (event, context) => {
  // Fetch the key from the environment variables
  const accessKey = process.env.ACCESS_KEY;

  return {
    statusCode: 200,
    body: JSON.stringify({ accessKey }),
  };
};
