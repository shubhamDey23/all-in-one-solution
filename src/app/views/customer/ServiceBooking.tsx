import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Star,
  Phone,
  Upload,
  Calendar,
} from 'lucide-react';
import { toast } from 'sonner';

export default function ServiceBooking() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [selectedTime, setSelectedTime] = useState<'instant' | 'scheduled'>('instant');
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null);

  const nearbyWorkers = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      rating: 4.8,
      jobs: 234,
      distance: '1.2 km',
      price: '₹350',
      available: true,
    },
    {
      id: '2',
      name: 'Amit Singh',
      rating: 4.6,
      jobs: 189,
      distance: '2.1 km',
      price: '₹300',
      available: true,
    },
    {
      id: '3',
      name: 'Suresh Patel',
      rating: 4.9,
      jobs: 312,
      distance: '3.5 km',
      price: '₹400',
      available: false,
    },
  ];

  const handleBookService = () => {
    if (!selectedWorker || !description) {
      toast.error('Please select a worker and describe the problem');
      return;
    }
    
    toast.success('Booking confirmed! Worker is on the way.');
    navigate(`/tracking/${selectedWorker}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold capitalize">{category}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Book a professional {category}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Service Type Selection */}
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-4">When do you need the service?</h2>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant={selectedTime === 'instant' ? 'default' : 'outline'}
              className="h-auto py-4 flex flex-col"
              onClick={() => setSelectedTime('instant')}
            >
              <Clock className="w-6 h-6 mb-2" />
              <span>Instant</span>
              <span className="text-xs text-gray-500">Within 30 mins</span>
            </Button>
            <Button
              variant={selectedTime === 'scheduled' ? 'default' : 'outline'}
              className="h-auto py-4 flex flex-col"
              onClick={() => setSelectedTime('scheduled')}
            >
              <Calendar className="w-6 h-6 mb-2" />
              <span>Schedule</span>
              <span className="text-xs text-gray-500">Pick date & time</span>
            </Button>
          </div>
        </Card>

        {/* Problem Description */}
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-4">Describe the problem</h2>
          <Textarea
            placeholder="Please describe what needs to be fixed or serviced..."
            className="min-h-32 mb-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button variant="outline" className="w-full">
            <Upload className="w-4 h-4 mr-2" />
            Upload Photo (Optional)
          </Button>
        </Card>

        {/* Location */}
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-4">Service Location</h2>
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-blue-500 mt-1" />
            <div className="flex-1">
              <p className="font-medium">Current Location</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Andheri West, Mumbai, Maharashtra 400058
              </p>
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>
        </Card>

        {/* Available Workers */}
        <div>
          <h2 className="text-lg font-bold mb-4">Available Professionals</h2>
          <div className="space-y-3">
            {nearbyWorkers.map((worker) => (
              <Card
                key={worker.id}
                className={`p-4 cursor-pointer transition-all ${
                  selectedWorker === worker.id ? 'border-blue-500 border-2' : ''
                } ${!worker.available ? 'opacity-50' : ''}`}
                onClick={() => worker.available && setSelectedWorker(worker.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {worker.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold">{worker.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                          <span>{worker.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{worker.jobs} jobs</span>
                        <span>•</span>
                        <span>{worker.distance} away</span>
                      </div>
                      {!worker.available && (
                        <Badge variant="secondary" className="mt-1">Busy</Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-600">{worker.price}</div>
                    <div className="text-xs text-gray-500">Est. price</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      {selectedWorker && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t p-4 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Estimated Price</div>
              <div className="text-2xl font-bold text-blue-600">
                {nearbyWorkers.find(w => w.id === selectedWorker)?.price}
              </div>
            </div>
            <Button size="lg" onClick={handleBookService}>
              Confirm Booking
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
