// Mock data generation for buildAgent Analytics Dashboard

export const deployments = [
  { id: 'prod', name: 'Production', region: 'us-east-1' },
  { id: 'staging', name: 'Staging', region: 'us-east-1' },
  { id: 'dev', name: 'Development', region: 'us-west-2' },
];

export const agentNames = [
  'CodeAnalyzer',
  'BugHunter',
  'RefactorBot',
  'TestGen',
  'DocWriter',
  'SecurityScan',
  'PerformanceOpt',
  'DeployBot',
];

// Seeded random for consistent data
const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export const generateMetrics = (deploymentId, seed = 1) => {
  const multiplier = deploymentId === 'prod' ? 1 : deploymentId === 'staging' ? 0.6 : 0.2;
  const base = seed * multiplier;

  return {
    totalRequests: Math.floor((12500 + seededRandom(base) * 5000) * multiplier),
    avgResponseTime: Math.floor(850 + seededRandom(base + 1) * 600),
    successRate: Math.floor((92 + seededRandom(base + 2) * 6) * 10) / 10,
    totalCost: Math.floor((4500 + seededRandom(base + 3) * 2000) * multiplier * 100) / 100,
    requestsTrend: Math.floor((seededRandom(base + 4) - 0.3) * 20 * 10) / 10,
    responseTrend: Math.floor((seededRandom(base + 5) - 0.4) * 15 * 10) / 10,
    successTrend: Math.floor((seededRandom(base + 6) - 0.4) * 8 * 10) / 10,
    costTrend: Math.floor((seededRandom(base + 7) - 0.35) * 25 * 10) / 10,
  };
};

export const generateCostOverTime = (days = 30) => {
  const data = [];
  let baseCost = 150;

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    baseCost += (seededRandom(i * 0.1) - 0.45) * 20;
    baseCost = Math.max(baseCost, 80);

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      cost: Math.floor(baseCost * 100) / 100,
      requests: Math.floor(400 + seededRandom(i * 0.2) * 200),
    });
  }

  return data;
};

export const generateAgentActivity = () => {
  return agentNames.map((name, idx) => ({
    name,
    requests: Math.floor(800 + seededRandom(idx * 10) * 1500),
    successRate: Math.floor((85 + seededRandom(idx * 11) * 13) * 10) / 10,
  }));
};

export const generateResponseTimeDistribution = () => {
  const ranges = ['0-200ms', '200-400ms', '400-600ms', '600-800ms', '800-1000ms', '1000ms+'];
  return ranges.map((range, idx) => ({
    range,
    count: Math.floor(50 + seededRandom(idx * 7) * 200),
    avgTime: Math.floor(200 + idx * 150 + seededRandom(idx * 8) * 100),
  }));
};

export const generateSuccessRate = () => {
  return [
    { name: 'Successful', value: 94.2, color: '#10B981' },
    { name: 'Failed', value: 5.8, color: '#EF4444' },
  ];
};

export const generateAgentTableData = () => {
  const statuses = ['active', 'active', 'active', 'active', 'idle', 'idle', 'error', 'active'];

  return agentNames.map((name, idx) => ({
    id: idx + 1,
    name,
    requests: Math.floor(500 + seededRandom(idx * 5) * 2000),
    successRate: Math.floor((85 + seededRandom(idx * 6) * 14) * 10) / 10,
    avgCost: Math.floor((0.05 + seededRandom(idx * 7) * 0.15) * 1000) / 1000,
    avgDuration: Math.floor(600 + seededRandom(idx * 8) * 800),
    status: statuses[idx],
  }));
};

export const navItems = [
  { id: 'dashboard', name: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'agents', name: 'Agents', icon: 'Bot' },
  { id: 'deployments', name: 'Deployments', icon: 'Rocket' },
  { id: 'costs', name: 'Costs', icon: 'DollarSign' },
  { id: 'logs', name: 'Logs', icon: 'FileText' },
  { id: 'settings', name: 'Settings', icon: 'Settings' },
];
