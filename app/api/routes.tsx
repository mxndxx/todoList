export default async function GET(id) {
  const response = await fetch("https://assignment-todolist-api.vercel.app/api/mandoo/items/"+id);
  if (response.ok) {
    const responseData = await response.json();
    console.log("api단 ::", responseData);
    return responseData
    } else {
    throw new Error("Data fetching error");
  }
}

