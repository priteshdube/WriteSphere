
import{ BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blogs from './pages/Blogs'


function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/blogs' element={<Blogs />} /> 
          <Route path='/blog/:id' element={<Blogs />} />
        </Routes>
        </Router>     
    </>
  )
}

export default App
