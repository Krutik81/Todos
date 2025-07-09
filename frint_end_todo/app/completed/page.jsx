"use client"
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";

export default function Completed() {
    const [todoList, setTodoList] = useState([]);

    async function fetch_Data() {
        try {
            const fetched_Todos = await fetch(process.env.NEXT_PUBLIC_API_URL);
            console.log("🚀 ~ fetch_Data ~ fetched_Todos:", fetched_Todos)
            const visible_Todos = await fetched_Todos.json();
            setTodoList(visible_Todos);
        }
        catch (error) {
            console.log("🚀 ~ fetch_Data ~ error:", error)
        }
    }

    useEffect(() => {
        fetch_Data();
    }, [])
    return (
        <>
            <div className="flex items-center justify-center bg-blue-400 h-screen w-screen">
                <div className="w-[400px]">
                    <div className="mt-3">
                        <div className="borded borded-none p-4 ring rounded-md bg-white ">
                            <h2 className="text-center w-full bg-blue-700 text-2xl mb-2 text-white rounded-md p-2">Completed</h2>
                            {
                                todoList.length > 0 ? (
                                    todoList.map((value, index) => {
                                        if (value.completed) {
                                            console.log(value.completed)
                                            return (
                                                <div className="flex justify-between borded borded-gray-2 bg-gray-300 p-2 rounded-md mb-2 gap-2.5" key={index}>
                                                    <p>{value.title}</p>
                                                </div>
                                            )
                                        }
                                    })
                                ) : (
                                    <div>No todos found</div>
                                )
                            }
                        </div>
                    </div>
                </div>
                {/* <div className="flex items-center justify-center"> */}

                {/* </div>   */}
            </div>
        </>
    );
}
