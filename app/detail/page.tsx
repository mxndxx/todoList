"use client";

import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface DetailData {
  id: string;
  name: string;
  memo: string;
  isCompleted: boolean;
  imageUrl?: string;
}

export default function Detail() {
  const [detailData, setDetailData] = useState<DetailData | null>(null);
  const [nameValue, setNameValue] = useState<string>("");
  const [memoValue, setMemoValue] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>("/ic/imgEmpty.svg");

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem("detailData");
    if (storedData) {
      const parsedData: DetailData = JSON.parse(storedData);
      setDetailData(parsedData);
      setNameValue(parsedData.name);
      setMemoValue(parsedData.memo);
      setIsCompleted(parsedData.isCompleted);
      setImgSrc(parsedData.imageUrl || "/ic/imgEmpty.svg");
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const fileNameRegex = /^[a-zA-Z0-9-_]+$/;
      if (!fileNameRegex.test(file.name.split(".")[0])) {
        alert("파일 이름은 영어로만 이루어져야 합니다.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하이어야 합니다.");
        return;
      }
      setImgSrc(URL.createObjectURL(file));
    }
  };

  const modClick = async () => {
    const file = fileInputRef.current?.files?.[0];
    let base64Image = imgSrc;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        base64Image = reader.result as string;
        await updateItem(base64Image);
      };
      reader.readAsDataURL(file);
    } else {
      await updateItem(base64Image);
    }
  };

  const updateItem = async (base64Image: string) => {
    try {
      const response = await fetch(
        `https://assignment-todolist-api.vercel.app/api/mandoo/items/${detailData?.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nameValue,
            memo: memoValue,
            imageUrl: base64Image,
            isCompleted,
          }),
        }
      );

      if (response.ok) {
        router.push("/");
      } else {
        console.error("수정 실패:", response.statusText);
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
    }
  };

  const delClick = async () => {
    try {
      const response = await fetch(
        `https://assignment-todolist-api.vercel.app/api/mandoo/items/${detailData?.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        router.push("/");
      } else {
        console.error("삭제 실패:", response.statusText);
      }
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
  };

  return (
    <div className="flex justify-center w-screen h-screen">
      <div className="w-full xl:w-[1200px] bg-white h-fit xl:h-full px-4 sm:px-[100px]">
        <div className="w-full my-2 h-[60px] flex items-center">
          <input
            className={`w-full h-[60px] rounded-full border-2 text-center ${
              isCompleted
                ? "bg-[#DDD6FE] border-black"
                : "bg-white border-black"
            }`}
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
          <button
            type="button"
            className="m-[15px] absolute"
            onClick={() => setIsCompleted(!isCompleted)}
          >
            <Image
              src={isCompleted ? "/ic/chFrame.svg" : "/ic/chDefault.svg"}
              alt="toggle"
              width={30}
              height={30}
            />
          </button>
        </div>

        {/* 이미지와 메모 div */}
        <div className="py-2 flex flex-col xl:flex-row justify-between my-[10px]">
          <div className="w-full xl:w-[380px] h-[300px] border-dashed border-2 border-[#CBD5E1] rounded-3xl bg-[#F8FAFC] relative flex justify-center items-center overflow-hidden">
            {imgSrc === "/ic/imgEmpty.svg" ? (
              <Image
                src={imgSrc}
                alt="Uploaded Image"
                width={64} // 기본 이미지 크기
                height={64} // 기본 이미지 크기
              />
            ) : (
              <Image
                src={imgSrc}
                alt="Uploaded Image"
                layout="fill"
                objectFit="none"
              />
            )}
            <input
              type="file"
              className="hidden"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            {imgSrc == "/ic/imgEmpty.svg" ? (
              <button
                type="button"
                className="w-[60px] h-[60px] bg-[#E2E8F0] rounded-full text-[#64748B] text-2xl font-bold absolute bottom-0 right-0 m-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <p>+</p>
              </button>
            ) : (
              <button
                type="button"
                className="w-[60px] h-[60px] bg-[#0F172A80] rounded-full text-[#64748B] absolute bottom-0 right-0 m-2 flex justify-center items-center border-2 border-black"
                onClick={() => fileInputRef.current?.click()}
              >
                <Image src={"/ic/edit.svg"} alt="수정" width={24} height={24} />
              </button>
            )}
          </div>

          <div className="w-full xl:w-[600px] h-[300px] rounded-3xl relative bg-cover bg-[url('/img/memo.svg')] justify-center mt-[20px] xl:mt-0">
            <p className="text-center my-4 text-[#92400E] text-lg font-bold">
              Memo
            </p>
            <textarea
              className="bg-transparent w-full h-[200px] px-4"
              value={memoValue}
              onChange={(e) => setMemoValue(e.target.value)}
            />
          </div>
        </div>

        {/* 수정 및 삭제 버튼 */}
        <div className="flex flex-row justify-center xl:justify-end">
          <button
            type="submit"
            className={`w-[168px] h-[56px] m-2 flex flex-row justify-center items-center ${
              isCompleted ? "bg-[#BEF264]" : "bg-[#E2E8F0]"
            } border-2 border-black rounded-full text-center`}
            onClick={modClick}
          >
            <Image src={"/ic/check.svg"} alt="수정" width={18} height={18} />
            수정완료
          </button>
          <button
            type="submit"
            className="w-[168px] h-[56px] m-2 flex flex-row justify-center items-center bg-[#F43F5E] border-2 border-black rounded-full text-center text-white"
            onClick={delClick}
          >
            <Image src={"/ic/X.svg"} alt="수정" width={18} height={18} />
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
}
