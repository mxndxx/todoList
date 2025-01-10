'use client';
import styles from '../css/todo.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

interface TodoItem {
  id: number;
  name: string;
  isCompleted: boolean;
}

interface CheckListProps {
  todoList: TodoItem[];
  doneList: TodoItem[];
}

const ListItem = ({
  item,
  onDetailClick,
  onToggleComplete,
  buttonImage,
  buttonAlt,
}: {
  item: TodoItem;
  onDetailClick: (item: TodoItem) => void;
  onToggleComplete: (item: TodoItem) => void;
  buttonImage: string;
  buttonAlt: string;
}) => (
  <div className="flex justify-between py-1.5">
    <button type="button" onClick={() => onDetailClick(item)} className={styles.checkList}>
      {item.name}
    </button>
    <button type="button" className="m-[10px] absolute" onClick={() => onToggleComplete(item)}>
      <Image src={buttonImage} alt={buttonAlt} width={30} height={30} />
    </button>
  </div>
);

const EmptyState = ({ imageSrc, text }: { imageSrc: string; text: string }) => (
  <div className="flex flex-col justify-center items-center text-[#94A3B8]">
    <Image src={imageSrc} alt="empty" width={240} height={240} />
    <p>{text}</p>
  </div>
);

export default function CheckList({ todoList, doneList }: CheckListProps) {
  const router = useRouter();

  // 공통된 fetch 요청을 처리하는 함수
  const handleFetch = async (url: string, method: string, body: any = null) => {
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // 할 일 상태 업데이트 함수
  const clickHandle = async (data: TodoItem) => {
    const updatedItem = await handleFetch(
      `https://assignment-todolist-api.vercel.app/api/mandoo/items/${data.id}`,
      'PATCH',
      { isCompleted: !data.isCompleted }
    );

    if (updatedItem) {
      router.refresh();
    }
  };

  // 상세 페이지로 이동하는 함수
  const clickDetail = async (item: TodoItem) => {
    const detailData = await handleFetch(
      `https://assignment-todolist-api.vercel.app/api/mandoo/items/${item.id}`,
      'GET'
    );

    if (detailData) {
      sessionStorage.setItem('detailData', JSON.stringify(detailData));
      router.push('/detail');
    }
  };

  return (
    <div className="flex flex-row justify-center px-[100px]">
      {/* 할 일 리스트 */}
      <div className="w-[580px]">
        <Image src="/img/todo.svg" alt="todo" width={100} height={36} />
        {todoList.length > 0 ? (
          todoList.map((item) => (
            <ListItem
              key={item.id}
              item={item}
              onDetailClick={clickDetail}
              onToggleComplete={clickHandle}
              buttonImage="/ic/chDefault.svg"
              buttonAlt="todo"
            />
          ))
        ) : (
          <EmptyState
            imageSrc="/img/todoEmpty.svg"
            text="할 일이 없어요. TODO를 새롭게 추가해주세요!"
          />
        )}
      </div>

      {/* 완료한 일 리스트 */}
      <div className="w-[580px] pl-[10px]">
        <Image src="/img/done.svg" alt="done" width={100} height={36} />
        {doneList.length > 0 ? (
          doneList.map((item) => (
            <ListItem
              key={item.id}
              item={item}
              onDetailClick={clickDetail}
              onToggleComplete={clickHandle}
              buttonImage="/ic/chFrame.svg"
              buttonAlt="done"
            />
          ))
        ) : (
          <EmptyState
            imageSrc="/img/doneEmpty.svg"
            text="아직 다 한 일이 없어요. 해야 할 일을 체크해보세요!"
          />
        )}
      </div>
    </div>
  );
}
