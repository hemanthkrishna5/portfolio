import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Portfolio } from './pages/Portfolio';
import { Electronics } from './pages/Electronics';
import { Activity } from './pages/Activity';
import { Secrets } from './pages/Secrets';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="electronics" element={<Electronics />} />
        <Route path="activity" element={<Activity />} />
        <Route path="secrets" element={<Secrets />} />
      </Route>
    </Routes>
  );
}

export default App;
