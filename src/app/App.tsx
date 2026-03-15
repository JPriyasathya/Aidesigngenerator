import { useState, useEffect } from 'react';
import { AddExpenseForm } from './components/AddExpenseForm';
import { DepartmentBudgetTable } from './components/DepartmentBudgetTable';
import { MonthlyExpenseSummary } from './components/MonthlyExpenseSummary';
import { BudgetAlert } from './components/BudgetAlert';
import { Wallet } from 'lucide-react';

interface Expense {
  id: string;
  department: string;
  amount: number;
  description: string;
  date: string;
}

interface Department {
  name: string;
  budget: number;
  spent: number;
}

interface Alert {
  id: string;
  department: string;
  message: string;
  type: 'warning' | 'danger';
}

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', department: 'Marketing', amount: 4500, description: 'Social media campaign', date: '2026-03-10' },
    { id: '2', department: 'Engineering', amount: 8200, description: 'Cloud infrastructure', date: '2026-03-12' },
    { id: '3', department: 'Sales', amount: 3100, description: 'CRM subscription', date: '2026-03-13' },
  ]);

  const [departments, setDepartments] = useState<Department[]>([
    { name: 'Marketing', budget: 15000, spent: 0 },
    { name: 'Engineering', budget: 25000, spent: 0 },
    { name: 'Sales', budget: 12000, spent: 0 },
    { name: 'Operations', budget: 10000, spent: 0 },
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Calculate department spending and generate alerts
  useEffect(() => {
    const updatedDepartments = departments.map((dept) => {
      const deptExpenses = expenses.filter((exp) => exp.department === dept.name);
      const spent = deptExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      return { ...dept, spent };
    });

    setDepartments(updatedDepartments);

    // Generate alerts
    const newAlerts: Alert[] = [];
    updatedDepartments.forEach((dept) => {
      const percentage = (dept.spent / dept.budget) * 100;
      
      if (dept.spent > dept.budget) {
        newAlerts.push({
          id: `alert-${dept.name}`,
          department: dept.name,
          message: `Budget exceeded by $${(dept.spent - dept.budget).toLocaleString()}. Immediate action required.`,
          type: 'danger',
        });
      } else if (percentage >= 90) {
        newAlerts.push({
          id: `alert-${dept.name}`,
          department: dept.name,
          message: `${Math.round(percentage)}% of budget used. Only $${(dept.budget - dept.spent).toLocaleString()} remaining.`,
          type: 'warning',
        });
      }
    });

    setAlerts(newAlerts);
  }, [expenses]);

  const handleAddExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
    };
    setExpenses([...expenses, newExpense]);
  };

  const handleDismissAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  const totalBudget = departments.reduce((sum, dept) => sum + dept.budget, 0);
  const totalSpent = departments.reduce((sum, dept) => sum + dept.spent, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md">
              <Wallet size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Budget Planner</h1>
              <p className="text-sm text-gray-500">Manage your departmental budgets</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Alerts */}
          <BudgetAlert alerts={alerts} onDismiss={handleDismissAlert} />

          {/* Monthly Summary */}
          <MonthlyExpenseSummary
            totalBudget={totalBudget}
            totalSpent={totalSpent}
            expenseCount={expenses.length}
          />

          {/* Add Expense Form */}
          <AddExpenseForm
            onAddExpense={handleAddExpense}
            departments={departments.map((d) => d.name)}
          />

          {/* Department Budget Table */}
          <DepartmentBudgetTable departments={departments} />
        </div>
      </main>
    </div>
  );
}
