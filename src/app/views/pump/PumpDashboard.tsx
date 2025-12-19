import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  AlertCircle,
  MapPin,
  Clock,
  Phone,
  Car,
  CheckCircle,
  XCircle,
  TrendingUp,
  Fuel,
  Users,
  DollarSign,
} from 'lucide-react';
import { toast } from 'sonner';

export default function PumpDashboard() {
  const [activeTab, setActiveTab] = useState('incoming');

  const stats = [
    { label: 'Today\'s Requests', value: '12', icon: AlertCircle, color: 'text-red-500' },
    { label: 'Active Services', value: '3', icon: Car, color: 'text-blue-500' },
    { label: 'Completed Today', value: '9', icon: CheckCircle, color: 'text-green-500' },
    { label: 'Total Earnings', value: '₹8,450', icon: DollarSign, color: 'text-purple-500' },
  ];

  const incomingRequests = [
    {
      id: '1',
      customer: 'Rahul Verma',
      phone: '+91 98765 43210',
      type: 'Fuel Empty',
      location: 'Andheri-Kurla Road, 2.3 km away',
      eta: '8 mins',
      urgent: true,
      description: 'Car stopped on highway, fuel tank empty',
      timestamp: '2 mins ago',
    },
    {
      id: '2',
      customer: 'Priya Shah',
      phone: '+91 98234 56789',
      type: 'Engine Issue',
      location: 'Linking Road, 4.1 km away',
      eta: '15 mins',
      urgent: false,
      description: 'Engine overheating, need mechanic',
      timestamp: '5 mins ago',
    },
  ];

  const activeServices = [
    {
      id: '3',
      customer: 'Amit Desai',
      type: 'Puncture',
      assignedTo: 'Service Van #1',
      status: 'En Route',
      eta: '5 mins',
    },
    {
      id: '4',
      customer: 'Neha Kapoor',
      type: 'Breakdown',
      assignedTo: 'Service Van #2',
      status: 'At Location',
      eta: 'Arrived',
    },
  ];

  const completedServices = [
    {
      id: '5',
      customer: 'Vikram Singh',
      type: 'Fuel Delivery',
      earnings: '₹850',
      rating: 5,
      completedAt: '30 mins ago',
    },
    {
      id: '6',
      customer: 'Anita Gupta',
      type: 'Tyre Change',
      earnings: '₹1,200',
      rating: 4,
      completedAt: '1 hour ago',
    },
  ];

  const handleAcceptRequest = (id: string) => {
    toast.success('Request accepted! Assigning service vehicle...');
  };

  const handleRejectRequest = (id: string) => {
    toast.info('Request declined');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">HP Petrol Pump Dashboard</h1>
            <p className="text-sm text-white/90">Andheri West, Mumbai</p>
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="incoming">
              Incoming ({incomingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="active">
              Active ({activeServices.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed
            </TabsTrigger>
          </TabsList>

          {/* Incoming Requests */}
          <TabsContent value="incoming" className="space-y-4">
            {incomingRequests.map((request) => (
              <Card key={request.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-bold">{request.customer}</h3>
                      {request.urgent && (
                        <Badge variant="destructive" className="animate-pulse">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Urgent
                        </Badge>
                      )}
                    </div>
                    <Badge className="mb-3">{request.type}</Badge>
                    <p className="text-sm mb-2">{request.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {request.timestamp}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <div>
                      <div className="font-medium">Location</div>
                      <div className="text-gray-600 dark:text-gray-400">{request.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Car className="w-4 h-4 text-blue-500" />
                    <div>
                      <div className="font-medium">ETA</div>
                      <div className="text-gray-600 dark:text-gray-400">{request.eta}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleRejectRequest(request.id)}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Decline
                  </Button>
                  <Button
                    onClick={() => handleAcceptRequest(request.id)}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Accept
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Active Services */}
          <TabsContent value="active" className="space-y-4">
            {activeServices.map((service) => (
              <Card key={service.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{service.customer}</h3>
                    <Badge className="mt-1">{service.type}</Badge>
                  </div>
                  <Badge className="bg-blue-500">{service.status}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-sm">
                    <div className="text-gray-600 dark:text-gray-400 mb-1">Assigned To</div>
                    <div className="font-medium">{service.assignedTo}</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-gray-600 dark:text-gray-400 mb-1">ETA</div>
                    <div className="font-medium">{service.eta}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Team
                  </Button>
                  <Button variant="outline">
                    <MapPin className="w-4 h-4 mr-2" />
                    Track
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Completed Services */}
          <TabsContent value="completed" className="space-y-4">
            {completedServices.map((service) => (
              <Card key={service.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{service.customer}</h3>
                    <Badge variant="outline" className="mt-1">{service.type}</Badge>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {service.completedAt}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{service.earnings}</div>
                    <div className="flex items-center text-sm text-yellow-500 mt-1">
                      <span>★ {service.rating} Rating</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Service Vehicles
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Response Rate
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <Fuel className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">45L</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Fuel Delivered Today
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
