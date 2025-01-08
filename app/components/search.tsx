'use client';
import styles from '../css/todo.module.css'
import Image from 'next/image';
import Form from 'next/form'
import React, { useRef } from 'react';

export default function Search() {
  const inputValue = useRef(null);

  async function create() {
    const data = inputValue.current.value;
    try {
      const response = await fetch("https://assignment-todolist-api.vercel.app/api/mandoo/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "name": data,
        }),
      });

      const result = await response.json();
      console.log("성공:", result);
    } catch (error) {
      console.error("실패:", error);
    }
  }

  return (
    <div className="justify-items-center py-4">
      <Form action="/" className="flex flex-row justify-between">
        <input className={styles.search} ref={inputValue} name="memo" placeholder="할 일을 입력해주세요."/>
        <button type="button" className="ml-2" onClick={create}>
          <Image src="/btn/plusbtn.svg" alt="추가하기" width={150} height={56} /> 
        </button>
      </Form>
    </div>
  );
}
