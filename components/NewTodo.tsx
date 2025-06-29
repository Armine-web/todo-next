import { useState } from "react"; 
type Props = {
  addTodo: (title: string) => void;
}

export default function NewTodo({addTodo}: Props) {
  const [inputValue, setInputValue] = useState('');

  const handlerSubmit = (e: React.FormEvent)=> {
    e.preventDefault();
    if(inputValue.trim() !== '') {
      addTodo(inputValue.trim());
      setInputValue('');
    }
  }

  return (
    <form className="NewTodo flex flex-col gap-2 items-center" onSubmit={handlerSubmit}>
      <input className="bg-amber-50 rounded-2xl outline-0 p-1 pl-3" type = 'text' value = {inputValue} onChange={e => setInputValue(e.target.value)} />
      <button className="border-2 border-amber-100 w-15 rounded-2xl  hover:bg-amber-50">ADD</button>
    </form>
  )
}


