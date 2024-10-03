"use client";

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const generateMockData = () => {
  const baseValue = Math.random() * 100;
  const anomaly = Math.random() > 0.9; // 10% chance of anomaly
  return {
    timestamp: new Date().toLocaleTimeString(),
    value: anomaly ? baseValue * (Math.random() * 5 + 2) : baseValue,
    isAnomaly: anomaly
  };
};

const AnomalyDetection = () => {
  const [data, setData] = useState([]);
  const [anomalies, setAnomalies] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateMockData();
      setData(prevData => {
        const updatedData = [...prevData.slice(-19), newData];
        if (newData.isAnomaly) {
          setAnomalies(prevAnomalies => [...prevAnomalies, newData]);
        }
        return updatedData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Détection d'anomalies IA</h1>
      <div className="mb-4 border rounded-lg p-4">
        <h2 className="text-xl font-bold mb-2">Graphique de performance réseau</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" name="Valeur" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="border rounded-lg p-4">
        <h2 className="text-xl font-bold mb-2">Anomalies détectées</h2>
        {anomalies.map((anomaly, index) => (
          <div key={index} className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-2">
            <p className="font-bold">Anomalie détectée</p>
            <p>Une valeur anormale de {anomaly.value.toFixed(2)} a été détectée à {anomaly.timestamp}.</p>
          </div>
        ))}
        {anomalies.length === 0 && <p>Aucune anomalie détectée pour le moment.</p>}
      </div>
    </div>
  );
};

export default AnomalyDetection;