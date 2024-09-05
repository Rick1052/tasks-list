import { AuthGoogleProvider } from "./contexts/authGoogle";
import RoutesApp from "./Routes/routes";

function App() {
  return (
    <AuthGoogleProvider>
      <RoutesApp />
    </AuthGoogleProvider>
  )
}

export default App;