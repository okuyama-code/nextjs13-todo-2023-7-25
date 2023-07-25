"use client";

import { deleteTodo, editTodo } from '@/api';
import { Task } from '@/types';
import { Input } from 'postcss';
import React, { useState, useRef, useEffect } from 'react'

interface TodoProps {
    todo: Task;
}

const Todo = ({ todo }: TodoProps) => {
    const ref = useRef<HTMLInputElement>(null)
    //useRefは簡単にHTML属性にアクセスできるためのhooks

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.text);

    useEffect(() => {
        if (isEditing) {
            ref.current?.focus(); //?(オプショナルチェーン)はある時だけfocusをあてる
        }
    }, [isEditing])


    const handleEdit = async () => {
        setIsEditing(true);
    }

    const handleSave = async () => {
        await editTodo(todo.id, editedTitle)
        setIsEditing(false);
    }

    const handleDelete = async () => {
        await deleteTodo(todo.id);
    }

  return (
    <li key={todo.id} className='flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow-md'>
        {isEditing ? (
        <input ref={ref} type='text' className='mr-2 py-1 px-2 rounded border-gray-400 border'
        value={editedTitle} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedTitle(e.target.value)}/>
        ) : (<span>{todo.text}</span> )}
        {/* onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedTitle(e.target.value)}は文字を打ち込めるようにする 状態(setEditedTitle)を定義しなおす */}
        <div>
            {isEditing ? (
                <button className='text-blue-500 mr-3' onClick={handleSave}>Save</button>
            ) : (
                <button className='text-green-500 mr-3' onClick={handleEdit}>Edit</button>
            )}
            <button className='text-red-400' onClick={handleDelete}>Delete</button>
        </div>
    </li>
  )
}

export default Todo
