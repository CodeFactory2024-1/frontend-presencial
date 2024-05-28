import {Button, Box ,Stack , Typography, TextField, } from '@mui/material';
import React, { useState } from 'react';

import apiClient from 'app/api/apiClient';


const textStyle = { fontFamily: 'Roboto, sans-serif', margin: "15px 0px" };


const ChangePasswordForm: React.FC = () => {

const [password, setPassword] = useState("");
const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [confirmPasswordError, setConfirmPasswordError] = useState("")
const [passwordError, setPasswordError] = useState("")

const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
  if (!passwordRegex.test(password)) {
    setPasswordError(
      "La contraseña debe tener al menos una mayúscula, una minúscula, un número, un carácter especial (@$!%*?&) y tener entre 8 y 15 caracteres"
    )
  } else {
    setPasswordError("")
  }
}

const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setNewPassword(e.target.value);
  validatePassword(e.target.value);
  setPasswordError("");
};

const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setConfirmPassword(e.target.value);
  if (confirmPassword !== newPassword) {
    setConfirmPasswordError("Las contraseñas no coinciden")
  } else {
    setConfirmPasswordError("")
  }
};


const handleSaveClick = async()  => {

    try {
      const response = await apiClient.patch('/api/password/reset',{password, newPassword});
      return response.data;
    } catch (error) {
      console.error('Error setting the new password:', error);
      throw error;
    }
  
}

  return (
    <form onSubmit={handleSaveClick}>
    <Box>
    <Typography variant="h6" style={{ fontFamily: 'Roboto, sans-serif', margin: '15px 0px' }}>Cambiar Contraseña</Typography>
    <Stack spacing={2}>
    <TextField id="outlined-basic" 
    label="Contraseña Antigua" 
    type='password'
    variant="outlined" 
    placeholder='Ingrese la contraseña antigua' 
    style={textStyle} 
    onChange={(e) => {setPassword(e.target.value)}}
    />

    <TextField id="outlined-basic" 
    label="Contraseña Nueva" 
    variant="outlined"    
    type='password'
    placeholder = 'Ingrese la nueva contraseña'
    style={textStyle}
    onChange={handlePasswordChange}
    error={!!passwordError}
    helperText={passwordError}
     />

    <TextField
              label="Confirmar contraseña"
              placeholder="Confirmar contraseña"
              type="password"
              fullWidth
              required
              variant="outlined"
              style={{ margin: "10px auto" }}
              onChange={handleConfirmPasswordChange}
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
            />

    <Button variant="contained" color="primary" style={{ width: '100%', margin: '15px 0px' }}>Guardar </Button>
    </Stack>
    </Box>
    </form>
    
  );
};

export default ChangePasswordForm;