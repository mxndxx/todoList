
import styles from './css/todo.module.css'
import Image from 'next/image'
import Form from 'next/form'
import Search from './components/search'
import CheckList from './components/checkList'
import Link from "next/link";
// import { useRouter } from 'next/navigation'
// async function getData() {
// 	const response = await fetch('https://assignment-todolist-api.vercel.app/api ');
    
//   if (!response.ok) {
//       console.log("api 확인")
//  		throw new Error('Failed to fetch data')   
//     }
//     return response.json()
// }

// export default async function Page() {
// 	const data = await getData()
    
//     return <main></main>
// }
// const insert = () => {
//   console.log(true);
// };

// const insert = () => {
//   console.log("true");
// };

export default async function Home() {
  // const router = useRouter();
  let todoArray = [];
  let doneArray = [];
  const response = await fetch("https://assignment-todolist-api.vercel.app/api/mandoo/items");
  if (response.ok) {
    const responseData = await response.json();
    console.log("responseData ::", responseData);

    responseData.map((item) => {
      return item.isCompleted ? doneArray.push(item) : todoArray.push(item)
    })
    } else {
    throw new Error("Data fetching error");
  }

  return (
    <div>
      <div className={styles.gnb}>
        
        {/* <Image src="/img/logo.svg" alt="로고" width={150} height={40} onClick={() => router.push('/')}/> */}
        <Link href="/">
          <Image src="/img/logo.svg" alt="로고" width={150} height={40} />
        </Link>
      </div>
      <Search/>
      <CheckList todoList={todoArray} doneList={doneArray}></CheckList>
    </div>
  
  );
}
