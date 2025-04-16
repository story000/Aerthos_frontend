'use client';

import { useEffect, useState, useRef } from 'react';
import {
  createChart,
  ColorType,
  IChartApi,
  CandlestickSeries,
} from 'lightweight-charts';

interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  buy_signal_rsi: boolean;
  buy_signal_macd: boolean;
  buy_signal_vol: boolean;
  buy_signal_bb: boolean;
  buy_signal_ma: boolean;
}

const SIGNAL_TYPES: (keyof CandleData)[] = [
  'buy_signal_rsi',
  'buy_signal_macd',
  'buy_signal_vol',
  'buy_signal_bb',
  'buy_signal_ma',
];

export default function ChartComponent() {
  const [data, setData] = useState<CandleData[]>([]);
  const [activeSignal, setActiveSignal] = useState<keyof CandleData | null>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  // Step 1: 拉取数据
  useEffect(() => {
    fetch('http://18.117.159.59:8000/signals/')
      .then((res) => res.json())
      .then((parsedData) => {
        const formatted: CandleData[] = parsedData
          .map((row: any) => {
            if (!row?.Date) return null;
            return {
              time: row.Date,
              open: row.Open ?? 0,
              high: row.High ?? 0,
              low: row.Low ?? 0,
              close: row.Price ?? 0,
              buy_signal_rsi: row.buy_signal_rsi ?? false,
              buy_signal_macd: row.buy_signal_macd ?? false,
              buy_signal_vol: row.buy_signal_vol ?? false,
              buy_signal_bb: row.buy_signal_bb ?? false,
              buy_signal_ma: row.buy_signal_ma ?? false,
            };
          })
          .filter(Boolean);
        setData(formatted);
      })
      .catch((err) => console.error('Data fetch error:', err));
  }, []);

  // Step 2: 初始化图表
  useEffect(() => {
    if (!chartContainerRef.current || data.length === 0) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'white' },
        textColor: 'black',
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });

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
    chartRef.current = chart;

    return () => chart.remove();
  }, [data]);

  // Step 3: 切换信号时画图形
  useEffect(() => {
    if (!chartRef.current || !activeSignal || data.length === 0) return;

    const chart = chartRef.current;
    chart.remove();

    data.forEach((item) => {
      if (item[activeSignal]) {
        chart.addShape({
          id: `${activeSignal}-${item.time}`,
          time: Math.floor(new Date(item.time).getTime() / 1000),
          price: item.low - 1, // 在 low 点下方画箭头
          shape: 'arrow_up',
          color: 'green',
          size: 1,
        });
      }
    });
  }, [activeSignal, data]);

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        {SIGNAL_TYPES.map((signal) => (
          <button
            key={signal}
            onClick={() =>
              setActiveSignal((prev) => (prev === signal ? null : signal))
            }
            style={{
              marginRight: 8,
              backgroundColor: activeSignal === signal ? '#26a69a' : '#ddd',
              color: activeSignal === signal ? 'white' : 'black',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {signal.toUpperCase()}
          </button>
        ))}
      </div>

      <div
        ref={chartContainerRef}
        style={{ width: '100%', height: '400px' }}
      />
    </div>
  );
}
