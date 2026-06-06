// src/pages/Admin.jsx
import { LayoutDashboard, Package, ShoppingBag, Users } from 'lucide-react';

export default function Admin() {
  // Mock data for the UI
  const recentOrders = [];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <LayoutDashboard className="text-amber-600 dark:text-amber-400" size={32} />
        <h1 className="text-3xl font-bold text-amber-900 dark:text-white">Admin Dashboard</h1>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-amber-100 dark:border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-slate-400 text-sm font-medium">Total Revenue</p>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">₹8,400.00</h3>
            </div>
            <div className="p-3 bg-amber-100 dark:bg-slate-700 rounded-lg">
              <ShoppingBag className="text-amber-600 dark:text-amber-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-amber-100 dark:border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-slate-400 text-sm font-medium">Active Orders</p>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">1</h3>
            </div>
            <div className="p-3 bg-amber-100 dark:bg-slate-700 rounded-lg">
              <Users className="text-amber-600 dark:text-amber-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-amber-100 dark:border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-slate-400 text-sm font-medium">Menu Items</p>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">4</h3>
            </div>
            <div className="p-3 bg-amber-100 dark:bg-slate-700 rounded-lg">
              <Package className="text-amber-600 dark:text-amber-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-amber-100 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-slate-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-900/50">
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-slate-300">Order ID</th>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-slate-300">Customer</th>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-slate-300">Items</th>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-slate-300">Date</th>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-slate-300">Total</th>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-slate-300">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition">
                  <td className="p-4 font-medium text-gray-800 dark:text-slate-200">{order.id}</td>
                  <td className="p-4 text-gray-600 dark:text-slate-400">{order.name}</td>
                  <td className="p-4 text-gray-600 dark:text-slate-400">{order.items}</td>
                  <td className="p-4 text-gray-600 dark:text-slate-400">{order.date}</td>
                  <td className="p-4 font-medium text-gray-800 dark:text-slate-200">{order.total}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'Pending' 
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' 
                        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}