'use client';
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
  isCompleted,
}: {
  item: TodoItem;
  onDetailClick: (item: TodoItem) => void;
  onToggleComplete: (item: TodoItem) => void;
  buttonImage: string;
  buttonAlt: string;
  isCompleted: boolean;
}) => (
  <div className={'flex justify-between py-1.5'}>
    <button type="button" onClick={() => onDetailClick(item)} className={`w-full h-[50px] border-2 border-black rounded-full ${isCompleted ? 'bg-[#EDE9FE] line-through': 'bg-white'}`}>
      {item.name}
    </button>
    <button type="button" className="m-[10px] absolute" onClick={() => onToggleComplete(item)}>
      <Image src={buttonImage} alt={buttonAlt} width={30} height={30} />
    </button>
  </div>
);

const EmptyState = ({ imageSrc, text }: { imageSrc: string; text: string }) => (
  <div className="flex flex-col justify-center items-center text-[#94A3B8]">
    <div className="w-[120px] h-[120px] md:w-[240px] md:h-[240px] relative">
      <Image
        src={imageSrc}
        alt="empty"
        layout="fill" // 부모의 크기에 맞게 자동으로 조정
        objectFit="contain" // 비율 유지하며 크기 조정
      />
    </div>
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
    <div className="flex flex-col xl:flex-row justify-center xl:justify-between px-[100px]">
      {/* 할 일 리스트 */}
      <div className="w-full xl:w-[580px]">
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
              isCompleted={item.isCompleted}
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
      <div className="w-full xl:w-[580px] pt-[40px] xl:pt-0">
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
              isCompleted={item.isCompleted}
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
