import type { Meta, StoryObj } from '@storybook/react';

import { 
  ComposedChart,
  Bar,
  Line, XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
} from 'recharts';

import solDataWeek from '../mocks/solDataWeek.json';

const meta: Meta = {
  title: 'Charts/CandleChart',
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
            <XAxis dataKey="time_open" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
            
            <Tooltip />
            <Legend />

            <Bar yAxisId="right" dataKey="quote.USD.market_cap" name="Market Cap" fill="#64748b" width={8} />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              tickFormatter={(v) => `${(v / 1_000_000_000).toFixed(1)}B`} 
            />

            <YAxis yAxisId="left" domain={['dataMin', 'dataMax']} />
            <Line yAxisId="left" type="monotone" dataKey="quote.USD.open" name="Open" stroke="#3b82f6" />
            <Line yAxisId="left" type="monotone" dataKey="quote.USD.close" name="Close" stroke="#f59e0b" />
            <Line yAxisId="left" type="monotone" dataKey="quote.USD.high" name="High" stroke="#10b981" />
            <Line yAxisId="left" type="monotone" dataKey="quote.USD.low" name="Low" stroke="#ef4444" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  },
};
