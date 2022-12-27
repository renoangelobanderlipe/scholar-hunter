import { create } from 'apisauce';


const apiSauce = create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    // 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  }
});


// Authentication
export const login = (params) => apiSauce.post('/api/login', params);
export const logout= (params) => apiSauce.post('/api/logout');

