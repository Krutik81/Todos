"use client"
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function Home() {
    const [todo, setTodo] = useState([]);
    const [deleteId, setDeleteID] = useState();
    const [deleteMessage, setDeleteMessage] = useState();
    const [updateId, setUpdateID] = useState();
    const [inputField, setInputField] = useState();
    const [checkboxId, setCheckboxId] = useState([]);
    const [temp_num, set_temp_num] = useState(0);
    const [displayBtn, setDisplayBtn] = useState(false);
    const [updateID, setUPdateID_2] = useState();
    const [change_input, set_change_input] = useState();
    const [message, setMessage] = useState();
    const [Filter_Statues, set_Filter_Statues] = useState("All");

    const habdle_Submit = async (values, { resetForm }) => {
        try {
            console.log("🚀 ~ consthabdle_Submit=async ~ values:", values)
            const add_Todo_db = await fetch(process.env.NEXT_PUBLIC_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            })
            if (!add_Todo_db) {
                console.log("sorray no data are found ")
            }
            else {
                const response = await add_Todo_db.json()
                console.log("🚀 ~ consthabdle_Submit=async ~ response:", response)
                setMessage("New Todo are added")
                setTimeout(() => {
                    setMessage("")
                }, 3000)
                resetForm();
            }
        }
        catch (error) {
            console.log("🚀 ~ consthabdle_Submit= ~ error:", error)
        }
    }
    useEffect(() => {
        const fetch_Data = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const todo_temp = await response.json();

                if (temp_num === 0) {
                    Object.entries(todo_temp).map((key, value) => {
                        console.log("🚀 ~ Object.entries ~ key:", key)
                        if (key[1].completed) {
                            setCheckboxId(prevalue => [...prevalue, key[1]._id])
                            console.log("yes");
                        }
                    })
                }

                setTodo(todo_temp)
                // console.log("🚀 ~ constfetch_Data= ~ todo:", todo)
                set_temp_num(1);
            }
            catch (error) {
                console.log(error)
            }
        }
        fetch_Data();
    }, [habdle_Submit])
    const initialValues = {
        add_Todo: ''
    }
    const validate = (values) => {
        console.log("🚀 ~ validate ~ values:", values)
        const error = {};
        if (!values.add_Todo) {
            error.add_Todo = "Required this field"
        }
        return error;
    }

    async function set_Delete_Id(e) {
        try {

            setDeleteID(e)
            const delete_Message = await fetch(process.env.NEXT_PUBLIC_API_URL + e, {
                method: "delete",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (!delete_Message.ok) {
                console.error("Delete failed");
                return;
            }
            const delete_Message_1 = await delete_Message.json();
            console.log("🚀 ~ set_Delete_Id ~ delete_Message:", delete_Message_1)
            const json_delete_Message_1 = await delete_Message_1.json;
            console.log("🚀 ~ set_Delete_Id ~ json_delete_Message_1:", json_delete_Message_1)
            setMessage("Task Are Deleted !")
            setTimeout(() => {
                setMessage("")
            }, 3000)
        }
        catch (error) {
            console.log("🚀 ~ set_Delete_Id ~ error:", error)
        }
    }
    async function set_Update_Id(id, title) {
        setUpdateID(title)
        setUPdateID_2(id);
    }
    function handle_Input(e) {
        setInputField(e)
    }
    function handle_checkBox(id) {
        // const index_obj = [{_id:id,value:value}]
        setCheckboxId(prevalue => {
            if (prevalue.includes(id)) {
                return prevalue.filter((item) => item !== id)
            }
            else {
                return [...prevalue, id]
            }
        })
        setDisplayBtn(true);
        // console.log("🚀 ~ checkboxId:", checkboxId)
    }
    async function add_Complted_List() {
        try {
            console.log("Check data", checkboxId)
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(checkboxId)
            })
            set_temp_num(0);
            setMessage("Saved Changes")
            setTimeout(() => {
                setMessage("")
            }, 3000)
        }
        catch (error) {
            console.log("🚀 ~ add_Complted_List ~ error:", error)
        }
    }
    function set_handle(e) {
        setUpdateID(e.target.value)
        // set_change_input(e.target.value)
    }
    async function on_Edit_Click() {
        try {
            console.log(JSON.stringify(updateId))
            const send_Json_Data = {
                title: updateId
            }
            console.log(process.env.NEXT_PUBLIC_API_URL+"edit/"+updateID)
            const edit_Response = await fetch(process.env.NEXT_PUBLIC_API_URL+"edit/"+updateID, {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(send_Json_Data)
            })
            setMessage("Title are edited")
            setTimeout(() => {
                setMessage("")
            }, 3000)
            setUPdateID_2(" ")
        }
        catch (error) {
            console.log("Error", error);
        }
    }
    // function TodoItem({ item, updateID, updateId, checkboxId, handle_checkBox, set_handle, on_Edit_Click, set_Update_Id, set_Delete_Id ,Completed}) {
    //     // console.log("🚀 ~ TodoItem ~ Completed:", Filter_Statues)
    //     // console.log(Completed ," === ",Filter_Statues )
    //     if (Completed == (Filter_Statues === 'true') || Filter_Statues === 'All') {
    //         return (
    // <div
    //     className="flex items-center justify-between bg-gray-300 p-2 rounded-md mb-2 gap-2.5"
    //     key={item._id}
    // >
    //     {/* Checkbox and title/input */}
    //     <div className="flex items-center gap-3">
    //         <input
    //             type="checkbox"
    //             className="w-4 h-4 text-white bg-blue-700"
    //             checked={checkboxId.includes(item._id)}
    //             onChange={() => handle_checkBox(item._id)}
    //         />

    //         {updateID === item._id ? (
    //             <>
    //                 <input
    //                     type="text"
    //                     className="border px-2 py-1 rounded-md"
    //                     value={updateId}
    //                     onChange={(e) => set_handle(e)}
    //                 />
    //                 <button
    //                     className="text-white bg-green-700 text-center p-1 px-2 border rounded-md w-full"
    //                     onClick={on_Edit_Click}
    //                 >
    //                     Edit
    //                 </button>
    //             </>
    //         ) : (
    //             <p>{item.title}</p>
    //         )}
    //     </div>

    //     {/* Edit and delete icons */}
    //     <div className="flex gap-3">
    //         <FaEdit
    //             className="cursor-pointer text-blue-600"
    //             onClick={() => set_Update_Id(item._id, item.title)}
    //         />
    //         <MdDelete
    //             className="cursor-pointer text-red-600"
    //             onClick={() => set_Delete_Id(item._id)}
    //         />
    //     </div>
    // </div>
    //         );
    //         // console.log("yes its work")
    //     }
    //     return null; 
    // }

    return (
        <>
            <div className="flex items-center justify-center bg-blue-400 h-screen w-screen">
                <div className="  ">
                    <div className="borded borded-none p-4 ring rounded-md bg-white ">
                        {deleteMessage && <p className="text-center text-3xl bg-green-500 rounded-xl">{deleteMessage}</p>}
                        <Formik
                            initialValues={initialValues}
                            validate={validate}
                            onSubmit={habdle_Submit}
                            enableReinitialize={true}
                        >
                            {({ values, setFieldValue, handleChange }) => (
                                <Formik
                                    initialValues={initialValues}
                                    validate={validate}
                                    onSubmit={habdle_Submit}
                                    enableReinitialize={true}
                                >
                                    {({ values, setFieldValue }) => (
                                        <Form>
                                            <Field
                                                type="text"
                                                name="add_Todo"
                                                placeholder="Add New List"
                                                className="bordered border-gray-400 border-b-2 px-5 active:border-b-2 focus:border-b-2"
                                                value={values.add_Todo}
                                                onChange={(e) => {
                                                    const newValue = e.target.value;
                                                    // if (updateId) {
                                                    // setUpdateID(newValue);
                                                    // } else {
                                                    setFieldValue("add_Todo", newValue);
                                                    // }
                                                }}
                                            />
                                            <button
                                                className="border p-3 rounded-md bg-blue-500 text-white cursor-pointer"
                                                type="submit"
                                            >
                                                Add List
                                            </button>
                                            <ErrorMessage name="add_Todo" component="div" className="text-red-600" />
                                        </Form>
                                    )}
                                </Formik>
                            )}
                        </Formik>
                    </div>
                    <div className="mt-3">
                        <div className="borded borded-none p-4 ring rounded-md bg-white ">
                            <select name="Filter_Statues" id="Filter_Statues" className="border border-2 rounded-md p-2 mb-2" onChange={(e) => set_Filter_Statues(e.target.value)}>
                                <option value="All">All</option>
                                <option value='true'>Padding</option>
                                <option value="false">Completed</option>
                            </select>
                            {message ? <h2 className="text-center w-full bg-green-700 text-2xl mb-2 text-white rounded-md p-2">{message}</h2> : " "}
                            {todo.length > 0 ? (
                                todo.map((item, index) => {
                                    if (item.completed == (Filter_Statues === 'true') || Filter_Statues === 'All') {
                                        return (
                                            <div
                                                className="flex items-center justify-between bg-gray-300 p-2 rounded-md mb-2 gap-2.5"
                                                key={item._id}
                                            >
                                                {/* Checkbox and title/input */}
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="checkbox"
                                                        className="w-4 h-4 text-white bg-blue-700"
                                                        checked={checkboxId.includes(item._id)}
                                                        onChange={() => handle_checkBox(item._id)}
                                                    />

                                                    {updateID === item._id ? (
                                                        <>
                                                            <input
                                                                type="text"
                                                                className="border px-2 py-1 rounded-md"
                                                                value={updateId}
                                                                onChange={(e) => set_handle(e)}
                                                            />
                                                            <button
                                                                className="text-white bg-green-700 text-center p-1 px-2 border rounded-md w-full"
                                                                onClick={on_Edit_Click}
                                                            >
                                                                Edit
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <p>{item.title}</p>
                                                    )}
                                                </div>

                                                {/* Edit and delete icons */}
                                                <div className="flex gap-3">
                                                    <FaEdit
                                                        className="cursor-pointer text-blue-600"
                                                        onClick={() => set_Update_Id(item._id, item.title)}
                                                    />
                                                    <MdDelete
                                                        className="cursor-pointer text-red-600"
                                                        onClick={() => set_Delete_Id(item._id)}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            ) : (
                                <div>No todos found</div>
                            )}

                            {displayBtn && (
                                <div className="flex align-center justify-center">
                                    <button
                                        className="text-white bg-green-700 text-center p-1 px-2 border rounded-md w-full"
                                        onClick={add_Complted_List}
                                    >
                                        Add To Completed
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
