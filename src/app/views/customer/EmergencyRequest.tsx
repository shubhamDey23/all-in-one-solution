import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import {
  ArrowLeft,
  MapPin,
  Fuel,
  AlertCircle,
  Car,
  Wrench,
  Radio,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { toast } from 'sonner';

export default function EmergencyRequest() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'select' | 'confirm' | 'searching' | 'found'>('select');
  const [selectedEmergency, setSelectedEmergency] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [searchProgress, setSearchProgress] = useState(0);

  const emergencyTypes = [
    { id: 'fuel', name: 'Fuel Empty', icon: Fuel, desc: 'Vehicle ran out of fuel' },
    { id: 'engine', name: 'Engine Not Starting', icon: AlertCircle, desc: 'Engine won\'t start' },
    { id: 'puncture', name: 'Tyre Puncture', icon: Car, desc: 'Flat tyre' },
    { id: 'breakdown', name: 'Vehicle Breakdown', icon: Wrench, desc: 'General breakdown' },
  ];

  const handleEmergencyRequest = () => {
    if (!selectedEmergency || !description) {
      toast.error('Please select emergency type and describe the issue');
      return;
    }

    setStep('searching');
    
    // Simulate searching for nearby pumps
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setSearchProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => setStep('found'), 500);
      }
    }, 300);
  };

  const nearbyPumps = [
    { id: '1', name: 'HP Petrol Pump', distance: '2.3 km', eta: '8 mins', status: 'Available' },
    { id: '2', name: 'Bharat Petroleum', distance: '3.1 km', eta: '12 mins', status: 'Available' },
  ];

  if (step === 'select') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="bg-red-500 text-white">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-red-600"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Emergency Assistance</h1>
                <p className="text-sm text-white/90">24/7 Roadside Help</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
          {/* Current Location */}
          <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6" />
              <div className="flex-1">
                <div className="text-sm opacity-90">Your Current Location</div>
                <div className="font-semibold">Andheri West, Mumbai</div>
              </div>
              <Button variant="secondary" size="sm">
                Update
              </Button>
            </div>
          </Card>

          {/* Emergency Type Selection */}
          <div>
            <h2 className="text-lg font-bold mb-4">What's the emergency?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {emergencyTypes.map((emergency) => (
                <Card
                  key={emergency.id}
                  className={`p-6 cursor-pointer transition-all ${
                    selectedEmergency === emergency.id ? 'border-red-500 border-2' : ''
                  }`}
                  onClick={() => setSelectedEmergency(emergency.id)}
                >
                  <emergency.icon className="w-12 h-12 text-red-500 mb-3" />
                  <h3 className="font-bold text-lg mb-1">{emergency.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{emergency.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Problem Description */}
          {selectedEmergency && (
            <Card className="p-6">
              <h2 className="text-lg font-bold mb-4">Additional Details</h2>
              <Textarea
                placeholder="Please describe the emergency situation..."
                className="min-h-32"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Card>
          )}

          {/* Request Button */}
          {selectedEmergency && (
            <Button 
              className="w-full h-14 text-lg bg-red-500 hover:bg-red-600"
              onClick={handleEmergencyRequest}
            >
              <Radio className="w-5 h-5 mr-2" />
              Request Emergency Help
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (step === 'searching') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
            <Radio className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Searching for Help</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Finding nearest petrol pumps with available services...
          </p>
          <Progress value={searchProgress} className="mb-4" />
          <p className="text-sm text-gray-500">{searchProgress}% Complete</p>
        </Card>
      </div>
    );
  }

  if (step === 'found') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="bg-green-500 text-white">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <CheckCircle className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">Help is On the Way!</h1>
                <p className="text-sm text-white/90">Request accepted by petrol pump</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">HP Petrol Pump</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Service Vehicle Dispatched</p>
              </div>
              <Badge className="bg-green-500">Active</Badge>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="font-medium">Distance</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">2.3 km away</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="font-medium">Estimated Arrival</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">8 minutes</div>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Button size="lg" variant="outline">
              Call Service Team
            </Button>
            <Button size="lg" onClick={() => navigate('/tracking/emergency-1')}>
              Track Live Location
            </Button>
          </div>

          {/* Other Available Pumps */}
          <div>
            <h3 className="font-bold mb-4">Other Available Pumps</h3>
            <div className="space-y-3">
              {nearbyPumps.slice(1).map((pump) => (
                <Card key={pump.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{pump.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {pump.distance} • ETA: {pump.eta}
                      </p>
                    </div>
                    <Badge variant="outline">{pump.status}</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
