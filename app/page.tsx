import Search from "./components/search";
import CheckList from "./components/checkList";

// 타입 정의
interface TodoItem {
  id: number;
  name: string;
  isCompleted: boolean;
}

export default async function Home() {
  const todoArray: TodoItem[] = []; // todo 아이템 배열 타입 지정
  const doneArray: TodoItem[] = []; // done 아이템 배열 타입 지정

  const response = await fetch(
    `https://assignment-todolist-api.vercel.app/api/mandoo/items`,
    {
      cache: "no-store", // Next.js 캐싱 무효화
    }
  );

  if (response.ok) {
    const responseData: TodoItem[] = await response.json(); // API에서 받은 데이터 타입 지정

    responseData.map((item) => {
      return item.isCompleted ? doneArray.push(item) : todoArray.push(item);
    });
  } else {
    throw new Error("Data fetching error");
  }

  return (
    <div>
      <Search />
      <CheckList todoList={todoArray} doneList={doneArray}></CheckList>
    </div>
  );
}
