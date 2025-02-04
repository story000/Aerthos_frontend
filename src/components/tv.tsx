'use client';

import { useEffect, useState, useRef } from 'react';
import { createChart, AreaSeries, CandlestickSeries } from 'lightweight-charts';
import Papa from 'papaparse';

interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}


export default function ChartComponent() {
  const [data, setData] = useState<CandleData[]>([]);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    Papa.parse('/data/latest_price.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        const parsedData = result.data as any[];
        
        const formattedData: CandleData[] = parsedData
          .map((row) => {
            if (!row || !row.date || typeof row.date !== 'string') {
              return null;  
            }
        
            return {
              time: row.date,
              open: row.open_bid ?? 0,
              high: row.high_bid ?? 0,
              low: row.low_bid ?? 0,
              close: row.close_bid ?? 0,
              volume: row.lastTradedVolume ?? 0,
            };
          })
          .filter((item) => item !== null); 

        setData(formattedData);
        console.log("formattedData", formattedData);
      },
    });
  }, []);

  useEffect(() => {
    if (data.length === 0 || !chartContainerRef.current) return;

    const chartOptions = {
      layout: {
        textColor: 'black',
        background: { type: 'solid', color: 'white' },
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
