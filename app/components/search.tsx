'use client';
import React, { useState, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';

interface SearchProps {
  isEmpty: boolean;
}

export default function Search({ isEmpty }: SearchProps) {
  const [inputValue, setInputValue] = useState<string>('');  // 상태값의 타입을 string으로 설정
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // 중복 제출 방지 상태
  const router = useRouter();

  // activeEnter 함수의 이벤트 매개변수 타입을 KeyboardEvent로 지정
  const activeEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !isSubmitting) {
      setIsSubmitting(true);
      create();
    }
  };

  // 새로운 할 일 항목을 추가하는 함수
  const create = async (): Promise<void> => {
    if (!inputValue.trim()) {
      alert('할 일을 입력해주세요!');
      setIsSubmitting(false);  // 입력값이 없으면 제출 중 상태 해제
      return;
    }
    try {
      const response = await fetch("https://assignment-todolist-api.vercel.app/api/mandoo/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "name": inputValue,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("성공:", result);
        router.refresh(); // 새로고침
        setInputValue(''); // 입력 필드 초기화
        setIsSubmitting(false); // 제출 완료 후 상태 해제
      } else {
        console.error("아이템 추가 실패:", response.statusText);
        setIsSubmitting(false); // 실패한 경우에도 제출 중 상태 해제
      }
    } catch (error) {
      console.error("API 요청 중 에러 발생:", error);
      setIsSubmitting(false); // 에러 발생 시 상태 해제
    }
  };

  // 버튼 스타일 클래스명 설정
  const buttonClass = isEmpty 
    ? "ml-[10px] w-[168px] h-[56px] bg-[#7C3AED] border-2 border-r-8 border-b-8 border-black rounded-full text-center text-white" 
    : "ml-[10px] w-[168px] h-[56px] bg-[#E2E8F0] border-2 border-r-8 border-b-8 border-black rounded-full text-center";

  return (
    <div className="flex justify-center py-4 px-[100px]">
      <div className="flex flex-row">
        <input
          className="w-[1000px] h-[56px] px-[20px] bg-[#F1F5F9] border-2 border-r-8 border-b-8 border-black rounded-full"
          value={inputValue} // 상태값을 input의 value로 설정
          onChange={(e) => setInputValue(e.target.value)} // 상태값 업데이트
          onKeyDown={(e) => activeEnter(e)} // Enter 키 이벤트 처리
          name="memo"
          placeholder="할 일을 입력해주세요."
        />
        <button 
          type="button" 
          className={buttonClass}
          onClick={() => { 
            if (!isSubmitting) {
              setIsSubmitting(true);
              create();
            }
          }}
        >
          + 추가하기
        </button>
      </div>
    </div>
  );
}
