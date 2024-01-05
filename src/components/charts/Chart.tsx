// import { useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";

interface AirPieChartProps {
  airtypeValue: string;
  airColor: string;
  airTitle: string;
}

const AirPieChart = ({
  airtypeValue,
  airColor,
  airTitle,
}: AirPieChartProps) => {
  const returnReveal = (airTitle: string) => {
    if (airTitle === "일산화탄소") {
      return 1.3;
    } else if (airTitle === "오존") {
      return 0.004;
    } else if (airTitle === "아황산가스") {
      return 0.13;
    } else if (airTitle === "이산화질소") {
      return 5;
    } else if (airTitle === "통합대기환경") {
      return 260;
    }
  };

  console.log(
    airTitle,
    airtypeValue,
    (Number(airtypeValue) / returnReveal(airTitle)) * 100
  );

  return (
    <PieChart
      data={[
        {
          // value: Number(airtypeValue) * 100,
          value:
            airTitle === "일산화탄소"
              ? Number(airtypeValue) * 100
              : airTitle === "오존"
              ? Number(airtypeValue) * 1000
              : airTitle === "아황산가스"
              ? Number(airtypeValue) * 1000
              : airTitle === "이산화질소"
              ? Number(airtypeValue) * 1000
              : airTitle === "통합대기환경"
              ? Number(airtypeValue)
              : 100,
          color: airColor,
          name: "name2",
        },
      ]}
      style={{ width: "80%", height: "80%", display: "inline-block" }}
      // reveal={Number(Number(airtypeValue) * 100)} // 퍼센트치수
      reveal={(Number(airtypeValue) / returnReveal(airTitle)) * 100}
      lineWidth={18} // 도넛 두께
      background="#f2f2f2"
      lengthAngle={360}
      totalValue={
        airTitle === "일산화탄소"
          ? 130
          : airTitle === "오존"
          ? 40
          : airTitle === "아황산가스"
          ? 130
          : airTitle === "이산화질소"
          ? 5
          : airTitle === "통합대기환경"
          ? 260
          : 130
      }
      startAngle={270}
      rounded
      animate
      // label={({ dataEntry }) => dataEntry.value}
      labelStyle={{
        fontSize: "26px",
        fontWeight: "600",
        fill: airColor,
      }}
      labelPosition={0}
    />
  );
};

export default AirPieChart;
