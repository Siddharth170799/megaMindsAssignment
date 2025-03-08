// validations.js

// Function to validate name (Min 3 letters, only alphabets & spaces)
export const validateName = (name) => {
    return /^[A-Za-z\s]{3,}$/.test(name);
  };
  
  // Function to validate email (Standard email format)
  export const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  // Function to validate password (Min 8 chars, 1 letter, 1 number, 1 special char)
  export const validatePassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };
  