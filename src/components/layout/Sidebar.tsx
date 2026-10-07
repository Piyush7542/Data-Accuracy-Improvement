import { 
  LayoutDashboard, 
  Database, 
  CheckCircle, 
  Eraser, 
  AlignLeft, 
  Copy, 
  CheckCircle2, 
  BarChart2, 
  GitCompare, 
  AlertTriangle, 
  Info,
  X,
  BarChart2 as BarChartIcon,
  Github,
  ExternalLink
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { PAGES } from '../../utils/constants';
import { InlineSyntheticBadge } from '../ui/SyntheticDataBadge';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'layout-dashboard': LayoutDashboard,
  'database': Database,
  'check-circle': CheckCircle,
  'eraser': Eraser,
  'align-left': AlignLeft,
  'copy': Copy,
  'check-circle-2': CheckCircle2,
  'bar-chart-2': BarChart2,
  'git-compare': GitCompare,
  'alert-triangle': AlertTriangle,
  'info': Info,
};

const NAV_ITEMS = PAGES.filter(p => p.id !== 'about');

export function Sidebar({ onClose }: { onClose: () => void }) {
  const location = useLocation();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-neutral-200 transform transition-transform duration-200 lg:translate-x-0" aria-label="Sidebar navigation">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" onClick={onClose}>
            <BarChartIcon className="w-6 h-6 text-primary-600" />
            <span className="font-semibold text-neutral-900 text-sm">Data Quality</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-neutral-500 hover:text-neutral-700"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1" aria-label="Main navigation">
          {NAV_ITEMS.map((page) => {
            const isActive = location.pathname === `/${page.id}` || (page.id === 'executive' && location.pathname === '/');
            const Icon = ICON_MAP[page.icon] || LayoutDashboard;
            return (
              <Link
                key={page.id}
                to={`/${page.id}`}
                onClick={onClose}
                className={cn('sidebar-link', isActive && 'sidebar-link-active')}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                {page.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200">
          <div className="space-y-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-neutral-600 hover:text-primary-600"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-neutral-600 hover:text-primary-600"
            >
              <ExternalLink className="w-5 h-5" />
              Live Demo
            </a>
          </div>
          <InlineSyntheticBadge />
        </div>
      </div>
    </aside>
  );
}