import React, { useState, useEffect, useContext } from "react";
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebaseconfig";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import Header from "../../components/Header";
import { Container, Box, Button, TextField, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Home() {
    const { user } = useContext(AuthGoogleContext);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskContent, setEditTaskContent] = useState("");

    useEffect(() => {
        if (user) {
            fetchTasks();
        }
    }, [user]);

    const fetchTasks = async () => {
        try {
            if (!user) {
                console.warn("Usuário não está logado.");
                return;
            }
            const tasksCollection = collection(db, "tasks");
            const taskSnapshot = await getDocs(tasksCollection);
            const taskList = taskSnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(task => task.userId === user.uid); // Certifique-se de que o userId está sendo verificado corretamente
            setTasks(taskList);
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
        }
    };

    const addTask = async () => {
        try {
            if (!user) {
                alert("Você deve estar logado para adicionar uma tarefa.");
                return;
            }
            const docRef = await addDoc(collection(db, "tasks"), {
                content: newTask,
                userId: user.uid // Adicionando o userId
            });
            setTasks([...tasks, { id: docRef.id, content: newTask, userId: user.uid }]);
            setNewTask("");
        } catch (error) {
            console.error("Erro ao adicionar tarefa:", error);
        }
    };

    const editTask = async (id) => {
        try {
            const taskRef = doc(db, "tasks", id);
            await updateDoc(taskRef, { content: editTaskContent });
            setTasks(tasks.map(task => (task.id === id ? { ...task, content: editTaskContent } : task)));
            setEditTaskId(null);
            setEditTaskContent("");
        } catch (error) {
            console.error("Erro ao editar tarefa:", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await deleteDoc(doc(db, "tasks", id));
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error("Erro ao deletar tarefa:", error);
        }
    };

    return (
        <>
            <Header />
            <Container>


                <Box
                    sx={{
                        width: 'auto',
                        height: '100%',
                        marginTop: 10,
                        padding: 3,
                        borderRadius: 1,
                        bgcolor: '#fefe',
                        boxShadow: '0px 0px 20px black',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1
                    }}
                >

                    <TextField
                        fullWidth
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        label="Tasks"
                        id="outlined-size-small"

                    />
                    <Button onClick={addTask} variant="contained">Adicionar Tarefa</Button>

                </Box>

                <div style={{
                    display: 'flex'
                }}>
                    <ul style={{ minWidth: '20'}}>
                        <Box sx={{}}>
                            {tasks.map((task) => (
                                <li key={task.id} style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-between', backgroundColor: '#fefe', padding: 3, margin: 2}}>
                                    {editTaskId === task.id ? (
                                        <>
                                            <TextField
                                                size="small"
                                                type="text"
                                                value={editTaskContent}
                                                onChange={(e) => setEditTaskContent(e.target.value)}
                                                color="secondary"
                                            />
                                            <Button onClick={() => editTask(task.id)}>Salvar</Button>
                                        </>
                                    ) : (
                                        <>
                                            {task.content}
                                            <div>
                                                <IconButton onClick={() => { setEditTaskId(task.id); setEditTaskContent(task.content); }} aria-label="editar" size="small" color="secondary"><EditIcon fontSize="inherit"/></IconButton>
                                                <IconButton onClick={() => deleteTask(task.id)} aria-label="editar" size="small" color="error"><DeleteIcon fontSize="inherit"/></IconButton>
                                            </div>
                                        </>
                                    
                                    )}
                                </li>
                            ))}
                        </Box>
                    </ul>
                </div>

            </Container>
        </>
    );
}

export default Home;
