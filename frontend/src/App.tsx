import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";

function App() {
  // const [user, setUser] = useState<Users>(userData);

  return (
    // <ModeProvider>
    //   <UserContext.Provider value={user}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
    //   </UserContext.Provider>
    // </ModeProvider>
  );
}

export default App;
