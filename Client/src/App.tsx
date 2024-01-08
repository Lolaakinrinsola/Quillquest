import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AllBlogs from "./Pages/Blog/AllBlogs";
import Blog from "./Pages/Blog/Blog";
import EditBlog from "./Pages/Blog/EditBlog";
import NewBlog from "./Pages/Blog/NewBlog";
import ForgotPassword from "./Pages/ForgotPassword";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import PageNotFound from "./Pages/PageNotFound";
import Setting from "./Pages/Setting";
import Signup from "./Pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/blogs' element={<AllBlogs/>} />
        <Route path='/create' element={<NewBlog/>} />
        <Route path='/blogs/:id' element={<Blog/>} />
        <Route path='/blogs/edit-blog/:id' element={<EditBlog/>} />
        <Route path='/forgotPassword' element={<ForgotPassword/>} />
        <Route path='/settings' element={<Setting/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;
