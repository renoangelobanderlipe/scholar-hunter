import { create } from "apisauce";

const apiSauce = create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

export const login = (params) => apiSauce.post('api/login', params)
export const register = (params) => apiSauce.post('api/register', params)
export const logout = () => apiSauce.post('api/logout', params)