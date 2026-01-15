import { BarChart3, TrendingUp, Users, Briefcase } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'AI Requests', value: '1,234', icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
    { label: 'Active Jobs', value: '12', icon: Briefcase, color: 'from-green-500 to-emerald-500' },
    { label: 'Portfolio Items', value: '45', icon: Users, color: 'from-purple-500 to-pink-500' },
    { label: 'Credits Used', value: '89%', icon: BarChart3, color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back to NNIT AI Enterprise
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button className="btn btn-primary w-full text-left">
              Generate New Content
            </button>
            <button className="btn btn-secondary w-full text-left">
              Create Job Listing
            </button>
            <button className="btn btn-secondary w-full text-left">
              Add Portfolio Item
            </button>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Recent Activity
          </h2>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm font-medium">Text generation completed</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm font-medium">Image created successfully</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">5 hours ago</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm font-medium">Code debugging completed</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
