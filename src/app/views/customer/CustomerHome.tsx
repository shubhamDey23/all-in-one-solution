import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  MapPin,
  Search,
  Zap,
  Droplet,
  Wrench,
  Sparkles,
  Hammer,
  PaintBucket,
  AlertCircle,
  Sun,
  Moon,
  Clock,
  Star,
  Fuel,
  Car,
} from 'lucide-react';
import { useTheme } from '../../components/ThemeProvider';

export default function CustomerHome() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const serviceCategories = [
    { id: 'electrician', name: 'Electrician', icon: Zap, color: 'text-yellow-500' },
    { id: 'plumber', name: 'Plumber', icon: Droplet, color: 'text-blue-500' },
    { id: 'mechanic', name: 'Mechanic', icon: Wrench, color: 'text-gray-700' },
    { id: 'cleaner', name: 'Cleaner', icon: Sparkles, color: 'text-purple-500' },
    { id: 'carpenter', name: 'Carpenter', icon: Hammer, color: 'text-orange-500' },
    { id: 'painter', name: 'Painter', icon: PaintBucket, color: 'text-pink-500' },
  ];

  const emergencyTypes = [
    { id: 'fuel', name: 'Fuel Empty', icon: Fuel, color: 'bg-red-500' },
    { id: 'engine', name: 'Engine Issue', icon: AlertCircle, color: 'bg-orange-500' },
    { id: 'puncture', name: 'Puncture', icon: Car, color: 'bg-yellow-500' },
    { id: 'breakdown', name: 'Breakdown', icon: Wrench, color: 'bg-red-600' },
  ];

  const recentBookings = [
    { id: 1, service: 'Electrician', worker: 'Rajesh Kumar', status: 'completed', rating: 5 },
    { id: 2, service: 'Plumber', worker: 'Amit Singh', status: 'in-progress', rating: 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Service Connect</h1>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span>Mumbai, Maharashtra</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="What service do you need?"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Emergency Section */}
        <Card className="p-6 bg-gradient-to-r from-red-500 to-orange-500 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Emergency Assistance</h2>
              <p className="text-white/90">24/7 Roadside Help Available</p>
            </div>
            <AlertCircle className="w-12 h-12" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {emergencyTypes.map((emergency) => (
              <Button
                key={emergency.id}
                variant="secondary"
                className="flex flex-col h-auto py-4"
                onClick={() => navigate('/emergency')}
              >
                <emergency.icon className="w-8 h-8 mb-2" />
                <span className="text-sm">{emergency.name}</span>
              </Button>
            ))}
          </div>
        </Card>

        {/* Service Categories */}
        <div>
          <h2 className="text-xl font-bold mb-4">Browse Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {serviceCategories.map((category) => (
              <Card
                key={category.id}
                className="p-6 cursor-pointer hover:shadow-lg transition-all text-center"
                onClick={() => navigate(`/service/${category.id}`)}
              >
                <category.icon className={`w-12 h-12 mx-auto mb-3 ${category.color}`} />
                <h3 className="font-semibold">{category.name}</h3>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div>
          <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <Card key={booking.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold">{booking.service}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Worker: {booking.worker}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant={booking.status === 'completed' ? 'default' : 'secondary'}>
                      {booking.status}
                    </Badge>
                    {booking.status === 'completed' && (
                      <div className="flex items-center mt-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 text-sm">{booking.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Emergency Button */}
      <Button
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg bg-red-500 hover:bg-red-600"
        onClick={() => navigate('/emergency')}
      >
        <AlertCircle className="w-8 h-8" />
      </Button>
    </div>
  );
}
