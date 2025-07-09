"use client";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage } from "formik";

export default function Home() {
    const [todo, setTodo] = useState([]);
    const [deleteMessage, setDeleteMessage] = useState("");
    const [updateId, setUpdateID] = useState(null); // holds _id
    const [updateValue, setUpdateValue] = useState(""); // holds title string
    const [checkboxId, setCheckboxId] = useState([]);
    const [temp_num, set_temp_num] = useState(0);
    const [displayBtn, setDisplayBtn] = useState(false);

    const initialValues = { add_Todo: "" };

    const validate = (values) => {
        const error = {};
        if (!values.add_Todo) {
            error.add_Todo = "Required this field";
        }
        return error;
    };

    const habdle_Submit = async (values, { resetForm }) => {
        if (updateId) {
            // UPDATE
            await fetch(`http://localhost:9000/${updateId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: updateValue }),
            });
            setUpdateID(null);
            setUpdateValue("");
        } else {
            // ADD
            await fetch("http://localhost:9000", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
        }
        resetForm();
        set_temp_num(0); // to trigger re-fetch
    };

    useEffect(() => {
        const fetch_Data = async () => {
            try {
                const response = await fetch("http://localhost:9000");
                const todo_temp = await response.json();
                if (temp_num === 0) {
                    Object.entries(todo_temp).forEach(([_, value]) => {
                        if (value.completed) {
                            setCheckboxId((prev) => [...prev, value._id]);
                        }
                    });
                }
                setTodo(todo_temp);
                set_temp_num(1);
            } catch (error) {
                console.log(error);
            }
        };
        fetch_Data();
    }, [temp_num]);

    async function set_Delete_Id(id) {
        const deleteRes = await fetch(`http://localhost:9000/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (deleteRes.ok) {
            setDeleteMessage("Deleted");
            setTimeout(() => setDeleteMessage(""), 3000);
            set_temp_num(0);
        }
    }

    function set_Update_Id(id, title) {
        setUpdateID(id);
        setUpdateValue(title);
    }

    function handle_checkBox(id) {
        setCheckboxId((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
        setDisplayBtn(true);
    }

    async function add_Complted_List() {
        await fetch("http://localhost:9000/", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(checkboxId),
        });
        set_temp_num(0);
    }

    return (
        <div className="flex items-center justify-center bg-blue-400 h-screen w-screen">
            <div>
                <div className="p-4 ring rounded-md bg-white">
                    {deleteMessage && (
                        <p className="text-center text-3xl bg-green-500 rounded-xl">
                            {deleteMessage}
                        </p>
                    )}
<Formik
    initialValues={initialValues}
    validate={values => {
        if (!updateId && !values.add_Todo) {
            return { add_Todo: "Required this field" };
        }
        return {};
    }}
    onSubmit={(values, { resetForm }) => {
        if (updateId) {
            // Update
            fetch(`http://localhost:9000/${updateId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: updateValue }),
            }).then(() => {
                setUpdateID(null);
                setUpdateValue("");
                set_temp_num(0);
            });
        } else {
            // Add
            fetch("http://localhost:9000", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then(() => {
                resetForm();
                set_temp_num(0);
            });
        }
    }}
>
    {({ values, setFieldValue, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
            <input
                type="text"
                name="add_Todo"
                placeholder="Add New List"
                className="bordered border-gray-400 border-b-2 px-5 active:border-b-2 focus:border-b-2"
                value={updateId ? updateValue : values.add_Todo}
                onChange={(e) => {
                    const newValue = e.target.value;
                    if (updateId) {
                        setUpdateValue(newValue);
                    } else {
                        setFieldValue("add_Todo", newValue);
                    }
                }}
            />
            <button
                type="submit"
                className="border p-3 rounded-md bg-blue-500 text-white cursor-pointer ml-2"
            >
                {updateId ? "Update" : "ADD List"}
            </button>
            {!updateId && (
                <ErrorMessage
                    name="add_Todo"
                    component="div"
                    className="text-red-600"
                />
            )}
        </Form>
    )}
</Formik>

                </div>

                <div className="mt-3">
                    <div className="p-4 ring rounded-md bg-white">
                        {todo.length > 0 ? (
                            todo.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between bg-gray-300 p-2 rounded-md mb-2 gap-2.5"
                                >
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4"
                                            checked={checkboxId.includes(item._id)}
                                            onChange={() => handle_checkBox(item._id)}
                                        />
                                        <p>{item.title}</p>
                                    </div>

                                    <div className="flex gap-3">
                                        <FaEdit
                                            className="cursor-pointer text-blue-600"
                                            onClick={() =>
                                                set_Update_Id(item._id, item.title)
                                            }
                                        />
                                        <MdDelete
                                            className="cursor-pointer text-red-600"
                                            onClick={() => set_Delete_Id(item._id)}
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No todos found.</p>
                        )}
                        {displayBtn && (
                            <div className="flex align-center justify-center mt-3">
                                <button
                                    className="text-white bg-green-700 p-1 px-2 border rounded-md w-full"
                                    onClick={add_Complted_List}
                                >
                                    Save Change
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
