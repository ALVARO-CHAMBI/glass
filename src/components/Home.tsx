import React from 'react';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { LogOut, User, Bell, Settings, Search } from 'lucide-react';
import toast from 'react-hot-toast';

export const Home = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success('Signed out successfully');
    } catch (error: any) {
      toast.error('Error signing out');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <User className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Dashboard</span>
            </div>

            <div className="flex-1 max-w-xl px-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="h-6 w-6 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Settings className="h-6 w-6 text-gray-600" />
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Welcome Card */}
          <div className="col-span-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-2">
              Welcome back, {auth.currentUser?.email?.split('@')[0]}!
            </h2>
            <p className="opacity-90">Here's what's happening with your account today.</p>
          </div>

          {/* Stats Cards */}
          {[
            { title: 'Total Projects', value: '12', change: '+2 this week' },
            { title: 'Active Tasks', value: '8', change: '3 due today' },
            { title: 'Completed Tasks', value: '24', change: '+5 this month' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
            </div>
          ))}

          {/* Recent Activity */}
          <div className="col-span-full lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { action: 'Completed task', project: 'Website Redesign', time: '2 hours ago' },
                { action: 'Added new task', project: 'Mobile App', time: '4 hours ago' },
                { action: 'Updated project', project: 'Analytics Dashboard', time: 'Yesterday' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.project}</p>
                  </div>
                  <span className="text-sm text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {[
                { text: 'Create New Project', color: 'bg-blue-500' },
                { text: 'Add Task', color: 'bg-green-500' },
                { text: 'Schedule Meeting', color: 'bg-purple-500' }
              ].map((action, index) => (
                <button
                  key={index}
                  className={`w-full ${action.color} text-white py-2 px-4 rounded-lg hover:opacity-90 transition duration-200`}
                >
                  {action.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};