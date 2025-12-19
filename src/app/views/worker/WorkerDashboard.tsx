import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Switch } from '../../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  DollarSign,
  Briefcase,
  Star,
  MapPin,
  Clock,
  Phone,
  Navigation,
  TrendingUp,
  Calendar,
} from 'lucide-react';
import { toast } from 'sonner';

export default function WorkerDashboard() {
  const [isAvailable, setIsAvailable] = useState(true);

  const stats = [
    { label: 'Today\'s Earnings', value: '₹2,340', icon: DollarSign, color: 'text-green-500' },
    { label: 'Jobs Today', value: '8', icon: Briefcase, color: 'text-blue-500' },
    { label: 'Average Rating', value: '4.8', icon: Star, color: 'text-yellow-500' },
    { label: 'This Month', value: '₹45,600', icon: TrendingUp, color: 'text-purple-500' },
  ];

  const incomingRequests = [
    {
      id: '1',
      customer: 'Priya Sharma',
      service: 'Electrical Repair',
      distance: '1.2 km',
      price: '₹450',
      description: 'Kitchen light not working',
      urgent: true,
    },
    {
      id: '2',
      customer: 'Rohit Mehta',
      service: 'Wiring Installation',
      distance: '2.5 km',
      price: '₹800',
      description: 'New room wiring needed',
      urgent: false,
    },
  ];

  const activeJobs = [
    {
      id: '3',
      customer: 'Anita Desai',
      service: 'Fan Installation',
      address: 'Andheri West, Mumbai',
      status: 'in-progress',
    },
  ];

  const completedJobs = [
    {
      id: '4',
      customer: 'Vikram Singh',
      service: 'Switch Repair',
      earnings: '₹350',
      rating: 5,
      date: '2 hours ago',
    },
    {
      id: '5',
      customer: 'Neha Gupta',
      service: 'Electrical Checkup',
      earnings: '₹500',
      rating: 4,
      date: '4 hours ago',
    },
  ];

  const handleAcceptJob = (id: string) => {
    toast.success('Job accepted! Navigate to customer location.');
  };

  const handleRejectJob = (id: string) => {
    toast.info('Job declined');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Worker Dashboard</h1>
              <p className="text-sm text-white/90">Rajesh Kumar - Electrician</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm">{isAvailable ? 'Available' : 'Offline'}</span>
              <Switch
                checked={isAvailable}
                onCheckedChange={setIsAvailable}
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-xs text-white/80">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="requests">
              New Requests ({incomingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="active">
              Active ({activeJobs.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed
            </TabsTrigger>
          </TabsList>

          {/* New Requests */}
          <TabsContent value="requests" className="space-y-4">
            {!isAvailable && (
              <Card className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200">
                <p className="text-center text-yellow-800 dark:text-yellow-200">
                  You are currently offline. Turn on availability to receive job requests.
                </p>
              </Card>
            )}
            
            {incomingRequests.map((request) => (
              <Card key={request.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-bold">{request.customer}</h3>
                      {request.urgent && (
                        <Badge variant="destructive">Urgent</Badge>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">{request.service}</p>
                    <p className="text-sm">{request.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{request.price}</div>
                    <div className="text-xs text-gray-500">Estimated</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {request.distance} away
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    ~15 mins
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {}}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleRejectJob(request.id)}
                  >
                    Decline
                  </Button>
                  <Button
                    onClick={() => handleAcceptJob(request.id)}
                  >
                    Accept
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Active Jobs */}
          <TabsContent value="active" className="space-y-4">
            {activeJobs.map((job) => (
              <Card key={job.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{job.customer}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{job.service}</p>
                  </div>
                  <Badge className="bg-blue-500">In Progress</Badge>
                </div>

                <div className="flex items-center space-x-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{job.address}</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline">
                    <Navigation className="w-4 h-4 mr-2" />
                    Navigate
                  </Button>
                  <Button>
                    Complete
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Completed Jobs */}
          <TabsContent value="completed" className="space-y-4">
            {completedJobs.map((job) => (
              <Card key={job.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{job.customer}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{job.service}</p>
                    <p className="text-xs text-gray-500 mt-1">{job.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-green-600">{job.earnings}</div>
                    <div className="flex items-center text-sm text-yellow-500 mt-1">
                      <Star className="w-4 h-4 fill-current mr-1" />
                      <span>{job.rating} Rating</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Bottom Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <Button variant="outline" size="lg">
            <Calendar className="w-5 h-5 mr-2" />
            View Schedule
          </Button>
          <Button variant="outline" size="lg">
            <DollarSign className="w-5 h-5 mr-2" />
            Wallet & Payouts
          </Button>
        </div>
      </div>
    </div>
  );
}
