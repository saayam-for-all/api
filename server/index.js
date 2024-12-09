exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
  };

  try {
    const body = event.body ? JSON.parse(event.body) : {};

    return {
      statusCode: 200, 
      headers,      
      body: JSON.stringify({
        message: 'API is working',
        path: event.path,
        method: event.httpMethod,
        data: body  
      })
    };
  } catch (error) {

    return {
      statusCode: 500, 
      headers,       
      body: JSON.stringify({ error: error.message })
    };
  }
};
