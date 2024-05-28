import apiClient from './apiClient';
import { User,UserRole } from './types';


export const resetPassword = async (newPassword:string, currentPassword:string) => {
  try {
    const response = await apiClient.patch('/api/password/reset',{currentPassword, newPassword});
    return response.data;
  } catch (error) {
    console.error('Error setting the new password:', error);
    throw error;
  }
};


export const getUsersRoles = async () : Promise<UserRole[]>=> {

  try {
    const response = await apiClient.get('/api/usersroles');
    return response.data;
  } catch (error) {
    console.error('Error getting the Users roles list', error);
    throw error;
  }
}

export const updateRole = async (personId: number, roleIds:any) => {
  try { 
    const response = await apiClient.patch(`/api/usersroles/${personId}`,roleIds);
    return response.data;
  } catch (error) {
    console.error('Error updating the user role:', error);
    throw error;
  }
};


export const getUserinfo = async () => {
  try {
    const response = await apiClient.get("/api/userinfo");
    return response.data;
  } catch (error) {
    console.error('Error getting the user info:', error);
    throw error;
  }
}

export const registerUser = async (user: User) => {
  try {
    const response = await apiClient.post('/api/register', user);
    return response.data;
  } catch (error) {
    console.error('Error registering the user:', error);
    throw error;
  }
}

export const googleLogin = async (tokenId: any) => {
  try {
    const response = await apiClient.post('/api/login/google', { tokenId });
    return response.data;
  } catch (error) {
    console.error('Error with Google login:', error);
    throw error;
  }
}

export const login = async (email:string, password: string) => {
  try {
    const response = await apiClient.post('/api/login', {email: email, password: password});
    return response.data;
  } catch (error) {
    console.error('Error with login:', error);
    throw error;
  }
}

export const putUserInfo = async (userInfo:any) => {
  try {
    const response = await apiClient.put('/api/userinfo', JSON.stringify(userInfo));
    return response.data;
  } catch (error) {
    console.error('Error updating the user info:', error);
    throw error;
  }
}



