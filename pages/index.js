import Link from "next/link";
import React, { useState, useEffect } from "react";
import DeleteSVG from "../components/deleteSVG";
import EditSVG from "../components/editSVG";
import TickSVG from '../components/tickSVG'


export default function index() {
    const [getTodosFromLocalStorage, setGetTodosFromLocalStorage] = useState('');
    const [getCompletedTodosFromLocalStorage, setGetCompletedTodosFromLocalStorage] = useState('');
    const [newToDo, setNewToDo] = useState('');
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        var previousTodos = localStorage.getItem('storedTodos');
        var previousCompletedTodos = localStorage.getItem('storedCompletedTodos');
        if (previousTodos)
            setGetTodosFromLocalStorage(JSON.parse(previousTodos))
        if (previousCompletedTodos)
            setGetCompletedTodosFromLocalStorage(JSON.parse(previousCompletedTodos))
    }, [])

    function clearAllTodos() {
        localStorage.setItem('storedTodos', '');
        setGetTodosFromLocalStorage('')
    }

    function deleteSelectedTodo(id) {
        var previousTodos = localStorage.getItem('storedTodos');
        previousTodos = JSON.parse(previousTodos)
        previousTodos = previousTodos.filter((item) => item.id !== id);
        localStorage.setItem('storedTodos', JSON.stringify(previousTodos));
        setGetTodosFromLocalStorage(previousTodos);
    }

    function addTodosToList() {
        var date = new Date()
        var newDate = `Date: ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
        var newTime = `Time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

        if (getTodosFromLocalStorage) {
            var previouslyStoredTodos = localStorage.getItem('storedTodos');
            previouslyStoredTodos = JSON.parse(previouslyStoredTodos)
            var newObject = {
                id: previouslyStoredTodos.length + 1,
                date: newDate,
                time: newTime,
                title: newToDo
            }
            previouslyStoredTodos.push(newObject)
            previouslyStoredTodos = previouslyStoredTodos.sort((a, b) => b.id - a.id);

            localStorage.setItem('storedTodos', JSON.stringify(previouslyStoredTodos));
            setGetTodosFromLocalStorage(JSON.parse(localStorage.getItem('storedTodos')));

        } else {
            var newObject = [{
                id: 1,
                date: newDate,
                time: newTime,
                title: newToDo
            }]
            localStorage.setItem('storedTodos', JSON.stringify(newObject));
            setGetTodosFromLocalStorage(newObject)
        }
    }

    function completedTodo(id, title, date, time) {
        if (getCompletedTodosFromLocalStorage != '') {
            var previouslyStoredCompletedTodos = localStorage.getItem('storedCompletedTodos');
            previouslyStoredCompletedTodos = JSON.parse(previouslyStoredCompletedTodos)
            var newObject = {
                newID: previouslyStoredCompletedTodos.length + 1,
                preID: id,
                date: date,
                time: time,
                title: title
            }
            previouslyStoredCompletedTodos.push(newObject)
            localStorage.setItem('storedCompletedTodos', JSON.stringify(previouslyStoredCompletedTodos));
            setGetCompletedTodosFromLocalStorage(JSON.parse(localStorage.getItem('storedCompletedTodos')));

        } else {
            var newObject = [{
                newID: 1,
                preID: id,
                date: date,
                time: time,
                title: title
            }]
            localStorage.setItem('storedCompletedTodos', JSON.stringify(newObject));
            setGetCompletedTodosFromLocalStorage(JSON.parse(localStorage.getItem('storedCompletedTodos')));
        }
        deleteSelectedTodo(id)
    }


    return (
        <>
            <div className="fixed bg-green-500 px-3 py-2 rounded-lg top-5 right-5">
                <Link href='/completed-todos'>
                    <a>Completed TODOS</a>
                </Link>
            </div>
            <h1 className="title-h1 italic text-center text-stone-50 text-3xl sm:text-5xl mt-20">Create your TODO here</h1>
            <div className="flex justify-center items-center flex-col mt-5 sm:mt-10 mb-20">
                <button className="mb-5 text-slate-100 " onClick={clearAllTodos}>CLEAR ALL</button>
                <div className="w-11/12 h-auto p-2 bg-amber-300 flex justify-center items-center flex-col rounded-xl md:w-3/5">
                    {getTodosFromLocalStorage.length === 0 && (
                        <div className="flex justify-center items-center w-full">
                            <TickSVG color='green' onClick={() => document.getElementById('empty').classList.toggle('line-through')} />
                            <div className="w-11/12 bg-orange-600 m-2 py-2 px-5 rounded-xl flex justify-between">
                                <h2 id="empty">Empty</h2>
                                <div className="flex justify-center items-center">
                                    <button className="ml-5"><DeleteSVG color="black" /></button>
                                </div>
                            </div>
                        </div>
                    )}
                    {getTodosFromLocalStorage &&
                        getTodosFromLocalStorage.map((todo, index) => {
                            return (
                                <div key={todo + index} className="flex justify-center items-center w-full">
                                    <TickSVG color='green' 
                                        onClick={() => {
                                            completedTodo(todo.id, todo.title, todo.date, todo.time)
                                        }}
                                    />

                                    <div className="w-11/12 bg-orange-600 m-2 py-2 px-5 rounded-xl flex justify-between">
                                        <div className="flex justify-center flex-col w-3/4">
                                            <h2 id={todo.id} className="w-full text-xl font-semibold break-words">{todo.title}</h2>
                                            <p className="text-xs font-semibold">{todo.date + " " + todo.time}</p>
                                        </div>
                                        <div className="flex justify-center items-center">
                                            <button className="ml-5" onClick={() => deleteSelectedTodo(todo.id)}><DeleteSVG color="black" /></button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="fixed w-11/12 sm:w-96 bottom-5 bg-orange-600 flex justify-center items-center rounded-lg">
                    <input type='text' value={inputValue} placeholder="Enter the TODOS.." className="w-11/12 sm:w-96 rounded-l-lg py-2 px-2"
                        onChange={(e) => {
                            setInputValue(e.target.value)
                            setNewToDo(e.target.value)
                        }} />
                    <button className="ml-2 mr-2"
                        onClick={() => {
                            setInputValue('')
                            addTodosToList();
                        }}
                    >
                        <EditSVG color="black" />
                    </button>
                </div>
            </div>
        </>
    )
}
