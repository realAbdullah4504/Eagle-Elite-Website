
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Website from './Layout/Website';
import DashboardLayout from './Layout/DashboardLayout'



function App() {
 
  return (
    <Router>
      <div >
        <Routes>
          <Route path='/*' element={<Website />}></Route>
          <Route path='/dashboard/*' element={<DashboardLayout/>}></Route>
        </Routes>
      </div>
    </Router >

  );
}

export default App;
