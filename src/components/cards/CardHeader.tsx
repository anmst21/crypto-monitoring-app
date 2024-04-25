export default function CardHeader() {
  return (
    <div className="mb-8 flex flex-row justify-between font-semibold inline-block">
      <div className="flex-1 flex justify-center">
        <h1>Name</h1>
      </div>
      <div className="flex-1 flex justify-center">
        <h1>Price</h1>
      </div>
      <div className="flex-1 flex justify-center">
        <h1>Change</h1>
      </div>
      <div className="flex-1 flex justify-center">
        <h1>Market Cap</h1>
      </div>
      <div className="flex-1 flex justify-center">
        <h1>Volume</h1>
      </div>
    </div>
  );
}
