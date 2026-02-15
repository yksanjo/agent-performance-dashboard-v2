import { useState } from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  Rocket, 
  DollarSign, 
  FileText, 
  Settings,
  ChevronDown,
  Search,
  Hexagon
} from 'lucide-react';

const iconMap = {
  LayoutDashboard,
  Bot,
  Rocket,
  DollarSign,
  FileText,
  Settings,
};

export default function Sidebar({ 
  activeNav, 
  setActiveNav, 
  deployments, 
  selectedDeployment, 
  setSelectedDeployment 
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'agents', name: 'Agents', icon: 'Bot' },
    { id: 'deployments', name: 'Deployments', icon: 'Rocket' },
    { id: 'costs', name: 'Costs', icon: 'DollarSign' },
    { id: 'logs', name: 'Logs', icon: 'FileText' },
    { id: 'settings', name: 'Settings', icon: 'Settings' },
  ];

  const selectedDeploymentData = deployments.find(d => d.id === selectedDeployment);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <Hexagon size={28} strokeWidth={2} />
          </div>
          <span className="logo-text">Performance Dashboard</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <button
              key={item.id}
              className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
              onClick={() => setActiveNav(item.id)}
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-deployments">
        <label className="deploy-label">DEPLOYMENT</label>
        <div className="deploy-dropdown">
          <button 
            className="deploy-trigger"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="deploy-info">
              <span className="deploy-name">{selectedDeploymentData?.name}</span>
              <span className="deploy-region">{selectedDeploymentData?.region}</span>
            </div>
            <ChevronDown size={16} className={`chevron ${dropdownOpen ? 'open' : ''}`} />
          </button>
          
          {dropdownOpen && (
            <div className="deploy-menu">
              {deployments.map((deploy) => (
                <button
                  key={deploy.id}
                  className={`deploy-option ${selectedDeployment === deploy.id ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedDeployment(deploy.id);
                    setDropdownOpen(false);
                  }}
                >
                  <Search size={14} />
                  <div className="deploy-option-info">
                    <span>{deploy.name}</span>
                    <span className="region">{deploy.region}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="sidebar-footer">
        <button className="nav-item settings">
          <Settings size={18} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}
