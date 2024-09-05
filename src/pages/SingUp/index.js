import React, { useContext, useState } from "react";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import { useNavigate } from "react-router-dom"; // Importe o useNavigate
import { Container, Box, Card, CardActions, CardContent, Button, Typography, TextField } from "@mui/material";

function SignUp() {


    const { signUpWithEmail } = useContext(AuthGoogleContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState(""); // Adicione o campo de nome
    const navigate = useNavigate(); // Crie uma instância do useNavigate

    const handleSignUp = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        const success = await signUpWithEmail(email, password, name); // Passe o nome para a função de signup
        if (success) {
            navigate("/home"); // Redirecione para a página inicial após o sucesso
        }
    };

    const goToLogin = () => {
        navigate("/"); // Navegue para a página de login
    };

    return (
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
                    <form onSubmit={handleSignUp}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                <h2>Cadastrar com Email</h2>
                            </Typography>
                            <Typography variant="body2">
                                <TextField
                                    fullWidth
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    id="outlined-size-small fullWidth"
                                    label="Nome"
                                    size="small"
                                />
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    id="outlined-size-small fullWidth"
                                    label="Senha"
                                    size="small"
                                />
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button type="submit" variant="contained">Cadastrar</Button>
                            <Button onClick={goToLogin} variant="outlined">Voltar para Login</Button>
                        </CardActions>
                    </form>
                </Card>
            </Box>
        </Container>
    );
}

export default SignUp;
