import type { Meta, StoryObj } from '@storybook/react';

import { 
  ComposedChart,
  Line,
  XAxis, 
  Bar,
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
} from 'recharts';
import { Candles } from './Candles';

import solDataWeek from '../mocks/solDataWeek.json';
import solDataMonth from '../mocks/solDataMonth.json';

const meta: Meta = {
  title: 'Charts/CandleChart',
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Week: Story = {
  render: () => {
    return (
      <div style={{ width: 800, height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={solDataWeek}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis xAxisId="timeOpen" dataKey="time_open" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
            
            <Tooltip />

            <YAxis yAxisId="left" domain={['dataMin', 'dataMax']} />
            <Line yAxisId="left" type="monotone" dataKey="quote.open" name="Open" stroke="#3b82f6" />
            <Line yAxisId="left" type="monotone" dataKey="quote.close" name="Close" stroke="#f59e0b" />
            <Line yAxisId="left" type="monotone" dataKey="quote.high" name="High" stroke="#10b981" />
            <Line yAxisId="left" type="monotone" dataKey="quote.low" name="Low" stroke="#ef4444" />

            <Candles
              data={solDataWeek}
              xAxisId="timeOpen"
              yAxisId="left"
              name="Candles"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  },
};

export const Month: Story = {
  render: () => {
    return (
      <div style={{ width: 800, height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={solDataMonth}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis xAxisId="timeOpen" dataKey="time_open" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
            
            <Tooltip />

            <YAxis yAxisId="left" domain={['dataMin', 'dataMax']} />
            <Line yAxisId="left" type="monotone" dataKey="quote.open" name="Open" stroke="#3b82f6" />
            <Line yAxisId="left" type="monotone" dataKey="quote.close" name="Close" stroke="#f59e0b" />
            <Line yAxisId="left" type="monotone" dataKey="quote.high" name="High" stroke="#10b981" />
            <Line yAxisId="left" type="monotone" dataKey="quote.low" name="Low" stroke="#ef4444" />

            <Candles
              data={solDataMonth}
              xAxisId="timeOpen"
              yAxisId="left"
              name="Candles"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  },
};

export const WithBarsAndLines: Story = {
  render: () => {
    return (
      <div style={{ width: 700, height: 360 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={solDataWeek}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis xAxisId="timeOpen" dataKey="time_open" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
            
            <Tooltip />
            <Legend />

            <Bar yAxisId="right" dataKey="quote.market_cap" name="Market Cap" fill="#64748b" width={8} />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              tickFormatter={(v) => `${(v / 1_000_000_000).toFixed(1)}B`} 
            />

            <Candles
              data={solDataWeek}
              xAxisId="timeOpen"
              yAxisId="left"
              name="Candles"
            />
            
            <YAxis yAxisId="left" domain={[150, 180]} />
            <Line yAxisId="left" type="monotone" dataKey="quote.open" name="Open" stroke="#3b82f6" />
            <Line yAxisId="left" type="monotone" dataKey="quote.close" name="Close" stroke="#f59e0b" />
            <Line yAxisId="left" type="monotone" dataKey="quote.high" name="High" stroke="#10b981" />
            <Line yAxisId="left" type="monotone" dataKey="quote.low" name="Low" stroke="#ef4444" />

          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  },
};
