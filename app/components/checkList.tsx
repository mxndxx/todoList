'use client';
import styles from '../css/todo.module.css'
import Image from 'next/image';
import Form from 'next/form'
import { redirect } from 'next/navigation'


export default function CheckList(props: any) {
  const todoList = props.todoList;
  const doneList = props.doneList;

  async function clickHandle(data) {
    console.log("아이디: ",data.isCompleted)
    let completed = data.isCompleted ? false : true
    console.log("변경: ",completed)
    try {
      const response = await fetch("https://assignment-todolist-api.vercel.app/api/mandoo/items/"+data.id, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "isCompleted": completed
        }),
      });

      const result = await response.json();
      console.log("성공:", result);
    } catch (error) {
      console.error("실패:", error);
    }
    redirect('/')
  }

  function Todo(props: any) {
    return (
      <div>
        {props.todoList.map((item)=> (
          <Form action="/" className="flex flex-row justify-between py-1.5">
              <input className={styles.checkList} id={item.id} value={item.name} readOnly />
              <button type="submit" className="m-[10px] absolute">
                <Image src="/ic/chDefault.svg" alt="todo" width={30} height={30} onClick={() => clickHandle(item)}/>
              </button>
            </Form>
          ))}
        </div>
      )
  }
  function Done(props: any) {
    return (
      <div>
        {props.doneList.map((item)=> (
              <Form action="/" className="flex flex-row justify-between py-1.5">
                <input className={styles.doneList} id={item.id} value={item.name} readOnly />
                <button type="submit" className="m-[10px] absolute">
                  <Image src="/ic/chFrame.svg" alt="todo" width={30} height={30} onClick={() => clickHandle(item)}/>
                </button>
              </Form>
            ))}
        </div>
      )
  }

  return (
		<div className='flex flex-row justify-between p-8'>
			<div>
				<Image src="/img/todo.svg" alt="todo" width={100} height={36} />
        {todoList.length > 0 ?
          <Todo todoList = {todoList}/>
        :
          <div>
          <Image src="/img/todoEmpty.svg" alt="empty" width={240} height={240}/>
          <p>할 일이 없어요. TODO를 새롭게 추가해주세요!</p>
          </div>
      }
      </div>

      <div>
        <Image src="/img/done.svg" alt="todo" width={100} height={36} />
        {doneList.length > 0 ?
          <Done doneList = {doneList}/>
        : 
          <div>
          <Image src="/img/doneEmpty.svg" alt="empty" width={240} height={240}/>
          <p>아직 다 한 일이 없어요. 해야 할 일을 체크해보세요!</p>
          </div>
          
        }	
			</div>
		</div>
  );
}
