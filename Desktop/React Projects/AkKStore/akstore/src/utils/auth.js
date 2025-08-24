// Authentication

const API_BASE_URL = 'https://zikohost.bsite.net';

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const getUserEmail = () => {
  return localStorage.getItem('userEmail');
};

export const getUserName = () => {
  const email = getUserEmail();
  if (!email) return null;
  return email.split('@')[0];
};

export const setUserInfo = (email, token) => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('userEmail', email);
};

export const isLoggedIn = () => {
  const token = getAuthToken();
  return token !== null;
};

export const isAdmin = () => {
  const email = getUserEmail();
  return email === 'Admin@Admin.Admin';
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('keepLoggedIn');
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Customer/Login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Mail: email,  
        Password: password
      })
    });

    if (!response.ok) {
      const errorText = await response.text();

      if (response.status === 401) {
        throw new Error('Invalid email or password');
      } else if (response.status === 404) {
        throw new Error('User not found');
      } else {
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.message || `Login failed (${response.status}): ${errorText}`);
        } catch (parseError) {
          throw new Error(`Login failed (${response.status}): ${errorText}`);
        }
      }
    }

    const responseText = await response.text();
    if (!responseText || responseText.trim() === '') {
      throw new Error('No response data received from server');
    }
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      if (responseText.startsWith('eyJ')) {
        data = { token: responseText };
      } else {
        throw new Error('Invalid response format from server');
      }
    }
    if (!data || !data.token) {
      throw new Error('No authentication token received from server');
    }
    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Server problem, please try again');
    }
    if (error.message.includes('NetworkError') || 
        error.message.includes('Failed to fetch') || 
        error.message.includes('CORS') ||
        error.message.includes('ERR_NETWORK') ||
        error.message.includes('ERR_INTERNET_DISCONNECTED')) {
      throw new Error('Server problem, please try again');
    }
    throw error;
  }
};

export const signupUser = async (email, password, subscribe = false) => {
  try {
    
    const response = await fetch(`${API_BASE_URL}/Customer/AddNewCustomer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Mail: email,
        Password: password, 
        Subscribe: subscribe 
      })
    });


    if (!response.ok) {
      const errorText = await response.text();
      
      try {
        const errorData = JSON.parse(errorText);
        throw new Error(errorData.message || `Signup failed (${response.status}): ${errorText}`);
      } catch (parseError) {
        throw new Error(`Signup failed (${response.status}): ${errorText}`);
      }
    }

    const responseText = await response.text();
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      if (responseText.startsWith('eyJ')) {
        data = { token: responseText };
      } else {
        throw new Error('Invalid response format');
      }
    }

    return data;
    
  } catch (error) {
    throw error;
  }
};

export const authenticatedFetch = async (url, options = {}) => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No auth token found');
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers
  };

  return fetch(url, {
    ...options,
    headers
  });
};

export const validateToken = async () => {
  const token = getAuthToken();
  if (!token) return false;

  try {
    return true;
  } catch (error) {
    logout();
    return false;
  }
};

export const placeOrder = async (productIds) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('You must be logged in to place an order');
    }

    const orderData = productIds.map(id => parseInt(id));

    let response;
    try {
      response = await fetch(`${API_BASE_URL}/Customer/SetOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });
    } catch (error) {
      throw new Error('Failed to place order');
    }

    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 401) {
        throw new Error('Please login again to place your order');
      }
      throw new Error(errorText);
    }

    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { message: responseText, success: true };
    }
    return data;
  } catch (error) {
    console.error('Order error:', error);
    throw error;
  }
};
