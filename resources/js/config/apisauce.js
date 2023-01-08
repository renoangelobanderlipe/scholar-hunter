import { create } from 'apisauce';


const apiSauce = create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    // 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf"]').getAttribute('content')
  },
});

// Authentication
export const register = (params) => apiSauce.post('/api/register', params);
export const login = (params) => apiSauce.post('/api/login', params);
export const logout = () => apiSauce.post('/api/logout');

// User Management
export const createUser = (params) => apiSauce.post('api/user-mamangement/create', params);

// Scholarship Management 
export const createScholarship = (params) => apiSauce.post('api/scholarship-management/create', params);

// Profile Information
export const showProfile = () => apiSauce.post('api/profile/show')
export const profileUpdate = (params) => apiSauce.post('api/profile/update');
export const updatePassword = (params) => apiSauce.post('api/profile/password-update');