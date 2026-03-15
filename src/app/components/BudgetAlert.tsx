import { AlertCircle, X } from 'lucide-react';

interface Alert {
  id: string;
  department: string;
  message: string;
  type: 'warning' | 'danger';
}

interface BudgetAlertProps {
  alerts: Alert[];
  onDismiss: (id: string) => void;
}

export function BudgetAlert({ alerts, onDismiss }: BudgetAlertProps) {
  if (alerts.length === 0) return null;

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`rounded-xl shadow-sm p-4 border flex items-start gap-3 ${
            alert.type === 'danger'
              ? 'bg-red-50 border-red-200'
              : 'bg-orange-50 border-orange-200'
          }`}
        >
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
              alert.type === 'danger' ? 'bg-red-100' : 'bg-orange-100'
            }`}
          >
            <AlertCircle
              size={20}
              className={alert.type === 'danger' ? 'text-red-600' : 'text-orange-600'}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold mb-1 ${
                alert.type === 'danger' ? 'text-red-900' : 'text-orange-900'
              }`}
            >
              {alert.department} Budget Alert
            </h3>
            <p
              className={`text-sm ${
                alert.type === 'danger' ? 'text-red-700' : 'text-orange-700'
              }`}
            >
              {alert.message}
            </p>
          </div>
          <button
            onClick={() => onDismiss(alert.id)}
            className={`flex-shrink-0 p-1 rounded-lg transition hover:bg-white/50 ${
              alert.type === 'danger' ? 'text-red-600' : 'text-orange-600'
            }`}
          >
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}
