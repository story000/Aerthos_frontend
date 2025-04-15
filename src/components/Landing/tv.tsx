'use client';

import { useEffect, useState, useRef } from 'react';
import { createChart, CandlestickSeries, ColorType } from 'lightweight-charts';
import Papa from 'papaparse';

interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}


export default function ChartComponent() {
  const [data, setData] = useState<CandleData[]>([]);
  const chartContainerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    fetch('http://18.117.159.59:8000/data/carbon/')
      .then(response => response.json())
      .then((parsedData: any[]) => {
        const formattedData: CandleData[] = parsedData
          .map((row) => {
            if (!row || !row.Date || typeof row.Date !== 'string') {
              return null;
            }

            return {
              time: row.Date,
              open: row.Open ?? 0,
              high: row.High ?? 0,
              low: row.Low ?? 0,
              close: row.Price ?? 0, // 使用 Price 作为收盘价
            };
          })
          .filter((item) => item !== null);

        setData(formattedData);
        console.log("formattedData", formattedData);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (data.length === 0 || !chartContainerRef.current) return;

    const chartOptions = {
      layout: {
        textColor: 'black',
        background: { type: ColorType.Solid, color: 'white' },
      },
    };
    const chart = createChart(chartContainerRef.current, chartOptions);


    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    candlestickSeries.setData(data.map((item) => ({
      time: item.time,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    })));


    chart.timeScale().fitContent();

    return () => chart.remove();
  }, [data]);

  return <div ref={chartContainerRef} style={{ width: '100%', height: '400px' }} />;
}
