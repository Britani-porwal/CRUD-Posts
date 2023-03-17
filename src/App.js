import {Routes , Route } from "react-router-dom";
import Posts from "./Components/Posts";
import CreatePosts from "./Components/CreatePosts";

function App() {
  return (
    <div>
     <Routes>
      <Route path="/" element={<Posts />}/>
      <Route path="/create" element={<CreatePosts />}/>
     </Routes>
    </div>
  );
}

export default App;
