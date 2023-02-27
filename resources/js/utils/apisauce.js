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

// AUTH
export const login = (params) => apiSauce.post('api/login', params)
export const register = (params) => apiSauce.post('api/register', params)
export const updateProfile = (params) => apiSauce.post('api/auth/update/profile', params)
export const logout = () => apiSauce.delete('api/auth/logout')
export const profileShow = () => apiSauce.get('api/auth/show')
export const allUsers = () => apiSauce.get('api/auth/all')
export const updatePassword = (params) => apiSauce.post('api/auth/update/password', params);

// Scholarship List
export const scholarshipList = (params) => apiSauce.get('api/scholarship/index', params);
export const scholarsList = () => apiSauce.get('api/scholarship/list/scholars');
export const destroyScholarship = (params) => apiSauce.delete('api/scholarship/destroy', params);
export const downloadFile = () => apiSauce.get('api/scholarship/download');
export const submitScholarship = (params) => apiSauce.post('api/scholarship/store', params);
export const createScholarship = (params) => apiSauce.post('api/scholarship/create', params);
export const handleSearch = (params) => apiSauce.get('api/scholarship/search', params);
export const foundationScholarships = () => apiSauce.get('api/scholarship/list/scholarship');

// Foundation

export const foundationList = (params) => apiSauce.get('api/scholarship/list', params);
export const createFoundation = (params) => apiSauce.post('api/foundation/store', params);
export const foundationDestroy = (params) => apiSauce.delete('api/foundation/destroy', params);

// HomePage
export const foundationCount = (params) => apiSauce.get('api/home/foundation', params);
export const scholarsCount = (params) => apiSauce.get('api/home/scholars', params);
export const userStatus = (params) => apiSauce.get('api/home/status', params);

// User Management
export const getUserList = (params) => apiSauce.get('api/user/show', params);
export const approveUser = (params) => apiSauce.post('api/user/update', params);
export const createUser = (params) => apiSauce.post('api/user/create', params);
export const destroyUser = (params) => apiSauce.delete('api/user/destroy', params);


// Role Listener 
export const roleListener = () => apiSauce.get('api/listener');
export const authListener = (params) => apiSauce.post('api/listener/status', params);



