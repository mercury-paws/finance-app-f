import Menu from "./Menu/Menu";
import Name from "./Name/Name";

function Bar() {
  return (
    <>
      <p>
        hello, this is the Bar component in HomeStatsPage with the name and menu
        <Name />
        <Menu />
      </p>
    </>
  );
}

export default Bar;
