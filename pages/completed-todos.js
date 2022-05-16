import { useState, useEffect } from "react";
import DeleteSVG from "../components/deleteSVG";
import Link from "next/link";

export default function CompletedTodos() {
    const [completedTodosFromLocalStorage, setCompletedTodosFromLocalStorage] = useState('')

    useEffect(() => {
        var completedTodos = localStorage.getItem('storedCompletedTodos')
        if (completedTodos) {
            completedTodos = JSON.parse(completedTodos)
            completedTodos = completedTodos.sort((a, b) => b.newID - a.newID);
            setCompletedTodosFromLocalStorage(completedTodos)
        }
    }, [])

    function clearAllCompletedTodos() {
        localStorage.setItem('storedCompletedTodos', '');
        setCompletedTodosFromLocalStorage('')
    }

    function deleteCompletedTodo(id) {
        var previousTodos = localStorage.getItem('storedCompletedTodos');
        previousTodos = JSON.parse(previousTodos)
        previousTodos = previousTodos.filter((item) => item.newID !== id);
        localStorage.setItem('storedCompletedTodos', JSON.stringify(previousTodos));
        setCompletedTodosFromLocalStorage(previousTodos);
    }

    return (
        <>
            <div className="fixed bg-green-500 px-3 py-2 rounded-lg top-5 left-5">
                <Link href='/'>
                    <a>Go Back</a>
                </Link>
            </div>

            <div className="flex justify-center items-center flex-col mt-20">
                <button className="mb-5 text-slate-100 " onClick={clearAllCompletedTodos}>CLEAR ALL</button>
                {completedTodosFromLocalStorage.length === 0 && (
                    <div className="w-11/12 h-auto mt-5 p-2 bg-amber-300 flex justify-center items-center flex-col rounded-xl md:w-3/5">
                        <h1>Nothing to show here</h1>
                    </div>
                )}

                {completedTodosFromLocalStorage.length != 0 &&
                    <div className="w-11/12 h-auto mt-5 p-2 bg-amber-300 flex justify-center items-center flex-col rounded-xl md:w-3/5">
                        {completedTodosFromLocalStorage.map((todo, index) => {
                            return (
                                <div key={todo + index} className="flex justify-center items-center w-full">
                                    <div className="w-11/12 bg-orange-600 m-2 py-2 px-5 rounded-xl flex justify-between">
                                        <div className="flex justify-center flex-col w-3/4">
                                            <h2 id={todo.id} className="w-full text-xl font-semibold break-words">{todo.title}</h2>
                                            <p className="text-xs font-semibold">{todo.date + " " + todo.time}</p>
                                        </div>
                                        <div className="flex justify-center items-center">
                                            <button className="ml-5" onClick={() => deleteCompletedTodo(todo.newID)}><DeleteSVG color="black" /></button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        </>
    )
}
