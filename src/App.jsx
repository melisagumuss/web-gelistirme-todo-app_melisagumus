import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const addTask = () => {
    if (taskInput.trim() !== "") {
      setTasks([...tasks, taskInput.trim()]);
      setTaskInput('');
    }
  };

  const deleteTask = (taskToDelete) => {
    if (window.confirm("Bu görevi silmek istediğine emin misin?")) {
      setTasks(tasks.filter(task => task !== taskToDelete));
    }
  };

  const updateTask = (oldTask) => {
    const newTaskText = window.prompt("Görevi güncelle:", oldTask);
    if (newTaskText !== null && newTaskText.trim() !== "") {
      const newTasks = tasks.map(task => task === oldTask ? newTaskText.trim() : task);
      setTasks(newTasks);
    }
  };

  const filteredTasks = tasks.filter(task => 
    task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="text-center text-primary mb-4">Görev Takip Sistemi (React)</h2>
          
          <div className="input-group mb-3">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Yeni görev ekle..." 
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
            />
            <button className="btn btn-primary" onClick={addTask}>Ekle</button>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <input 
              type="text" 
              className="form-control form-control-sm w-75" 
              placeholder="Görevlerde ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="badge bg-secondary ms-2" style={{ fontSize: '0.9rem' }}>
              {searchTerm === "" ? `Toplam: ${tasks.length}` : `Bulunan: ${filteredTasks.length} / Toplam: ${tasks.length}`}
            </span>
          </div>

          <ul className="list-group">
            {filteredTasks.map((task, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{task}</span>
                <div>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => updateTask(task)}>Düzenle</button>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteTask(task)}>Sil</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
