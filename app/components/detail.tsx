import Form from 'next/form';
import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react';

export default function Detail(props: any) {
	const [imgSrc, setImgSrc] = useState('/ic/imgEmpty.svg')
	const fileRef = useRef<HTMLInputElement>(null);
	const [detailData, setDetailData] = useState(null);

  useEffect(() => {
    const data = sessionStorage.getItem('detailData');
		console.log("sessionStorage:", sessionStorage);
		// console.log("데이터는 ",data);
    if (data) {
      setDetailData(JSON.parse(data));
			// console.log(detailData);
    }
  }, []);

	const handleChange = (e: React.ChangeEvent) => {
    const file = (e.target as HTMLInputElement).files as FileList;
    console.log(file)
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      return new Promise((resolve) => {
        reader.onload = () => {
          setImgSrc(reader.result);
          resolve();
        };
      });
    }
  }
	const handleClick = () => {
    console.log("클릭 ")
    fileRef?.current?.click();
  }

	return (
		<div className="py-1.5 flex justify-center">
			<Form action="/" className="flex flex-row justify-between">
				<div className='w-[380px] h-[300px] border-dashed border-2 border-[#CBD5E1] rounded-lg bg-[#F8FAFC] relative'>
				<Image src={imgSrc} alt="" fill />
				<input className="hidden" type="file" accept="image/*" ref={fileRef} onChange={handleChange}/>
				<button type='button' className="w-[60px] h-[60px] bg-[#E2E8F0] rounded-full text-[#64748B] text-2xl font-bold absolute bottom-0 right-0 m-2" onClick={handleClick}>+</button>
		</div>

				<div className='w-[600px] h-[300px] rounded-lg relative bg-cover bg-[url("/img/memo.svg")] justify-center'>
					<p className='text-center my-4 text-[#92400E] text-lg font-bold'>{JSON.stringify(detailData)}</p>
					<textarea className='bg-transparent w-full h-full px-4' value={props.detailData.name}> </textarea>
				</div>
			</Form>
		</div>
	);
}