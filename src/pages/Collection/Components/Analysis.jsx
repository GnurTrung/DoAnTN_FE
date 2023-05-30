import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import Chart from "react-apexcharts";
import { useParams } from "react-router-dom";
import { getAnalysis } from "services/analysis";

const DATE_FORMAT = 'DD/MM HH:mm'
const menu = [
  {
    id: 1,
    text: `1D`,
  },
  {
    id: 2,
    text: `7D`,
  },

  {
    id: 3,
    text: `30D`,
  },
];

const Analysis = () => {
  const { id } = useParams();
  const param = {
    address: id,
    limit: "24",
  }
  const [data, setData] = useState([])
  const [option, setOption] = useState(param)
  const [activeID, setActiveID] = useState(1);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getData = async () => {
    try {
      const res = await getAnalysis(option)
      let data = res?.data?.data;
      data = data.map(x => ({ ...x, floorPrice: !x.floorPrice ? "0" : x.floorPrice }))
      setData(data.reverse())
    } catch (ex) {
      console.log(ex)
    }
  }
  useEffect(() => {
    getData();
  }, [activeID])

  const options = {
    dataLabels: {
      enabled: false
    },
    grid: {
      show: false
    },
    chart: {
      type: 'line',
      stacked: false,
    },
    stroke: {
      width: 1,
      curve: 'smooth'
    },
    plotOptions: {
      bar: {
        columnWidth: '50%'
      }
    },
    colors: ['#8358FF'],
    fill: {
      opacity: [0.3, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: "vertical",
        opacityFrom: 0.7,
        opacityTo: 0.1,
        stops: [0, 100, 100, 100]
      }
    },
    markers: {
      size: 0
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          colors: '#9998AC'
        }
      },
      categories: data?.map((item) => moment.unix(item.logTimestamp / 1000).format(DATE_FORMAT))
    },
    yaxis: {
      labels: {
        style: {
          colors: '#9998AC'
        }
      },
      width: '50%'
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(4) + " SUI";
          }
          return y;

        }
      }
    }
  }
  const series = [
    {
      name: 'Floor Price',
      type: 'area',
      data: data?.map((item) => parseInt(item.floorPrice) / (10 ** 9))
    }
  ];

  const optionColumns = {
    dataLabels: {
      enabled: false
    },
    grid: {
      show: false
    },
    chart: {
      type: 'line',
      stacked: false,
    },
    stroke: {
      width: [0, 2, 5],
      curve: 'smooth'
    },

    markers: {
      size: 0
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          colors: '#9998AC'
        }
      },
      categories: data?.map((item) => moment.unix(item.logTimestamp / 1000).format(DATE_FORMAT))
    },
    yaxis: {
      labels: {
        style: {
          colors: '#9998AC'
        }
      },

    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(4) + " SUI";
          }
          return y;

        }
      }
    }
  }

  const serieColumn = [
    {
      name: 'Volume',
      type: 'column',
      data: data?.map((item) => parseInt(item.totalVolume) / (10 ** 9)),
      color: "#8358FF",
    }
  ];

  const handleMenu = async (x) => {
    setActiveID(x)
    switch (x) {
      case 1:
        setOption({
          address: id,
          limit: "24",
        })
        break;
      case 2:
        setOption({
          address: id,
          limit: "7",
          getBy: "day-time"
        })
        break;
      case 3:
        setOption({
          address: id,
          limit: "30",
          getBy: "week-time"
        })
        break;
      default:
    }
  }

  const renderMenu = () => {
    return menu.map(item => (
      <li key={item.id} onClick={() => handleMenu(item.id)}>
        <div
          className={
            (item.id != activeID) ? 'hover:bg-[#323268] text-[#BABAC7] flex items-center !rounded-xl border p-2 dark:border-transparent font-semibold text-base cursor-pointer'
              : 'bg-[#323268] flex p-2 items-center !rounded-lg text-white font-semibold text-base cursor-pointer'
          }
        >
          <span>{item.text}</span>
        </div>
      </li>
    ))
  }
  return (
    <>
      <div className="analysis mt-8">
        <div className="flex justify-between items-center">
          <h3>Floor Price</h3>
          <ul className="flex flex-wrap items-center p-1 justify-start border border-[#2d2d3a] border-solid rounded-xl">
            {renderMenu()}
          </ul>
        </div>
        <Chart
          options={options}
          series={series}
          type="area"
          height={250}
          className="flex-1 w-full"
        />
      </div>
      <div className="analysis mt-8">
        <div className="flex justify-between items-center">
          <h3>Trading Volume</h3>
          <ul className="flex flex-wrap items-center justify-start border border-[#2d2d3a] border-solid rounded-xl">
            {renderMenu()}
          </ul>
        </div>
        <Chart
          options={optionColumns}
          series={serieColumn}
          type="area"
          height={250}
          className="flex-1 w-full"
        />
      </div>
    </>
  )
};

export default Analysis;
