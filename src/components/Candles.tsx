import React from 'react';
import { 
  Scatter,
  useYAxisDomain,
  usePlotArea,
} from 'recharts';
import { scaleLinear } from 'd3-scale';

type QuoteDatum = {
  open: number;
  high: number;
  low: number;
  close: number;
  market_cap: number;
};

export type CandleDatum = {
  time_open: string;
  time_close?: string;
  time_high?: string;
  time_low?: string;
  quote: QuoteDatum;
};

export type CandleDataKeys = {
  open: string;
  high: string;
  low: string;
  close: string;
};

export type CandlesProps = {
  data: CandleDatum[];
  xAxisId: string;
  yAxisId: string;
  upColor?: string;
  downColor?: string;
  name?: string; // for legend
};

const CandleStick: React.FC<any> = (props) => {
  const {
    x,
    width,
    payload,
    upColor = '#16a34a',
    downColor = '#dc2626',
    yAxisId,
  } = props;

  const plotArea = usePlotArea();

  console.log("CandleStick", payload);

  // const xAxisDomain = useXAxisDomain(xAxisId);
  const yAxisDomain = useYAxisDomain(yAxisId);
  if (!yAxisDomain) return null;

  const yScale = scaleLinear().domain(yAxisDomain).range([plotArea?.height ?? 0, 0]);

  const isUp = payload.quote.close >= payload.quote.open;
  const color = isUp ? upColor : downColor;

  const yHigh = yScale(payload.quote.high);
  const yLow = yScale(payload.quote.low);
  const yOpen = yScale(payload.quote.open);
  const yClose = yScale(payload.quote.close);

  

  const bodyTop = Math.min(yOpen, yClose);
  const bodyBottom = Math.max(yOpen, yClose);
  const bodyHeight = Math.max(1, bodyBottom - bodyTop);

  return (
    <g>
      <line x1={x + width / 2} x2={x + width / 2} y1={yHigh} y2={yLow} stroke={color} strokeWidth={1} />      
      <rect
        x={x}
        y={bodyTop}
        width={width}
        height={bodyHeight}
        fill={color}
        stroke={color}
      />
    </g>
  );
};

export const Candles: React.FC<CandlesProps> = ({
  data,
  xAxisId,
  yAxisId,
  upColor = '#16a34a',
  downColor = '#dc2626',
  name = 'Candles',
}) => {
  // return (
  //   <Customized
  //     component={(componentProps: any) => {
  //       console.log("Candles componentProps", componentProps);

  //       return null;
  //     }}
  //   />
  // );

  return (
    <Scatter
      name={name}
      data={data}
      xAxisId={xAxisId}
      yAxisId={yAxisId}
      shape={(shapeProps: any) => {
        console.log("Candles shapeProps", shapeProps);

        return (
          <CandleStick
            {...shapeProps}
            xAxisId={xAxisId}
            yAxisId={yAxisId}
            upColor={upColor}
            downColor={downColor}
          />
        );
      }}
    />
  );
};

export default Candles;


