
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendData } from '../types';

const data: TrendData[] = [
  { year: 2010, standalone: 90, integrated: 10 },
  { year: 2015, standalone: 80, integrated: 20 },
  { year: 2020, standalone: 60, integrated: 40 },
  { year: 2024, standalone: 45, integrated: 55 },
  { year: 2028, standalone: 20, integrated: 80 },
  { year: 2030, standalone: 5, integrated: 95 },
];

const TrendChart: React.FC = () => {
  return (
    <div className="h-64 w-full mt-6">
      <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-4">
        Market Paradigm Shift: Search Modalities
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorStandalone" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorIntegrated" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
          <YAxis stroke="#94a3b8" fontSize={12} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
            itemStyle={{ fontSize: '12px' }}
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
          <Area type="monotone" dataKey="standalone" name="Standalone Search" stroke="#3b82f6" fillOpacity={1} fill="url(#colorStandalone)" />
          <Area type="monotone" dataKey="integrated" name="Integrated OS/SaaS" stroke="#10b981" fillOpacity={1} fill="url(#colorIntegrated)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
