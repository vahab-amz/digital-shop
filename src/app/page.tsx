export default function Home() {
  // console.log('test')

  const render = () => {
    const name: string = 'Vahab';
    return <span>hi {name}</span>;
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div>my first page</div>
      {render()}
    </div>
  );
}
