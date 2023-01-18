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

// Scholarship Type
export const showScholarshipType = () => apiSauce.post('api/scholarship-management/index');
export const storeScholarshipType = (params) => apiSauce.post('api/scholarship-management/store');

// Scholarship Management 
export const createScholarship = (params) => apiSauce.post('api/scholarship-management/create', params);

// Profile Information
export const showProfile = () => apiSauce.post('api/profile/show')
export const profileUpdate = (params) => apiSauce.post('api/profile/update');
export const updatePassword = (params) => apiSauce.post('api/profile/password-update');


/* Config */

  //Course 
export const courseShow = () => apiSauce.get('api/course/show');
export const courseStore = () => apiSauce.get('api/course/store');

  //Degree 
export const degreeShow = () => apiSauce.get('api/degree/show');
export const degreeStore = () => apiSauce.get('api/degree/store');

  //AccountType 
export const accountTypeShow = () => apiSauce.get('api/account-type/show');
export const accountTypeStore = () => apiSauce.get('api/account-type/store');

