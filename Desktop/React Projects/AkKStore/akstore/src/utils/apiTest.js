// Quick API test utility

const API_BASE_URL = 'https://zikohost.bsite.net/';

export const testApiConnection = async () => {
  try {
    console.log('Testing API connection...');
    
    const response = await fetch(`${API_BASE_URL}/Customer/Login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'testpassword'
      })
    });

    console.log('API Response Status:', response.status);
    console.log('API Response Headers:', response.headers);
    
    const responseText = await response.text();
    console.log('API Response Body:', responseText);
    
    return {
      status: response.status,
      statusText: response.statusText,
      body: responseText
    };
  } catch (error) {
    console.error('API Connection Error:', error);
    return { error: error.message };
  }
};
