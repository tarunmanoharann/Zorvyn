import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Sector,
  Legend
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

const COLORS = [
  '#6366f1', '#10b981', '#f43f5e', '#f59e0b', '#8b5cf6', 
  '#06b6d4', '#ec4899', '#84cc16', '#ef4444', '#3b82f6'
];

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={-8} textAnchor="middle" fill="#64748b" className="text-[10px] font-bold uppercase tracking-widest">
        {payload.name}
      </text>
      <text x={cx} y={cy} dy={20} textAnchor="middle" fill={fill} className="text-xl font-black tracking-tighter">
        ₹{value.toLocaleString('en-IN')}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 15}
        fill={fill}
      />
    </g>
  );
};

const SpendingBreakdownChart = () => {
  const { transactions } = useStore();
  const [activeIndex, setActiveIndex] = useState(0);

  const getChartData = () => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const totals = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    const totalExpense = Object.values(totals).reduce((sum, val) => sum + val, 0);

    return Object.entries(totals)
      .map(([name, value]) => ({
        name,
        value,
        percentage: ((value / totalExpense) * 100).toFixed(1)
      }))
      .sort((a, b) => b.value - a.value);
  };

  const chartData = getChartData();

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
                paddingAngle={4}
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white dark:bg-slate-900 p-3 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg">
                        <p className="text-xs font-bold text-slate-500 uppercase">{payload[0].name}</p>
                        <p className="text-sm font-black text-indigo-600">
                          ₹{payload[0].value.toLocaleString('en-IN')} ({payload[0].payload.percentage}%)
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Custom Legend */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {chartData.slice(0, 4).map((item, index) => (
            <div key={item.name} className="flex items-center gap-2">
              <div 
                className="w-2.5 h-2.5 rounded-full flex-shrink-0" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }} 
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">
                  {item.name}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingBreakdownChart;
