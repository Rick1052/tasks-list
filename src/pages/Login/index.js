import React, { useContext, useState } from "react";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import { Link, Navigate } from "react-router-dom";
import { Container, Box, Card, CardActions, CardContent, Button, Typography, TextField, IconButton } from "@mui/material";

import GoogleIcon from '@mui/icons-material/Google';

function Login() {
    const { signInGoogle, signed, signInWithEmail } = useContext(AuthGoogleContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailAuth = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        await signInWithEmail(email, password); // Chama a função de login
    };

    const NavigateSignUp = () => {
        <Navigate to=''/>
    }

    async function loginGoogle() {
        await signInGoogle();
    }

    if (!signed) {
        return (
            <div>
                <Container maxWidth="sm"
                    sx={{
                        display: 'flex', // Utiliza display flex
                        flexDirection: 'column', // Direção da flexbox como coluna
                        alignItems: 'center', // Alinhamento horizontal centralizado
                        justifyContent: 'center', // Alinhamento vertical centralizado
                        height: '100vh', // Ocupa toda a altura da viewport
                    }}
                >

                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { m: 1, width: '500px' } }}
                        noValidate
                        autoComplete="off"
                    >
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    <h2>Entrar com Email</h2>
                                </Typography>
                                <Typography variant="body2">
                                    <form onSubmit={handleEmailAuth}>
                                        <TextField
                                            fullWidth
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            id="outlined-size-small fullWidth"
                                            label="Email"
                                            size="small"
                                        />
                                        <TextField
                                            fullWidth
                                            type="password"
                                            placeholder="Senha"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            id="outlined-size-small fullWidth"
                                            label="Senha"
                                            size="small"
                                        />
                                        <Button type="submit" variant="contained">Entrar</Button>
                                    </form>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="outlined">
                                    <Link to="/signup" style={{ textDecoration: 'none' }}>Não tem uma conta? Cadastrar</Link>
                                </Button><br />

                                <Button onClick={loginGoogle} variant="contained" ><GoogleIcon/> Logar com o Google</Button>
                            </CardActions>
                        </Card>
                    </Box>
                </Container>
            </div>
        );
    } else {
        return <Navigate to='/home' />;
    }
}

export default Login;
