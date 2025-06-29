import { useState } from "react";

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
    <div className='TodoList'>
      TodoList
    </div>
  )
}


