// app/backtest/PlotlySignalChart.tsx

"use client";

import React from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js-basic-dist';
import dynamic from 'next/dynamic';
const Plot = dynamic(() =>
  import('react-plotly.js/factory').then((mod) =>
    mod.default(require('plotly.js-basic-dist'))
  ),
  { ssr: false }
);
interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  buy_signal_rsi: boolean;
}

const sampleData: CandleData[] = [
  { time: "2024-01-01", open: 100, high: 110, low: 95, close: 105, buy_signal_rsi: false },
  { time: "2024-01-02", open: 105, high: 112, low: 100, close: 110, buy_signal_rsi: true },
  { time: "2024-01-03", open: 110, high: 115, low: 108, close: 112, buy_signal_rsi: false },
  { time: "2024-01-04", open: 112, high: 118, low: 111, close: 117, buy_signal_rsi: true },
  { time: "2024-01-05", open: 117, high: 120, low: 114, close: 115, buy_signal_rsi: false }
];

export default function PlotlySignalChart() {
  const traceCandle = {
    x: sampleData.map(d => d.time),
    open: sampleData.map(d => d.open),
    high: sampleData.map(d => d.high),
    low: sampleData.map(d => d.low),
    close: sampleData.map(d => d.close),
    type: 'candlestick',
    name: 'Price',
  };

  const signalPoints = sampleData.filter(d => d.buy_signal_rsi);
  const traceSignals = {
    x: signalPoints.map(d => d.time),
    y: signalPoints.map(d => d.low - 2),
    mode: 'markers+text',
    name: 'Buy Signal (RSI)',
    marker: {
      color: 'green',
      size: 14,
      symbol: 'triangle-up'
    },
    text: Array(signalPoints.length).fill('↑'),
    textposition: 'bottom center',
    type: 'scatter'
  };

  return (
    <Plot
      data={[traceCandle as any, traceSignals as any]}
      layout={{
        title: 'Candlestick with RSI Buy Signal',
        xaxis: { type: 'category' },
        yaxis: { title: 'Price' },
        height: 600,
      }}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
