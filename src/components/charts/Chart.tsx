import { PieChart } from "react-minimal-pie-chart";

interface AirPieChartProps {
  airtypeValue: string;
  airColor: string;
}

const AirPieChart = ({ airtypeValue, airColor }: AirPieChartProps) => {
  return (
    <PieChart
      data={[
        {
          value: Number(airtypeValue) * 100,
          color: airColor,
          name: "name2",
        },
      ]}
      style={{ width: "80%", height: "80%", display: "inline-block" }}
      reveal={Number(Number(airtypeValue) * 100)} // 퍼센트치수
      lineWidth={18} // 도넛 두께
      background="#f2f2f2"
      lengthAngle={360}
      totalValue={130}
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
