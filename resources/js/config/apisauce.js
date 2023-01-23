import { create } from 'apisauce';

const apiSauce = create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  },
});

export const sanctum = () => apiSauce.get('sanctum/csrf-cookie');
// Authentication
export const register = (params) => apiSauce.post('/api/register', params);
export const login = (params) => apiSauce.post('/api/login', params);
export const logout = () => apiSauce.post('/api/logout');

// User Management
export const createUser = (params) => apiSauce.post('api/user-management/store', params);
export const fetchUsers = () => apiSauce.get('api/user-management/list')
export const getUsers = (params) => apiSauce.get('api/user-management/listId', params);
export const deleteUser = (params) => apiSauce.delete('api/user-management/delete', params)

// Scholarship Management 
export const createScholarship = (params) => apiSauce.post('api/scholarship-management/create', params);
export const scholarshipList = () => apiSauce.get('api/scholarship-management/list');

// Profile Information
export const showProfile = () => apiSauce.post('api/profile/show')
export const profileUpdate = (params) => apiSauce.post('api/profile/update');
export const updatePassword = (params) => apiSauce.post('api/profile/password-update');
