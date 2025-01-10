'use client';
import styles from '../css/todo.module.css';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckList(props: any) {
  const { todoList, doneList } = props;
  const [detailData, setDetailData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    console.log('Detail data updated:', detailData);
  }, [detailData]);

  async function clickHandle(data) {
    try {
      const response = await fetch(
        `https://assignment-todolist-api.vercel.app/api/mandoo/items/${data.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isCompleted: !data.isCompleted }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log('Update successful:', result);
        router.refresh(); // 새로고침
      } else {
        console.error('Failed to update:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating:', error);
    }
  }

  async function clickDetail(item) {
    try {
      console.log('Fetching detail data for ID:', item.id); // 디버깅용 로그
      const response = await fetch(
        `https://assignment-todolist-api.vercel.app/api/mandoo/items/${item.id}`
      );

      if (!response.ok) {
        console.error(
          `Failed to fetch detail data. Status: ${response.status} - ${response.statusText}`
        );
        return;
      }

      const responseData = await response.json();
      console.log('Fetched detail data:', responseData);

      // 상태 업데이트
      setDetailData(responseData);

      // 디테일 페이지로 이동
      router.push({
        pathname: '/detail',
        query: { data: JSON.stringify(item) },
      });
    } catch (error) {
      console.error('Error fetching detail data:', error);
    }
  }

  function TodoList({ items }) {
    return (
      <div>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between py-1.5">
            <button
              type="button"
              onClick={() => clickDetail(item)}
              className={styles.checkList}
            >
              {item.name}
            </button>
            <button
              type="button"
              className="m-[10px]"
              onClick={() => clickHandle(item)}
            >
              <Image
                src="/ic/chDefault.svg"
                alt="todo"
                width={30}
                height={30}
              />
            </button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-row justify-between p-8">
      <div>
        <Image src="/img/todo.svg" alt="todo" width={100} height={36} />
        {todoList.length > 0 ? (
          <TodoList items={todoList} />
        ) : (
          <div>
            <Image
              src="/img/todoEmpty.svg"
              alt="empty"
              width={240}
              height={240}
            />
            <p>할 일이 없어요. TODO를 새롭게 추가해주세요!</p>
          </div>
        )}
      </div>

      <div>
        <Image src="/img/done.svg" alt="done" width={100} height={36} />
        {doneList.length > 0 ? (
          <TodoList items={doneList} />
        ) : (
          <div>
            <Image
              src="/img/doneEmpty.svg"
              alt="empty"
              width={240}
              height={240}
            />
            <p>아직 다 한 일이 없어요. 해야 할 일을 체크해보세요!</p>
          </div>
        )}
      </div>
    </div>
  );
}
