import { useState, useEffect } from 'react'
import './index.css'

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (inputValue.trim() === '') return
    const newTodo = {
      id: Date.now(),
      text: inputValue
    }
    setTodos([newTodo, ...todos])
    setInputValue('')
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  return (
    <div className="glass-container">
      <h1>TODO LIST</h1>
      
      <div className="input-container">
        <input
          type="text"
          placeholder="할 일을 입력하세요..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          id="todo-input"
        />
        <button className="add-btn" onClick={addTodo} id="add-btn">
          추가
        </button>
      </div>

      <ul className="todo-list">
        {todos.length === 0 ? (
          <p className="empty-state">할 일이 없습니다. 새로운 일을 추가해보세요!</p>
        ) : (
          todos.map(todo => (
            <li key={todo.id} className="todo-item">
              <span>{todo.text}</span>
              <button 
                className="delete-btn" 
                onClick={() => deleteTodo(todo.id)}
                aria-label="Delete"
              >
                ✕
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default App
