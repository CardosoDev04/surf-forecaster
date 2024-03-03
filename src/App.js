import ForecastCard from "./components/ForecastCard";
import './css/app.css'

const testLocation = {
    name: "São João da Caparica",
  lat : 38.659727,
  long : -9.25404
}

function App() {

  return (
    <>
        <h1 className={"flex justify-center mt-[150px] font-bold text-5xl"}>{testLocation.name}</h1>
      <div className={"card-div"}>
      <ForecastCard location={testLocation} time={"current"}/>
      </div>
    </>
  );
}

export default App;
