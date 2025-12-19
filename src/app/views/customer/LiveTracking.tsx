import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import {
  ArrowLeft,
  MapPin,
  Phone,
  MessageCircle,
  Navigation,
  Clock,
  CheckCircle,
  Star,
} from 'lucide-react';

export default function LiveTracking() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(35);
  const [eta, setEta] = useState(12);

  useEffect(() => {
    // Simulate real-time tracking updates
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 5, 100));
      setEta(prev => Math.max(prev - 1, 0));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const trackingSteps = [
    { id: 1, label: 'Booking Confirmed', completed: true },
    { id: 2, label: 'Worker En Route', completed: true },
    { id: 3, label: 'Arrived', completed: false },
    { id: 4, label: 'Work in Progress', completed: false },
    { id: 5, label: 'Completed', completed: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Live Tracking</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Booking ID: #{bookingId}
              </p>
            </div>
            <Badge className="bg-green-500">Active</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Map Placeholder */}
        <Card className="h-96 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Navigation className="w-16 h-16 mx-auto mb-4 text-blue-600 animate-pulse" />
              <p className="text-lg font-semibold">Live GPS Tracking</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Worker is 2.3 km away</p>
            </div>
          </div>
        </Card>

        {/* ETA Card */}
        <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm opacity-90">Estimated Time of Arrival</div>
              <div className="text-4xl font-bold">{eta} mins</div>
            </div>
            <Clock className="w-12 h-12 opacity-80" />
          </div>
          <Progress value={progress} className="h-2 bg-blue-400" />
        </Card>

        {/* Worker Info */}
        <Card className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              R
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold">Rajesh Kumar</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span>4.8 Rating</span>
                <span>•</span>
                <span>234 Jobs</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="flex items-center justify-center">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
            <Button variant="outline" className="flex items-center justify-center">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
          </div>
        </Card>

        {/* Tracking Progress */}
        <Card className="p-6">
          <h3 className="font-bold text-lg mb-6">Service Progress</h3>
          <div className="space-y-6">
            {trackingSteps.map((step, index) => (
              <div key={step.id} className="flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step.completed ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
                }`}>
                  {step.completed ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className={`font-semibold ${step.completed ? 'text-green-600' : ''}`}>
                    {step.label}
                  </div>
                  {step.completed && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Completed at {new Date().toLocaleTimeString()}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4">
          <Button variant="outline" size="lg">
            Share Location
          </Button>
          <Button variant="destructive" size="lg">
            Cancel Booking
          </Button>
        </div>
      </div>
    </div>
  );
}
