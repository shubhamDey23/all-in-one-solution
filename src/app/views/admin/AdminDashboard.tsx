import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Input } from '../../components/ui/input';
import {
  Users,
  Briefcase,
  Fuel,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  BarChart3,
  Settings,
} from 'lucide-react';

export default function AdminDashboard() {
  const kpis = [
    { label: 'Total Users', value: '45,231', change: '+12%', icon: Users, color: 'text-blue-500', trend: 'up' },
    { label: 'Active Workers', value: '3,456', change: '+8%', icon: Briefcase, color: 'text-green-500', trend: 'up' },
    { label: 'Petrol Pumps', value: '234', change: '+3', icon: Fuel, color: 'text-orange-500', trend: 'up' },
    { label: 'Total Revenue', value: '₹12.4L', change: '+23%', icon: DollarSign, color: 'text-purple-500', trend: 'up' },
  ];

  const emergencyRequests = [
    { id: '1', customer: 'Rahul Verma', type: 'Fuel Empty', location: 'Andheri', status: 'active', time: '2 mins ago' },
    { id: '2', customer: 'Priya Shah', type: 'Breakdown', location: 'Bandra', status: 'completed', time: '15 mins ago' },
    { id: '3', customer: 'Amit Kumar', type: 'Puncture', location: 'Kurla', status: 'pending', time: '5 mins ago' },
  ];

  const pendingVerifications = [
    { id: '1', name: 'Rajesh Kumar', type: 'Worker', category: 'Electrician', submitted: '2 hours ago' },
    { id: '2', name: 'Shell Petrol Pump', type: 'Pump', category: 'Service Provider', submitted: '5 hours ago' },
    { id: '3', name: 'Amit Singh', type: 'Worker', category: 'Plumber', submitted: '1 day ago' },
  ];

  const recentBookings = [
    { id: 'B001', customer: 'Neha Gupta', worker: 'Suresh Patel', service: 'Electrician', amount: '₹450', status: 'completed' },
    { id: 'B002', customer: 'Vikram Singh', worker: 'Rajesh Kumar', service: 'Plumber', amount: '₹650', status: 'in-progress' },
    { id: 'B003', customer: 'Anita Desai', worker: 'Amit Sharma', service: 'Mechanic', amount: '₹1,200', status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage users, services, and platform analytics
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-full bg-opacity-10 flex items-center justify-center ${kpi.color}`}>
                  <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
                <div className={`flex items-center text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                  <span>{kpi.change}</span>
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">{kpi.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{kpi.label}</div>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="workers">Workers</TabsTrigger>
            <TabsTrigger value="pumps">Pumps</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Emergency Requests */}
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Emergency Requests</h3>
                <div className="space-y-3">
                  {emergencyRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{request.customer}</div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <span>{request.type}</span>
                          <span>•</span>
                          <MapPin className="w-3 h-3" />
                          <span>{request.location}</span>
                        </div>
                      </div>
                      <Badge 
                        variant={request.status === 'completed' ? 'default' : request.status === 'active' ? 'secondary' : 'outline'}
                      >
                        {request.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Pending Verifications */}
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Pending Verifications</h3>
                <div className="space-y-3">
                  {pendingVerifications.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {item.type} • {item.category}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Recent Bookings */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Recent Bookings</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium">Booking ID</th>
                      <th className="pb-3 font-medium">Customer</th>
                      <th className="pb-3 font-medium">Worker</th>
                      <th className="pb-3 font-medium">Service</th>
                      <th className="pb-3 font-medium">Amount</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="border-b last:border-0">
                        <td className="py-3">{booking.id}</td>
                        <td className="py-3">{booking.customer}</td>
                        <td className="py-3">{booking.worker}</td>
                        <td className="py-3">{booking.service}</td>
                        <td className="py-3 font-semibold">{booking.amount}</td>
                        <td className="py-3">
                          <Badge variant={
                            booking.status === 'completed' ? 'default' : 
                            booking.status === 'in-progress' ? 'secondary' : 
                            'outline'
                          }>
                            {booking.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">User Management</h3>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input placeholder="Search users..." className="pl-10 w-64" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                User management interface with filters, search, and actions
              </p>
            </Card>
          </TabsContent>

          {/* Workers Tab */}
          <TabsContent value="workers">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Worker Management</h3>
                <Button>Add New Worker</Button>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Verify KYC, manage worker profiles, and track performance
              </p>
            </Card>
          </TabsContent>

          {/* Pumps Tab */}
          <TabsContent value="pumps">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Petrol Pump Management</h3>
                <Button>Add New Pump</Button>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Onboard pumps, manage service vehicles, and monitor response times
              </p>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Revenue Analytics</h3>
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>
                <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-center text-gray-500">
                    <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                    <p>Revenue Chart Placeholder</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Emergency Heatmap</h3>
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p>Heatmap Placeholder</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
