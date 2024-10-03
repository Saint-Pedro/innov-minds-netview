"use client";

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const generateMockData = () => {
  return {
    timestamp: new Date().toLocaleTimeString(),
    latency: Math.random() * 100,
    throughput: Math.random() * 1000,
    utilization: Math.random() * 100
  };
};

const NetworkDashboard = () => {
  const [data, setData] = useState([]);
  const [currentMetrics, setCurrentMetrics] = useState({ latency: 0, throughput: 0, utilization: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateMockData();
      setCurrentMetrics(newData);
      setData(prevData => [...prevData.slice(-19), newData]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord des performances réseau</h1>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold">Latence</h2>
          <p className="text-2xl font-bold">{currentMetrics.latency.toFixed(2)} ms</p>
        </div>
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold">Débit</h2>
          <p className="text-2xl font-bold">{currentMetrics.throughput.toFixed(2)} Mbps</p>
        </div>
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold">Utilisation</h2>
          <p className="text-2xl font-bold">{currentMetrics.utilization.toFixed(2)}%</p>
        </div>
      </div>
      <div className="border rounded-lg p-4">
        <h2 className="text-xl font-bold mb-2">Graphique des performances réseau</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="latency" stroke="#8884d8" name="Latence (ms)" />
              <Line type="monotone" dataKey="throughput" stroke="#82ca9d" name="Débit (Mbps)" />
              <Line type="monotone" dataKey="utilization" stroke="#ffc658" name="Utilisation (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default NetworkDashboard;