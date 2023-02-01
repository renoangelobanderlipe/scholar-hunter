import { create } from "apisauce";

const apiSauce = create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    // 'Authorization' :'Bearer 3|GxQRAQv8kTSYunjVMjEZiXRVlwpwnFQYCXoN3H5F'
  },
  withCredentials: true,
});

export const sanctum = () => apiSauce.get('sanctum/csrf-cookie');

export const login = (params) => apiSauce.post('api/login', params)
export const register = (params) => apiSauce.post('api/register', params)
export const logout = () => apiSauce.post('api/logout', params)

export const checkRoleUpdate = () => apiSauce.get('api/role/check');
