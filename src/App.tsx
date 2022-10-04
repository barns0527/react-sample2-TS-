import React, { useState } from "react";
import "./App.css";

function App() {

  const [inputText, setInputText] = useState("");  
  const [todos, setTodos] = useState<Todo[]>([]);

  type Todo = {
    inputValue: string;
    id: number; 
    checked: boolean;
  };

  //入力値変更処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputText(e.target.value);
  };

  //入力完了->　ToDo追加
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!inputText) {
      return;
    }

    //新しいTodoを作成して追加
    const newTodo: Todo = {
      inputValue: inputText,
      id: todos.length,
      checked: false,
    };

    setTodos([newTodo, ...todos]);
    //console.log(inputText);
    setInputText("");
  };

  //完了未完了切換え
  const handleChecked = (id: number, checked: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));    
    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        //反転
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  //削除
  const handleDelete = (id: number) => {
    //idが正しくないのは残す。正しいと消す。
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      
        <header>
          <h1>To-Do Lists</h1>
        </header>

        {/* 入力フォーム    */}
        <div className="inputForm">
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              onChange={(e) => handleChange(e)}
              value={inputText}
            />            
            <button onClick={(e) => handleSubmit(e)}>         
              <i className="fas fa-plus-circle"></i>
            </button>
          </form>
        </div>
        
        {/* リスト表示    */}
        <div className="todoList">
          <div className="todos">
            {todos.map((todo, index) => (
              <div
                className={`todo ${todo.checked ? "done" : ""}`}
                key={index}
              >
                <div className="todoText">
                  <span>{todo.inputValue}</span>
                </div>
                <div className="icons">
                  <button onClick={() => handleChecked(todo.id, todo.checked)}>
                    <i className="fas fa-check"></i>
                  </button>
                  <button onClick={() =>  handleDelete(todo.id)}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      
    </div>
  );
}

export default App;
