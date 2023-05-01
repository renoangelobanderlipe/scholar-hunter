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
export const downloadFile = (params) => apiSauce.get('api/scholarship/download', params);
export const submitScholarship = (params) => apiSauce.post('api/scholarship/store', params);
export const createScholarship = (params) => apiSauce.post('api/scholarship/create', params);
export const handleSearch = (params) => apiSauce.get('api/scholarship/search', params);
export const foundationScholarships = () => apiSauce.get('api/scholarship/list/scholarship');
export const approveScholar = (params) => apiSauce.post('api/scholarship/approve', params);
export const canceleScholar = (params) => apiSauce.post('api/scholarship/cancel', params);
export const editScholarship = (params) => apiSauce.put('api/scholarship/edit', params);
export const allFoundations= () => apiSauce.get('api/scholarship/foundation/list');
export const testSearchFoundation= (params) => apiSauce.get('api/scholarship/foundation/search', params);

// Foundation

export const foundationList = (params) => apiSauce.get('api/scholarship/list', params);
export const createFoundation = (params) => apiSauce.post('api/foundation/store', params);
export const foundationDestroy = (params) => apiSauce.delete('api/foundation/destroy', params);

// User Management
export const getUserList = (params) => apiSauce.get('api/user/show', params);
export const approveUser = (params) => apiSauce.post('api/user/update', params);
export const createUser = (params) => apiSauce.post('api/user/create', params);
export const destroyUser = (params) => apiSauce.delete('api/user/destroy', params);
export const unauthorizeUser = (params) => apiSauce.put('api/user/unauthorize', params);

// Application
export const appliedScholarship = () => apiSauce.get('api/application');

// Role Listener 
export const roleListener = () => apiSauce.get('api/listener');
export const authListener = (params) => apiSauce.post('api/listener/status', params);

// Home Page

/**Foundation */
export const totalApplicants = (params) => apiSauce.get('api/home/show', params);
export const totalScholarship = (params) => apiSauce.get('api/home/show/all', params);
/**Admin */
export const adminAll = () => apiSauce.get('api/home/all');
export const adminStatus = () => apiSauce.get('api/home/status');

// Logs
export const showLogs = () => apiSauce.get('api/logs');