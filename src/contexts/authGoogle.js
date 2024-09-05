import { createContext, useEffect, useState } from "react";
import { 
    GoogleAuthProvider, 
    getAuth, 
    signInWithPopup, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    updateProfile
} from "firebase/auth";
import { app } from "../services/firebaseconfig";
import { Navigate } from "react-router-dom";

const provider = new GoogleAuthProvider();
export const AuthGoogleContext = createContext({});

export const AuthGoogleProvider = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadStoreAuth = () => {
            const sessionToken = sessionStorage.getItem("@AuthFirebase:token");
            const sessionUser = sessionStorage.getItem("@AuthFirebase:user");

            if (sessionToken && sessionUser) {
                setUser(JSON.parse(sessionUser));
            }
        };
        loadStoreAuth();
    }, []);

    const signInGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                setUser(user);
                sessionStorage.setItem("@AuthFirebase:token", token);
                sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
            })
            .catch((error) => {
                console.error("Erro ao logar com Google:", error);
            });
    };

    const signUpWithEmail = async (email, password, name) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            // Atualize o perfil do usuário com o nome
            if (updateProfile) {
                await updateProfile(user, { displayName: name });
            } else {
                console.warn("Método updateProfile não está disponível.");
            }
    
            sessionStorage.setItem("@AuthFirebase:token", await user.getIdToken());
            sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
    
            setUser(user);
    
            // Retorne um valor indicando sucesso
            return true;
        } catch (error) {
            console.error("Erro ao cadastrar:", error.message);
            alert(`Erro ao cadastrar: ${error.message}`);
            // Retorne um valor indicando falha
            return false;
        }
    };
    

    const signInWithEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
    
                // Verifique se user e user.accessToken estão definidos
                if (user && user.accessToken) {
                    setUser(user);
                    try {
                        sessionStorage.setItem("@AuthFirebase:token", user.accessToken);
                        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
                    } catch (error) {
                        console.error("Erro ao salvar no sessionStorage:", error);
                    }
                } else {
                    console.error("Usuário ou token não disponíveis.");
                }
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/user-not-found':
                        alert("Usuário não encontrado. Por favor, verifique o email ou cadastre-se.");
                        break;
                    case 'auth/wrong-password':
                        alert("Senha incorreta. Por favor, tente novamente.");
                        break;
                    case 'auth/invalid-email':
                        alert("Email inválido. Por favor, insira um email válido.");
                        break;
                    case 'auth/too-many-requests':
                        alert("Muitas tentativas de login. Por favor, tente novamente mais tarde.");
                        break;
                    default:
                        alert(`Erro ao fazer login: ${error.message}`);
                        console.error("Erro ao fazer login:", error);
                        break;
                }
            });
    };

    function sigOut() {
        sessionStorage.clear();
        setUser(null);
        return <Navigate to='/' />;
    }

    return (
        <AuthGoogleContext.Provider value={{ signInGoogle, signUpWithEmail, signInWithEmail, signed: !!user, user, sigOut }}>
            {children}
        </AuthGoogleContext.Provider>
    );
};
