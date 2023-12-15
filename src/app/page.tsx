export default async function Home() {
  const data = await fetch("http://localhost:3001/api/cached", {
    method: "GET",
  });

  const response = await data.json();

  console.log();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {response.data.data.map((data) => (
        <>{data.title}</>
      ))}
    </main>
  );
}
