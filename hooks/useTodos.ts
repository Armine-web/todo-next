'use client';
import { useEffect, useState } from "react";

type Todo = {id: number, title: string, completed: boolean }

export default function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetchTodos();
    }, []);
    
    const fetchTodos = async()=> {
      try {
          const res = await fetch('/api/todos');
          if (!res.ok) throw new Error(`Fetch faild ${res.status}`);
          const todos = await res.json() as Todo[];
          setTodos(todos);
      } catch (err) {
        console.error('Error Eetching todos: ', err);
        
      }finally{
        setLoading(false);
      }

    }
    const addTodo = async(title: string) =>{
      try {
          const res = await fetch('/api/todos', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({title})
          });
          if(!res.ok) throw new Error(`Post Faild ${res.status}`);
          const newTodo = await res.json() as Todo;
          setTodos(prev => [newTodo, ...prev]);
      } catch (err) {
        console.error( err);
        
      }

    }

    const updateTodo = async(id: number, title: string) =>{
       try {
         const res = await fetch(`/api/todos/`, {
             method: 'PUT',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({id, title})
         });
         if(!res.ok) throw new Error(`Put Faild ${res.status}`);
         const updatedTodo = await res.json() as Todo;
         setTodos(prev => prev.map(t =>t.id ===id ? updatedTodo : t));
       } catch (err) {
        console.error(err);
        
       }
     }

     const toggleTodo = async(id: number, completed: boolean )=>{
        try {
            const res = await fetch('/api/todos',{
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id, completed})
            });
            if(!res.ok) throw new Error(`Put Faild ${res.status}`);
            const updatedTodo = await res.json() as Todo;
            setTodos(prev => prev.map(t => t.id === id ? updatedTodo : t));
        } catch (err) {
            console.error(err);
            
        }
     }

     const deleteTodo = async (id: number) =>{
       try {
         const res = await fetch('/api/todos', {
             method: 'DELETE',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({id})
         });
         if(!res.ok) throw new Error(`Delete Faild ${res.status}`);
         setTodos(prev => prev.filter(t => t.id !==id));
       } catch (err) {
        console.error(err);
        
       }
     }

     return {
        todos,
        loading,
        addTodo,
        updateTodo,
        toggleTodo,
        deleteTodo
     }
}

