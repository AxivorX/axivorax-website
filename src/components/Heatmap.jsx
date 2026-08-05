import React from 'react';
import './Heatmap.css';

export default function Heatmap() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm'];

  // Mock heatmap data (0-100 scale)
  const heatmapData = [
    [45, 65, 55, 75, 85, 40, 30],
    [50, 70, 60, 80, 90, 45, 35],
    [55, 75, 65, 85, 95, 50, 40],
    [60, 80, 70, 90, 100, 55, 45],
    [40, 50, 45, 65, 75, 35, 25],
    [35, 45, 40, 60, 70, 30, 20],
    [30, 40, 35, 55, 65, 25, 15],
    [25, 35, 30, 50, 60, 20, 10],
  ];

  const getIntensity = (value) => {
    if (value > 75) return 'hot';
    if (value > 50) return 'warm';
    if (value > 25) return 'cool';
    return 'cold';
  };

  return (
    <div className="heatmap-card">
      <h3 className="heatmap-title">Trading Activity Heatmap</h3>
      <p className="heatmap-subtitle">Win rate by time of day (higher = more winning trades)</p>

      <div className="heatmap-container">
        <table className="heatmap-table">
          <thead>
            <tr>
              <th>Time</th>
              {days.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour, hourIndex) => (
              <tr key={hour}>
                <td style={{ fontWeight: 700, textAlign: 'left' }}>{hour}</td>
                {days.map((day, dayIndex) => {
                  const value = heatmapData[hourIndex][dayIndex];
                  const intensity = getIntensity(value);
                  return (
                    <td key={`${hour}-${day}`}>
                      <div className={`heatmap-cell ${intensity}`} title={`${value}%`}>
                        {value}%
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="heatmap-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ background: 'rgba(59, 130, 246, 0.3)', border: '1px solid rgba(59, 130, 246, 0.5)' }}></div>
          <span className="legend-label">0-25% (Cold)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: 'rgba(34, 197, 94, 0.4)', border: '1px solid rgba(34, 197, 94, 0.5)' }}></div>
          <span className="legend-label">26-50% (Cool)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: 'rgba(251, 146, 60, 0.5)', border: '1px solid rgba(251, 146, 60, 0.6)' }}></div>
          <span className="legend-label">51-75% (Warm)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: 'rgba(239, 68, 68, 0.6)', border: '1px solid rgba(239, 68, 68, 0.7)' }}></div>
          <span className="legend-label">76-100% (Hot)</span>
        </div>
      </div>
    </div>
  );
}