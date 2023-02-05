import { create } from "apisauce";

const apiSauce = create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    // 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    // 'Authorization' :'Bearer 3|GxQRAQv8kTSYunjVMjEZiXRVlwpwnFQYCXoN3H5F'
  },
  withCredentials: true,
});

export const sanctum = () => apiSauce.get('sanctum/csrf-cookie');

// AUTH
export const login = (params) => apiSauce.post('api/login', params)
export const register = (params) => apiSauce.post('api/register', params)
export const updateProfile = (params) => apiSauce.post('api/auth/update/profile', params)
export const profileShow = () => apiSauce.get('api/auth/show')
export const logout = () => apiSauce.post('api/logout', params)
export const updatePassword = (params) => apiSauce.post('api/auth/update/password', params);

export const getUserList = (params) => apiSauce.get('api/user/show', params);


