"use client"
import { Checkbox, Container, FormControlLabel, Link, TextField } from "@mui/material"
import { Button, Grid, Typography } from "@mui/material"
import { blue } from "@mui/material/colors"
import { GoogleOAuthProvider } from "@react-oauth/google"
import backgroundImage from "../../assets/asset-avion.png"
import AuthWithGoogle from "../googleLogin/authGoogle"
import { login } from "app/api/userService"
import { useState } from "react"
import { setAuthToken } from "app/api/apiClient"

export default function Login() {
  const paperStyle = { padding: 20, height: "70vh", width: "50%", margin: "7% auto" }
  const inputs = { margin: "10px auto" }
  const blueBackground = { backgroundColor: "#2377C5", height: "100vh", display: "grid" }
  const title = { textAlign: "center", fontWeight: "bold", marginBottom: "40%" }
  const imgAvion = { alignSelf: "center", marginTop: "30%", width: "100%" }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  
  const handleLogin = async (email: string, password: string) => {
  
    login(email, password).then((response) => {
      console.log(response.token);
      setAuthToken(response.token);
    }).catch((error) => { console.error('Error with login:', error); 
  });
  }

  return (
    
    <GoogleOAuthProvider clientId="957566126639-8gm2pvhjlenmruu699rv1gu2195ols1k.apps.googleusercontent.com">
      <Grid container>
        <Grid item xs={6}>
          <Container style={paperStyle}>
            <Typography variant="h4" component="h2" sx={title}>
              Iniciar sesión
            </Typography>
            <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ marginBottom: "7%" }}>
              {/* <Avatar alt="Imagen 1" src={facebook.src} style={{ margin: "10px" }} /> */}
              {/* <Avatar alt="Imagen 2" src={google.src} style={{ margin: "10px" }} /> */}
              {/* <Avatar alt="Imagen 3" src={github.src} style={{ margin: "10px" }} /> */}
              <AuthWithGoogle />
            </Grid>
            <TextField
              label="Email"
              placeholder="Email"
              type="email"
              fullWidth
              required
              variant="outlined"
              style={inputs}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Contraseña"
              placeholder="Contraseña"
              type="password"
              fullWidth
              required
              variant="outlined"
              style={inputs}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="Recuerdame"
            ></FormControlLabel>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              onClick={() => handleLogin(email,password)}
              style={{ ...inputs, backgroundColor: blue[500] }}
              
              
            >
              Iniciar sesión
            </Button>
            <Typography sx={{marginTop: "20%"}}>
              <Link href="/auth-B/signin">¿No tienes una cuenta?</Link>
            </Typography>
          </Container>
        </Grid>
        <Grid item xs={6} style={blueBackground}>
          <img src={backgroundImage.src} style={imgAvion} alt="logo" />
          <div
            style={{
              position: "absolute",
              top: "25%",
              left: "74%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "white",
            }}
          >
            <Typography variant="h4" component="h2" style={{ fontWeight: "bold" }}>
              Fabrica Escuela Airlines
            </Typography>
          </div>
        </Grid>
      </Grid>
    </GoogleOAuthProvider>
  )
}
