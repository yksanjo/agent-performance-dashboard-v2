import { Activity, Clock, CheckCircle, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

export default function MetricCards({ metrics }) {
  const cards = [
    {
      id: 'requests',
      label: 'Total Requests',
      value: metrics.totalRequests.toLocaleString(),
      trend: metrics.requestsTrend,
      icon: Activity,
      color: '#6366F1',
    },
    {
      id: 'response',
      label: 'Avg Response Time',
      value: `${metrics.avgResponseTime}ms`,
      trend: metrics.responseTrend,
      icon: Clock,
      color: '#F59E0B',
      invertTrend: true,
    },
    {
      id: 'success',
      label: 'Success Rate',
      value: `${metrics.successRate}%`,
      trend: metrics.successTrend,
      icon: CheckCircle,
      color: '#10B981',
    },
    {
      id: 'cost',
      label: 'Total Cost',
      value: `$${metrics.totalCost.toLocaleString()}`,
      trend: metrics.costTrend,
      icon: DollarSign,
      color: '#EC4899',
    },
  ];

  return (
    <div className="metric-cards">
      {cards.map((card) => {
        const Icon = card.icon;
        const isPositive = card.invertTrend ? card.trend < 0 : card.trend > 0;
        
        return (
          <div key={card.id} className="metric-card">
            <div className="metric-header">
              <div 
                className="metric-icon" 
                style={{ 
                  backgroundColor: `${card.color}20`,
                  color: card.color 
                }}
              >
                <Icon size={20} />
              </div>
              <div className={`metric-trend ${isPositive ? 'positive' : 'negative'}`}>
                {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span>{Math.abs(card.trend)}%</span>
              </div>
            </div>
            <div className="metric-value">{card.value}</div>
            <div className="metric-label">{card.label}</div>
          </div>
        );
      })}
    </div>
  );
}
