import { useEffect, useState } from 'react';
import { Avatar, Button,Container,FormControl, Grid, InputLabel, MenuItem, Stack, Select, TextField, Typography } from '@mui/material';
import { getUserinfo, putUserInfo } from 'app/api/userService';
import DatePickerComponent from 'components/DatePicker';


const textStyle = { fontFamily: 'Roboto, sans-serif', margin: "15px 0px", fontweight: 'bold'};


const UserProfile: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    idType: '',
    idNumber: '',
    firstName: '',
    lastName: '',
    genre: '',
    birthDate: '',
    phoneNumber: '',
    country: '',
    province: '',
    city: '',
    address: '',
    email: '',
    password: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [date, setDate] = useState('');

  useEffect(() => {
    getUserinfo().then((response) => {
    setUserInfo(response);
      }).catch((error) => {
        console.error('Error getting the user info:', error);
      });
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      userInfo.birthDate = date;
      const updatedUserInfo = await putUserInfo(userInfo);
      setUserInfo(updatedUserInfo);
      setIsEditing(false);
      getUserinfo()
    } catch (error) {
      console.error('Error saving user info:', error);
    }
  };
  
  return (
    
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" style={{ width: "200px", height: "200px", padding: '10' }} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={8}>
          {isEditing ? (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  label="Nombre"
                  variant="outlined"
                  name="firstName"
                  value={userInfo.firstName}
                  onChange={handleChange}
                  fullWidth
                  style={textStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  label="Apellido"
                  variant="outlined"
                  name="lastName"
                  value={userInfo.lastName}
                  onChange={handleChange}
                  fullWidth
                  style={textStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth style={textStyle}>
                  <InputLabel>Género</InputLabel>
                  <Select
                    label="Genero"
                    name="genre"
                    value={userInfo.genre}
                    onChange={handleChange}
                  >
                    <MenuItem value="M">Masculino</MenuItem>
                    <MenuItem value="F">Femenino</MenuItem>
                    <MenuItem value="O">Prefiero no especificar</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} alignContent={"center"}>
                <DatePickerComponent fullWidth handleDateChange={setDate} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  label="Celular"
                  variant="outlined"
                  name="phoneNumber"
                  value={userInfo.phoneNumber}
                  onChange={handleChange}
                  fullWidth
                  style={textStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  label="País"
                  variant="outlined"
                  name="country"
                  value={userInfo.country}
                  onChange={handleChange}
                  fullWidth
                  style={textStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  label="Provincia"
                  variant="outlined"
                  name="province"
                  value={userInfo.province}
                  onChange={handleChange}
                  fullWidth
                  style={textStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  label="Ciudad"
                  variant="outlined"
                  name="city"
                  value={userInfo.city}
                  onChange={handleChange}
                  fullWidth
                  style={textStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  label="Dirección"
                  variant="outlined"
                  name="address"
                  value={userInfo.address}
                  onChange={handleChange}
                  fullWidth
                  style={textStyle}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ margin: '15px 0' }}
                  onClick={handleSaveClick}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          ) : (
            <>
              <Typography variant="h6" style={textStyle}>Nombre   {userInfo.firstName}</Typography>
              <Typography variant="h6" style={textStyle}>Apellido:   {userInfo.lastName}</Typography>
              <Typography variant="h6" style={textStyle}>Genero:   {userInfo.genre}</Typography>
              <Typography variant="h6" style={textStyle}>Fecha de nacimiento:   {userInfo.birthDate}</Typography>
              <Typography variant="h6" style={textStyle}>Celular:   {userInfo.phoneNumber}</Typography>
              <Typography variant="h6" style={textStyle}>Pais:   {userInfo.country}</Typography>
              <Typography variant="h6" style={textStyle}>Provincia:   {userInfo.province}</Typography>
              <Typography variant="h6" style={textStyle}>Ciudad:   {userInfo.city}</Typography>
              <Typography variant="h6" style={textStyle}>Direccion: {userInfo.address}</Typography>
              <Button
                variant="contained"
                color="primary"
                style={{ width: '100%', margin: '15px 0px' }}
                onClick={handleEditClick}
              >
                Editar
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default UserProfile;
