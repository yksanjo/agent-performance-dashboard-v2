import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MetricCards from './components/MetricCards';
import { CostOverTimeChart, AgentActivityChart, ResponseTimeChart, SuccessRateChart } from './components/Charts';
import AgentTable from './components/AgentTable';
import { 
  deployments, 
  generateMetrics, 
  generateCostOverTime, 
  generateAgentActivity, 
  generateResponseTimeDistribution, 
  generateSuccessRate, 
  generateAgentTableData 
} from './data/mockData';
import { RefreshCw, Calendar, Menu, X } from 'lucide-react';
import './App.css';

function App() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [selectedDeployment, setSelectedDeployment] = useState('prod');
  const [dateRange, setDateRange] = useState('30d');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [metrics, setMetrics] = useState(() => generateMetrics(selectedDeployment));
  const [costData, setCostData] = useState(() => generateCostOverTime());
  const [agentActivity, setAgentActivity] = useState(() => generateAgentActivity());
  const [responseTime, setResponseTime] = useState(() => generateResponseTimeDistribution());
  const [successRate, setSuccessRate] = useState(() => generateSuccessRate());
  const [agentTableData, setAgentTableData] = useState(() => generateAgentTableData());

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setMetrics(generateMetrics(selectedDeployment));
      setCostData(generateCostOverTime());
      setAgentActivity(generateAgentActivity());
      setResponseTime(generateResponseTimeDistribution());
      setSuccessRate(generateSuccessRate());
      setAgentTableData(generateAgentTableData());
      setIsRefreshing(false);
    }, 800);
  };

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(refreshData, 30000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  useEffect(() => {
    setMetrics(generateMetrics(selectedDeployment));
  }, [selectedDeployment]);

  return (
    <div className="app">
      <div className={`sidebar-overlay ${mobileMenuOpen ? 'visible' : ''}`} onClick={() => setMobileMenuOpen(false)} />
      
      <Sidebar 
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        deployments={deployments}
        selectedDeployment={selectedDeployment}
        setSelectedDeployment={setSelectedDeployment}
      />
      
      {mobileMenuOpen && (
        <div className="mobile-close">
          <button onClick={() => setMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
      )}

      <main className="main-content">
        <header className="content-header">
          <div className="header-left">
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <h1>Agent Performance</h1>
          </div>
          <div className="header-actions">
            <div className="date-range-selector">
              <Calendar size={16} />
              <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
            <button 
              className={`refresh-btn ${autoRefresh ? 'active' : ''}`}
              onClick={() => setAutoRefresh(!autoRefresh)}
              title="Auto-refresh every 30s"
            >
              <RefreshCw size={18} className={isRefreshing ? 'spinning' : ''} />
            </button>
          </div>
        </header>

        <section className="metrics-section">
          <MetricCards metrics={metrics} />
        </section>

        <section className="charts-section">
          <div className="charts-grid">
            <div className="chart-card">
              <CostOverTimeChart data={costData} />
            </div>
            <div className="chart-card">
              <AgentActivityChart data={agentActivity} />
            </div>
            <div className="chart-card">
              <ResponseTimeChart data={responseTime} />
            </div>
            <div className="chart-card">
              <SuccessRateChart data={successRate} />
            </div>
          </div>
        </section>

        <section className="table-section">
          <AgentTable data={agentTableData} />
        </section>
      </main>
    </div>
  );
}

export default App;
