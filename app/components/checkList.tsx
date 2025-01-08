'use client';
import styles from '../css/todo.module.css'
import Image from 'next/image';
import Form from 'next/form'
import React, { useRef } from 'react';

export default function CheckList(props: any) {
	const todoList = props.todoList;

//   const clickHandle = event => {
//     event.preventDefault();
//     const todoStr = inputValue.current.value;
//     create(todoStr);
//    }
//    const response = await fetch("https://assignment-todolist-api.vercel.app/api/mandoo/items");
//    if (response.ok) {
//      const responseData = await response.json();
//      console.log("responseData", responseData);
//    } else {
//      throw new Error("Data fetching error");
//    }

  return (
		<div className='flex flex-row justify-between p-8'>
			<div>
			{/* <input className={styles.checkList} defaultValue='받아온 값'></input> */}

			{/* <Form action="/done" className="flex flex-row justify-between">
				<input className={styles.checkList} name="query" value={props.todoList[0]["name"]} readOnly />
				<button type="submit" className="m-[10px] absolute">
					<Image src="/ic/chDefault.svg" alt="todo" width={30} height={30} />
				</button>
			</Form> */}
				<Image src="/img/todo.svg" alt="todo" width={100} height={36} />
				{todoList.map((item)=> (
					<Form action="/done" className="flex flex-row justify-between py-1.5">
						<input className={styles.checkList} id={item.id} value={item.name} readOnly />
						<button type="submit" className="m-[10px] absolute">
							<Image src="/ic/chDefault.svg" alt="todo" width={30} height={30} />
						</button>
					</Form>
				))}
		</div>
				<div>
				{/* <input className={styles.checkList} defaultValue='받아온 값'></input> */}
		
				{/* <Form action="/done" className="flex flex-row justify-between">
					<input className={styles.checkList} name="query" value={props.todoList[0]["name"]} readOnly />
					<button type="submit" className="m-[10px] absolute">
						<Image src="/ic/chDefault.svg" alt="todo" width={30} height={30} />
					</button>
				</Form> */}
					<Image src="/img/done.svg" alt="todo" width={100} height={36} />
					{todoList.map((item)=> (
						<Form action="/done" className="flex flex-row justify-between py-1.5">
							<input className={styles.doneList} id={item.id} value={item.name} readOnly />
							<button type="submit" className="m-[10px] absolute">
								<Image src="/ic/chFrame.svg" alt="todo" width={30} height={30} />
							</button>
						</Form>
					))}
			</div>
		</div>
  );
}
