import Bar from "./Bar/Bar.jsx";
import Consumption from "./Consumption/Consumption.jsx";
import Calendar from "./Calendar/Calendar.jsx";

function HomeStatsPage() {
  return (
    <>
      <p>
        hello, this is the HomeStatsPage with name, daily consumption of water
        and calendar
      </p>
      <Bar />
      <Consumption />
      <Calendar />
    </>
  );
}

export default HomeStatsPage;
