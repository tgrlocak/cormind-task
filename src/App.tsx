import { ChangeEvent } from 'react';
import './App.css';
import { FileService } from './services/file.service';

function App() {
  let file: any = null;

  const fileService = new FileService();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e && e.target && e.target.files && e.target.files.length > 0) {
      file = e.target.files[0];
    }
  };

  const handleFile = () => {
    if(!!file) {
      fileService.process(file);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <input type="file" name="upload" onChange={(e) => handleChange(e)} accept=".xls, .xlsx"/>
        <div>
          <button onClick={e => handleFile()}>Process</button>
        </div>
      </header>
    </div>
  );
}

export default App;
