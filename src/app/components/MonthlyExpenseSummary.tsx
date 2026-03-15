import { DollarSign, TrendingUp, Calendar, Percent } from 'lucide-react';

interface MonthlyExpenseSummaryProps {
  totalBudget: number;
  totalSpent: number;
  expenseCount: number;
}

export function MonthlyExpenseSummary({ 
  totalBudget, 
  totalSpent, 
  expenseCount 
}: MonthlyExpenseSummaryProps) {
  const remaining = totalBudget - totalSpent;
  const percentage = Math.round((totalSpent / totalBudget) * 100);
  
  const currentMonth = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-600">Total Budget</p>
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <DollarSign size={20} className="text-blue-600" />
          </div>
        </div>
        <p className="text-2xl font-semibold text-gray-900">
          ${totalBudget.toLocaleString()}
        </p>
        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
          <Calendar size={12} />
          {currentMonth}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-600">Total Spent</p>
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <TrendingUp size={20} className="text-purple-600" />
          </div>
        </div>
        <p className="text-2xl font-semibold text-gray-900">
          ${totalSpent.toLocaleString()}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {expenseCount} {expenseCount === 1 ? 'expense' : 'expenses'} recorded
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-600">Remaining</p>
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            remaining < 0 ? 'bg-red-100' : 'bg-green-100'
          }`}>
            <DollarSign size={20} className={remaining < 0 ? 'text-red-600' : 'text-green-600'} />
          </div>
        </div>
        <p className={`text-2xl font-semibold ${
          remaining < 0 ? 'text-red-600' : 'text-gray-900'
        }`}>
          ${Math.abs(remaining).toLocaleString()}
          {remaining < 0 && ' over'}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {remaining >= 0 ? 'Available to spend' : 'Budget exceeded'}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-600">Budget Used</p>
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            percentage >= 90 ? 'bg-red-100' : percentage >= 75 ? 'bg-orange-100' : 'bg-green-100'
          }`}>
            <Percent size={20} className={
              percentage >= 90 ? 'text-red-600' : percentage >= 75 ? 'text-orange-600' : 'text-green-600'
            } />
          </div>
        </div>
        <p className={`text-2xl font-semibold ${
          percentage >= 90 ? 'text-red-600' : percentage >= 75 ? 'text-orange-600' : 'text-gray-900'
        }`}>
          {percentage}%
        </p>
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                percentage >= 90 ? 'bg-red-500' : percentage >= 75 ? 'bg-orange-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
