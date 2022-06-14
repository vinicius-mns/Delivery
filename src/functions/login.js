export const validateLogin = (email, password) => {
  const minLenPass = 6;
  const regex = /\S+@\S+\.\S+/;
  return !(password.length >= minLenPass && regex.test(email));
};

export const a = () => 1;
