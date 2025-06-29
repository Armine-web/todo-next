
import useTodos from "@/hooks/useTodos";
import NewTodo from "./NewTodo";
import TodoList from "./TodoList";

export default function TodoApp() {
    const {todos, loading, addTodo, updateTodo, toggleTodo, deleteTodo}= useTodos()
  return (
    <div className="TodoApp mx-auto mt-4 bg-slate-200 w-2xs p-3 rounded-2xl">
      <NewTodo addTodo={addTodo}/>
      <TodoList 
      todos={todos}
      loading={loading}
      updateTodo={updateTodo}
      toggleTodo={toggleTodo}
      deleteTodo = {deleteTodo}
      />
    </div>
  )
}
