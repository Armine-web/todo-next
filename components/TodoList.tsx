'use client'
import { useState, useEffect, useRef } from "react";

type Todo = {
    id: number;
    title: string;
    completed: boolean;
}

type Props = {
    todos: Todo[];
    loading: boolean;
    updateTodo: (id: number, title: string) => void;
    toggleTodo: (id: number, completed: boolean) => void;
    deleteTodo: (id: number) => void;
}

export default function TodoList({todos, loading, updateTodo, toggleTodo, deleteTodo}: Props) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    if (editingId !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingId]);

  if(loading) return <p>Loading...</p>

  const startEditing = (todo: Todo)=>{
    setEditingId(todo.id);
    setEditingValue(todo.title);
  }

  const saveEditing = (id:number) => {
    const trimed = editingValue.trim();
    if(trimed){
      updateTodo(id, trimed);
    }
    setEditingId(null);
  }

  const cancelEditing = () =>{
    setEditingId(null);
  }

  return (
    <ul className='TodoList'>
      {todos.map(todo => <li key = {todo.id} className=" flex justify-between items-center">
        <div>
          {editingId == todo.id ? <>
          <input
          ref={inputRef}
          className="outline-0 border-b-2 border-slate-400"
          type="text"
          value={editingValue}
          onChange={(e) => setEditingValue(e.target.value)}
          onBlur={() => saveEditing(todo.id)}
          onKeyDown = {e => {
            if(e.key === 'Escape') cancelEditing();
            if (e.key ==='Enter') saveEditing(todo.id);
          }}
          />
          </> : <>
          <input className=" mr-1"
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id, !todo.completed)}
          
          />
          <span onDoubleClick = {()=> startEditing(todo)} className={todo.completed ? 'text-gray-400 line-through': ''}>
           
            {todo.title}
          </span>
          </>
          }
        </div>
        <button className="text-red-500 cursor-pointer text-sm" onClick = {()=> deleteTodo(todo.id)}>Delete</button>
      </li>
      )
      }
    </ul>
  )
}


