import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

// Define the types for the data
interface DayStats {
  date: string;
  steps: number;
  activeKcal: number;
  totalKcal: number;
  workoutCount: number;
  workoutMinutes: number;
  workoutNames: string[];
}

// Helper function to format date
function ddmmyyyy(iso: string) {
  const [y, m, d] = iso.split('-');
  return `${d}-${m}-${y}`;
}

function App() {
  const [data, setData] = useState<DayStats[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch('/api/daily');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const jsonData = await res.json();
        const sortedData = [...jsonData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setData(sortedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    getData();
  }, []);

  const labels = data.map(r => ddmmyyyy(r.date));

  const stepsChartData = {
    labels,
    datasets: [{
      label: 'Steps',
      data: data.map(r => r.steps || 0),
      borderColor: '#5aa6ff',
      backgroundColor: (context: any) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(90,166,255,0.35)');
        gradient.addColorStop(1, 'rgba(90,166,255,0.02)');
        return gradient;
      },
      pointRadius: 0,
      borderWidth: 2,
      tension: 0.3,
      fill: true
    }]
  };

  const kcalChartData = {
    labels,
    datasets: [
      { label: 'Active kcal', data: data.map(r => r.activeKcal || 0), backgroundColor: '#4ac7a5' },
      { label: 'Total kcal', data: data.map(r => r.totalKcal || 0), backgroundColor: '#ff7b72' }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#eaeef7' } }, title: { display: true, color: '#eaeef7' }, tooltip: { mode: 'index' as const, intersect: false } },
    scales: { x: { ticks: { color: '#a6b1c2' }, grid: { color: 'rgba(255,255,255,0.05)' } }, y: { ticks: { color: '#a6b1c2' }, grid: { color: 'rgba(255,255,255,0.05)' } } }
  };

  return (
    <div className="App">
      <h1>🏃‍♂️ Daily Activity Overview</h1>
      <p className="subtle">“Total kcal” = Active kcal + 1745 (fixed baseline)</p>

      <div className="card">
        <Line options={{...chartOptions, plugins: {...chartOptions.plugins, title: {...chartOptions.plugins.title, text: 'Daily Steps'}}}} data={stepsChartData} />
      </div>

      <div className="card">
        <Bar options={{...chartOptions, plugins: {...chartOptions.plugins, title: {...chartOptions.plugins.title, text: 'Daily kcal (Active vs Total)'}}}} data={kcalChartData} />
      </div>

      <div className="card">
        <table id="data" className="display table-dark sticky-head" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Steps</th>
              <th>Active kcal</th>
              <th>Total kcal</th>
              <th># Workouts</th>
              <th>Minutes</th>
              <th>Workout Names</th>
            </tr>
          </thead>
          <tbody>
            {data.map(r => (
              <tr key={r.date}>
                <td data-order={r.date}>{ddmmyyyy(r.date)}</td>
                <td data-order={r.steps ?? 0}>{r.steps ?? 0}</td>
                <td data-order={r.activeKcal ?? 0}>{(r.activeKcal ?? 0).toFixed(0)}</td>
                <td data-order={r.totalKcal ?? 0}>{(r.totalKcal ?? 0).toFixed(0)}</td>
                <td data-order={r.workoutCount ?? 0}>{r.workoutCount ?? 0}</td>
                <td data-order={r.workoutMinutes ?? 0}>{(r.workoutMinutes ?? 0).toFixed(1)}</td>
                <td>{(r.workoutNames ?? []).join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;