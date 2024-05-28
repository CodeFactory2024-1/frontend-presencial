"use client"
import { Avatar,Button, Container,FormControl, Grid,InputLabel, Link,MenuItem,Select, TextField, Typography} from "@mui/material"
import { blue } from "@mui/material/colors"
import React, { useEffect, useState } from "react"
import { User } from "app/api/types"
import { registerUser } from "app/api/userService"
import DatePickerComponent from "components/DatePicker"

import facebook from "../../assets/asset-facebook.png"
import github from "../../assets/asset-github.png"
import google from "../../assets/asset-google.png"


export default function Signin() {
  const [idNumber, setIdNumber] = useState("")
  const [idNumberError, setIdNumberError] = useState("")
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [nameError, setNameError] = useState("")
  const [lastNameError, setLastNameError] = useState("")
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const [idType, setIdType] = useState("")
  const [date, setDate] = useState("")
  const [gender, setGender] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [country, setCountry] = useState("")
  const [province, setProvince] = useState("")
  const [city, setCity] = useState("")
  const [address, setAddress] = useState("")
  const [isValid, setIsValid] = useState(false)


  /**
   * Estilo del contenedor principal.
   * @type {Object}
   */
  const paperStyle = { padding: 20, height: "70vh", width: "50%", margin: "7% auto" }

  /**
   * Estilo de los campos de entrada.
   * @type {Object}
   */
  const inputs = { margin: "10px auto" }

  /**
   * Estilo del enlace de inicio de sesión.
   * @type {Object}
   */
  const login = { marginTop: "20%" }

  /**
   * Estilo del fondo azul.
   * @type {Object}
   */

  /**
   * Estilo del título.
   * @type {Object}
   */
  const title = { textAlign: "center", fontWeight: "bold", marginBottom: "20px" }

  /**
   * Estilo de la imagen del avión.
   * @type {Object}
   */

  /**
   * Valida el formato del correo electrónico.
   */
  const validateEmail = (email: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!isValid) {
      setEmailError("Correo electrónico inválido")
    } else {
      setEmailError("")
    }
  }

  /**
   * Valida la fortaleza de la contraseña.
   * @param {string} password - Contraseña a validar.
   */
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

  /**
   * Valida que la contraseña coincida con la confirmación.
   * @param {string} confirmPassword - Confirmación de la contraseña.
   */
  const validateConfirmPassword = (confirmPassword: string) => {
    if (confirmPassword !== password) {
      setConfirmPasswordError("Las contraseñas no coinciden")
    } else {
      setConfirmPasswordError("")
    }
  }

  
  const handleIdNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const regex = /^\d+$/
    if (regex.test(value)) {
      //Si el valor del TextField es un número, se setea en el estado y permite registrar el formulario
      console.log("El valor ingresado es un número")
      setIdNumber(value)
      setIdNumberError("")
    } else {
      setIdNumberError("El valor ingresado no es un número")
    }
  }
  
  /**
   * Maneja el cambio en el campo de nombre completo.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio en el campo.
  */
 const handleNameChange = (e:any) => {
   const value = e.target.value
   console.log("El valor ingresado es:", value)
   if (!value) {
     setNameError("Este campo es obligatorioaaa")
    } else if (value.length > 3) {
      setName(value)
      setNameError("")
    }
  }
  
  const handleLastNameChange = (e:any) => {
    const value = e.target.value
    if (!value) {
      setLastNameError("Este campo es obligatorio")
    } else if (value.length > 3) {
      setLastName(value)
      setLastNameError("")
    }}
    
    /**
     * Maneja el cambio en el campo de contraseña.
     * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio en el campo.
    */
   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const value = e.target.value
     setPassword(value)
     validatePassword(value)
    }
    
    /**
     * Maneja el cambio en el campo de confirmación de contraseña.
     * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio en el campo.
    */
   const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const value = e.target.value
     setConfirmPassword(value)
     validateConfirmPassword(value)
    }
    
    /**
     * Maneja el cambio en el campo de correo electrónico.
     * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio en el campo.
    */
   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const value = e.target.value
     setEmail(value)
     validateEmail(value)
    }
    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const user = {
        idType: idType,
        idNumber: idNumber,
        firstName: name,
        lastName: lastName,
        genre: gender,
        birthDate: date,
        phoneNumber: phoneNumber,
        country: country,
        province: province,
        city: city,
        address: address,
        email: email,
        password: password,
      } 
      try {
        registerUser(user as User)
        console.log("Usuario registrado exitosamente")
      } catch (error) {
        console.error("Error registrando usuario:", error)
      }
      
    }
    
    useEffect(() => {
      const isValid =
        !!idType &&
        !!idNumber &&
        !!name &&
        !!lastName &&
        !!gender &&
        !!date &&
        !!phoneNumber &&
        !!country &&
        !!province &&
        !!city &&
        !!address &&
        !!email &&
        !!password &&
        !!confirmPassword &&
        !idNumberError &&
        !nameError &&
        !lastNameError &&
        !emailError &&
        !passwordError &&
        !confirmPasswordError
      setIsValid(isValid)
    }, [
      idType,
      idNumber,
      name,
      lastName,
      gender,
      date,
      phoneNumber,
      country,
      province,
      city,
      address,
      email,
      password,
      confirmPassword,
      idNumberError,
      nameError,
      lastNameError,
      emailError,
      passwordError,
      confirmPasswordError,
    ])


    return (
      <Container style={paperStyle}>
      <Typography variant="h4" component="h2" sx={title}>
        Registrarte
      </Typography>
      <Grid container direction="row" justifyContent="center" alignItems="center" style={{ marginBottom: "7%" }}>
        <Avatar alt="Imagen 1" src={facebook.src} style={{ margin: "10px" }} />
        <Avatar alt="Imagen 2" src={google.src} style={{ margin: "10px" }} />
        <Avatar alt="Imagen 3" src={github.src} style={{ margin: "10px" }} />
      </Grid>
      <form onSubmit={handleRegister}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Identificación</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={idType}
                label="Identificación"
                required
                onChange={(e) => setIdType(e.target.value)}
              >
                <MenuItem value="Cedula">Cédula</MenuItem>
                <MenuItem value="Pasaporte">Pasaporte</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Número de documento"
              placeholder="Número de documento"
              type="number"
              fullWidth
              required
              variant="outlined"
              error={!!idNumberError}
              helperText={idNumberError}
              onChange={handleIdNumberChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              placeholder="Nombre"
              type="text"
              fullWidth
              required
              variant="outlined"
              style={inputs}
              onChange={handleNameChange}
              error={!!nameError}
              helperText={nameError}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Apellido"
              placeholder="Apellido"
              type="text"
              onChange={handleLastNameChange}
              fullWidth
              required
              variant="outlined"
              style={inputs}
              error={!!lastNameError}
              helperText={lastNameError}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Género</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="Género"
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value="M">Masculino</MenuItem>
                <MenuItem value="F">Femenino</MenuItem>
                <MenuItem value="O">Prefiero no especificar</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <DatePickerComponent fullWidth handleDateChange={setDate} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Número de teléfono"
              placeholder="Número de teléfono"
              type="text"
              fullWidth
              required
              variant="outlined"
              style={inputs}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="País"
              placeholder="País"
              type="text"
              fullWidth
              required
              variant="outlined"
              style={inputs}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Provincia"
              placeholder="Provincia"
              type="text"
              fullWidth
              required
              variant="outlined"
              style={inputs}
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Ciudad"
              placeholder="Ciudad"
              type="text"
              fullWidth
              required
              variant="outlined"
              style={inputs}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Dirección"
              placeholder="Dirección"
              type="text"
              fullWidth
              required
              variant="outlined"
              style={inputs}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Correo electrónico"
              placeholder="Correo electrónico"
              type="email"
              fullWidth
              required
              variant="outlined"
              style={inputs}
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Contraseña"
              placeholder="Contraseña"
              type="password"
              fullWidth
              required
              variant="outlined"
              style={{ margin: "10px auto" }}
              onChange={handlePasswordChange}
              error={!!passwordError}
              helperText={passwordError}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              style={{ ...inputs, backgroundColor: blue[500] }}
              disabled={!isValid}
            >
              Registrarme
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography style={login}>
        <Link href="/auth-B/login">¿Ya tienes cuenta?</Link>
      </Typography>
      
    </Container>
  )
}
