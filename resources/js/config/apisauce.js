import { create } from 'apisauce';

const apiSauce = create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    // 'XSRF-TOKEN': "eyJpdiI6Ing0eFY3c1E0VXZqMnBKc0VYRHkzK0E9PSIsInZhbHVlIjoibmZmNzRTQzQ2Ylc5NEcxUDJUYnVZa25IbkYyQmlHRU0yUjhwdkQyMVpaeUpRaWNaTUI2cW5MNHlVSnN0REJtVDhEVExSYkRaOW5SYmg3dUJtZWZTT1FCdUYwMUVtYi9reVUwZG9rNlhiVlVMYytCbkFyZUhOQlJUVno5RUxuTzEiLCJtYWMiOiIzMmM1NmYyNTM1MDkyODYxOThlYTk4ZDdlYzIwZWMxMjE5NWVjOGIzOGEwMzUxODFhMmUzNGMzZmFmMDFlZGI4IiwidGFnIjoiIn0%3D"
  },
  withCredentials: true,
});

// console.log(document.querySelector('meta[name="csrf-token"]').getAttribute('content'));
// 'Authorization': `Bearer 3|fuBImk5pZq5zvXj6592npLZWnoXt6JkcsyTWTd84`

export const sanctum = () => apiSauce.get('sanctum/csrf-cookie');
// Authentication
export const register = (params) => apiSauce.post('/api/register', params);
export const login = (params) => apiSauce.post('/api/login', params);
export const logout = () => apiSauce.post('/api/logout');

// Check User Role
export const validateUser = () => apiSauce.get('api/users/')

// User Management
export const createUser = (params) => apiSauce.post('api/user-management/store', params);
export const fetchUsers = () => apiSauce.get('api/user-management/list')
export const getUsers = (params) => apiSauce.get('api/user-management/listId', params);
export const deleteUser = (params) => apiSauce.delete('api/user-management/delete', params)
export const approve = (params) => apiSauce.put('api/user-management/approve', params)

// Scholarship Management 
export const createScholarship = (params) => apiSauce.post('api/scholarship-management/create', params);
export const scholarshipList = () => apiSauce.get('api/scholarships');
export const scholarshipListPage = (params) => apiSauce.get('api/scholarships', params);

// Profile Information
export const showProfile = () => apiSauce.post('api/profile/show')
export const profileUpdate = (params) => apiSauce.post('api/profile/update');
export const updatePassword = (params) => apiSauce.post('api/profile/password-update');
