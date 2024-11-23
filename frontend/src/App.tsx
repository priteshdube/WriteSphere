
import{ BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blogs from './pages/Blogs'
import Publish from './pages/Publish'
import FullBlog from './pages/FullBlog'
import Filteredblogs from './pages/Filteredblogs'


function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/' element={<Blogs />} /> 
          <Route path='/blog/:title' element={<FullBlog />} />
          <Route path='/publish' element={<Publish />} />
          <Route path='/filteredblogs' element={<Filteredblogs />} />

        </Routes>
        </Router>     
    </>
  )
}

export default App
