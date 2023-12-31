"use client"; //useStateなどを使う場合 コンポーネントにクライアントと認識させる

import { addTodo } from '@/api';
import React, { FormEvent, useState, ChangeEvent } from 'react'
import { v4 as uuidv4 } from "uuid"

const AddTask = () => {

  const [taskTitle, setTaskTitle] = useState("") //状態変数　inputが更新されるたびに呼び出す

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await addTodo({ id: uuidv4(), text: taskTitle}) //入力されるたびに追加する

    setTaskTitle(""); //追加したら文字列を空にする
  }

  return (
    <form className='mb-4 space-y-3' onSubmit={handleSubmit}>
        <input type="text" className='w-full border px-4 py-2 rounded-lg focus:outline-none focus: border-blue-400'
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.target.value)}
        value={taskTitle} />
        <button className='w-full px-4 py-2 text-white  bg-blue-500 rounded transform hover:scale-95 duration-200'>Add Task</button>
    </form>
  )
}

export default AddTask
