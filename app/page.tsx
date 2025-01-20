import Search from './components/search'
import CheckList from './components/checkList'

// 타입 정의
interface TodoItem {
  id: number;
  name: string;
  isCompleted: boolean;
}

export default async function Home() {
  const todoArray: TodoItem[] = [];  // todo 아이템 배열 타입 지정
  const doneArray: TodoItem[] = [];  // done 아이템 배열 타입 지정
  let isEmpty: boolean = false;


  const response = await fetch("https://assignment-todolist-api.vercel.app/api/mandoo/items", {
    headers: {
      'Cache-Control': 'no-store', // 캐시를 사용하지 않도록 설정
    },
  });

  if (response.ok) {
    const responseData: TodoItem[] = await response.json();  // API에서 받은 데이터 타입 지정

    responseData.map((item) => {
      return item.isCompleted ? doneArray.push(item) : todoArray.push(item)
    })
    isEmpty = responseData.length === 0; // 데이터가 없으면 true
  } else {
    throw new Error("Data fetching error");
  }

  return (
    <div>
      <Search isEmpty={isEmpty}/>
      <CheckList todoList={todoArray} doneList={doneArray}></CheckList>
    </div>
  );
}
