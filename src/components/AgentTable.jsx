import { useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

export default function AgentTable({ data }) {
  const [sortConfig, setSortConfig] = useState({ key: 'requests', direction: 'desc' });

  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown size={14} />;
    }
    return sortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'status-active',
      idle: 'status-idle',
      error: 'status-error',
    };
    return <span className={`status-badge ${statusClasses[status]}`}>{status}</span>;
  };

  const columns = [
    { key: 'name', label: 'Agent Name' },
    { key: 'requests', label: 'Requests' },
    { key: 'successRate', label: 'Success Rate', suffix: '%' },
    { key: 'avgCost', label: 'Avg Cost', prefix: '$' },
    { key: 'avgDuration', label: 'Avg Duration', suffix: 'ms' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <div className="agent-table-container">
      <h3 className="table-title">Agent Behavior</h3>
      <div className="table-wrapper">
        <table className="agent-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th 
                  key={col.key}
                  onClick={() => col.key !== 'status' && handleSort(col.key)}
                  className={col.key !== 'status' ? 'sortable' : ''}
                >
                  <div className="th-content">
                    <span>{col.label}</span>
                    {col.key !== 'status' && getSortIcon(col.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((agent) => (
              <tr key={agent.id}>
                <td className="agent-name">{agent.name}</td>
                <td className="agent-requests">{agent.requests.toLocaleString()}</td>
                <td className="agent-success">{agent.successRate}%</td>
                <td className="agent-cost">${agent.avgCost}</td>
                <td className="agent-duration">{agent.avgDuration}ms</td>
                <td className="agent-status">{getStatusBadge(agent.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
