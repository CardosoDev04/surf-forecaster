import { useEffect, useState } from "react";
import { getCurrentWaveForecast } from "../api-interaction/api-interaction";
import '../css/forecast-card.css'

export default function ForecastCard({ location, time, dataObj }) {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            let res = {};
            if (!time) {
                setData(dataObj)
            } else {
                res = await getCurrentWaveForecast(location.lat, location.long);
            }
            setData(formatData(res))
        }
        fetchData()
    }, []);

    function formatData(data) {
        const newHeight = data.height.toString().slice(0, -1) + "m";
        let newDirection = "";

        switch (true) {
            case (data.direction >= 0 && data.direction < 22.5) || (data.direction >= 337.5 && data.direction <= 360):
                newDirection = "N";
                break;
            case (data.direction >= 22.5 && data.direction < 67.5):
                newDirection = "NE";
                break;
            case (data.direction >= 67.5 && data.direction < 112.5):
                newDirection = "E";
                break;
            case (data.direction >= 112.5 && data.direction < 157.5):
                newDirection = "SE";
                break;
            case (data.direction >= 157.5 && data.direction < 202.5):
                newDirection = "S";
                break;
            case (data.direction >= 202.5 && data.direction < 247.5):
                newDirection = "SW";
                break;
            case (data.direction >= 247.5 && data.direction < 292.5):
                newDirection = "W";
                break;
            case (data.direction >= 292.5 && data.direction < 337.5):
                newDirection = "NW";
                break;
            default:
                newDirection = "Invalid direction";
        }

        const newPeriod = data.period + "s";
        return {
            height: newHeight,
            direction: newDirection,
            degrees: data.direction + "º",
            period: newPeriod
        }
    }

    return (
        <div className={"card"}>
            <div className={"quality-bar"}></div>
            <section>
                <h4 className={"relative-height"}>Head to 0.6m overhead</h4>
                <h1 className={"wave-height"}>{data.height}</h1>
                <h2 className={"condition"}>GOOD</h2>
            </section>
            <section>
                <h1 className={"cardinal-direction"}>{data.direction}</h1>
                <h2 className={"degrees"}>{data.degrees}</h2>
            </section>
        </div>
    )
}