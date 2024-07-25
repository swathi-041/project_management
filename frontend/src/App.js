import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Student from './Student';
import CreateProject from './CreateProject';
import UpdateProject from './UpdateProject';
import DetailProject from './DetailProject';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Student />} />
          <Route path="/create" element={<CreateProject/>} />
          <Route path="/update/:id" element={<UpdateProject/>}/>
          <Route 
            path="/detail/:id" 
            element={<DetailProject />} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
