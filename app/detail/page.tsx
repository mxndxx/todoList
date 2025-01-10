'use client';

import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface DetailData {
  id: string;
  name: string;
  memo: string;
  isCompleted: boolean;
  imageUrl?: string;
}

export default function Detail() {
  const [detailData, setDetailData] = useState<DetailData | null>(null);
  const [nameValue, setNameValue] = useState<string | null>(null);
  const [memoValue, setMemoValue] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean | null>(null);
  const [imgSrc, setImgSrc] = useState<string>('/ic/imgEmpty.svg');  // 기본 이미지 설정

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // sessionStorage에서 detailData를 가져오는 useEffect
  useEffect(() => {
    const storedData = sessionStorage.getItem('detailData');
    if (storedData) {
      const parsedData: DetailData = JSON.parse(storedData);
      setDetailData(parsedData);
      setNameValue(parsedData.name);
      setMemoValue(parsedData.memo);
      setIsCompleted(parsedData.isCompleted);
      setImgSrc(parsedData.imageUrl || '/ic/imgEmpty.svg'); // 이미지 URL 초기화
    }
  }, []);

  // 파일 업로드 처리
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      // 파일 이름이 영어로만 이루어졌는지 확인 (영문자, 숫자, 하이픈, 밑줄만 허용)
      const fileNameRegex = /^[a-zA-Z0-9-_]+$/;
      if (!fileNameRegex.test(file.name.split('.')[0])) {
        alert('파일 이름은 영어로만 이루어져야 합니다.');
        return;
      }

      // 파일 크기 체크 (5MB 이하)
      if (file.size > 5 * 1024 * 1024) { // 5MB = 5 * 1024 * 1024 bytes
        alert('파일 크기는 5MB 이하이어야 합니다.');
        return;
      }

      // 조건이 모두 만족하면 미리보기 URL 설정
      setImgSrc(URL.createObjectURL(file));  // 미리보기용 URL 생성
    }
  };

  // 수정 버튼 클릭 시
  const modClick = async (id: string) => {
    let base64Image = imgSrc;  // 기존 이미지 URL

    // 새로운 이미지 파일이 선택되었으면 Base64로 변환하여 업로드
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        base64Image = reader.result as string;

        try {
          const response = await fetch(`https://assignment-todolist-api.vercel.app/api/mandoo/items/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: nameValue || "",
              memo: memoValue || "",
              imageUrl: base64Image,
              isCompleted: isCompleted,
            }),
          });

          if (response.ok) {
            const result = await response.json();
            console.log("수정 성공:", result);
            router.push('/');
          } else {
            console.error("수정 실패:", response.statusText);
          }
        } catch (error) {
          console.error("API 요청 중 오류 발생:", error);
        }
      };

      reader.readAsDataURL(file); // 파일을 Base64로 변환
    } else {
      // 파일이 변경되지 않으면 기존 이미지와 함께 수정 요청
      try {
        const response = await fetch(`https://assignment-todolist-api.vercel.app/api/mandoo/items/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nameValue || "",
            memo: memoValue || "",
            // imageUrl: base64Image, // 기존 이미지 URL 사용
            isCompleted: isCompleted,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("수정 성공:", result);
          router.push('/');
        } else {
          console.error("수정 실패:", response.statusText);
        }
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
      }
    }
  };

  // 삭제 버튼 클릭 시
  const delClick = async (id: string) => {
    try {
      const response = await fetch(`https://assignment-todolist-api.vercel.app/api/mandoo/items/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        console.log(`Item with id ${id} deleted successfully.`);
        router.push('/');
      } else {
        console.error('Failed to delete item:', response.statusText);
      }
    } catch (error) {
      console.error('Error occurred while deleting item:', error);
    }
  };

  // 이미지 클릭하여 파일 업로드
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex justify-center w-screen h-screen">
      <div className="w-[1200px] bg-white h-full px-[100px]">
        <div className="py-1.5 flex justify-center">
          {isCompleted ?
            <div className="flex justify-between">
              <input
                className="w-[1000px] h-[60px] bg-[#DDD6FE] border-2 border-black rounded-full text-center"
                defaultValue={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
              />
              <button type="submit" className="m-[15px] absolute" onClick={() => setIsCompleted(false)}>
                <Image src="/ic/chFrame.svg" alt="todo" width={30} height={30} />
              </button>
            </div>
            :
            <div className="flex justify-between">
              <input
                className="w-[1000px] h-[60px] bg-white border-2 border-black rounded-full text-center"
                defaultValue={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
              />
              <button type="submit" className="m-[15px] absolute" onClick={() => setIsCompleted(true)}>
                <Image src="/ic/chDefault.svg" alt="todo" width={30} height={30} />
              </button>
            </div>
          }
        </div>

        <div className="py-1.5 flex justify-center my-[10px]">
          <div className="flex flex-row justify-between">
            <div className="w-[380px] h-[300px] border-dashed border-2 border-[#CBD5E1] rounded-3xl bg-[#F8FAFC] relative">
              <Image src={imgSrc} alt="Uploaded Image" layout="fill" objectFit="cover" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <button
                type="button"
                className="w-[60px] h-[60px] bg-[#E2E8F0] rounded-full text-[#64748B] text-2xl font-bold absolute bottom-0 right-0 m-2"
                onClick={handleFileClick}
              >
                +
              </button>
            </div>

            <div className="w-[600px] h-[300px] rounded-3xl relative ml-[20px] bg-cover bg-[url('/img/memo.svg')] justify-center">
              <p className="text-center my-4 text-[#92400E] text-lg font-bold">Memo</p>
              <textarea
                className="bg-transparent w-full h-[200px] px-4"
                defaultValue={memoValue}
                onChange={(e) => setMemoValue(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
        {isCompleted ?
          <button
            type="submit"
            className="w-[168px] h-[56px] m-2 bg-[#BEF264] border-2 border-black rounded-full text-center"
            onClick={() => modClick(detailData?.id || '')}
          >
            수정하기
          </button>
          :
          <button
            type="submit"
            className="w-[168px] h-[56px] m-2 bg-[#E2E8F0] border-2 border-black rounded-full text-center"
            onClick={() => modClick(detailData?.id || '')}
          >
            수정하기
          </button>
        }
          <button
            type="submit"
            className="w-[168px] h-[56px] m-2 bg-[#F43F5E] border-2 border-black rounded-full text-center text-white"
            onClick={() => delClick(detailData?.id || '')}
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
}
