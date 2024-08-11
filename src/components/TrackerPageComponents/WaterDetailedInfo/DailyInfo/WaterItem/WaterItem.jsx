function WaterItem({ ml, time }) {
  return (
    <>
      <p>{ml} ml</p>
      <p>{time}</p>
      <button>WaterModal</button>
      <button>DeleteWaterModal</button>
    </>
  );
}

export default WaterItem;
