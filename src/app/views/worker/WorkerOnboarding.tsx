import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Checkbox } from '../../components/ui/checkbox';
import { Progress } from '../../components/ui/progress';
import {
  Upload,
  CheckCircle,
  IdCard,
  Briefcase,
  MapPin,
} from 'lucide-react';

export default function WorkerOnboarding() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const serviceCategories = [
    'Electrician',
    'Plumber',
    'Mechanic',
    'Cleaner',
    'Carpenter',
    'Painter',
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">Worker Registration</h1>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Step {step} of {totalSteps}
            </span>
          </div>
          <Progress value={(step / totalSteps) * 100} />
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <Card className="p-8">
            <div className="text-center mb-6">
              <IdCard className="w-16 h-16 mx-auto mb-4 text-blue-500" />
              <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Let's start with your basic details
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <Input placeholder="Enter your full name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Mobile Number</label>
                <Input type="tel" placeholder="10-digit mobile number" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <Input type="email" placeholder="your.email@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Years of Experience</label>
                <Input type="number" placeholder="Years of experience" />
              </div>
            </div>

            <Button className="w-full mt-6" onClick={() => setStep(2)}>
              Continue
            </Button>
          </Card>
        )}

        {/* Step 2: Service Category */}
        {step === 2 && (
          <Card className="p-8">
            <div className="text-center mb-6">
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-blue-500" />
              <h2 className="text-2xl font-bold mb-2">Service Category</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Select the services you provide
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {serviceCategories.map((category) => (
                <label
                  key={category}
                  className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:border-blue-500"
                >
                  <Checkbox />
                  <span>{category}</span>
                </label>
              ))}
            </div>

            <div className="flex space-x-4 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button className="flex-1" onClick={() => setStep(3)}>
                Continue
              </Button>
            </div>
          </Card>
        )}

        {/* Step 3: Documents */}
        {step === 3 && (
          <Card className="p-8">
            <div className="text-center mb-6">
              <Upload className="w-16 h-16 mx-auto mb-4 text-blue-500" />
              <h2 className="text-2xl font-bold mb-2">Document Verification</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Upload required documents for verification
              </p>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="font-medium mb-2">Government ID Proof</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Aadhaar, PAN, Voter ID, or Driving License
                </p>
                <Button variant="outline">Upload Document</Button>
              </div>

              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="font-medium mb-2">Skill Certificate (Optional)</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Any relevant certification or training proof
                </p>
                <Button variant="outline">Upload Document</Button>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button className="flex-1" onClick={() => setStep(4)}>
                Continue
              </Button>
            </div>
          </Card>
        )}

        {/* Step 4: Service Area */}
        {step === 4 && (
          <Card className="p-8">
            <div className="text-center mb-6">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-blue-500" />
              <h2 className="text-2xl font-bold mb-2">Service Area</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Define your working radius
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Base Location</label>
                <Input placeholder="Enter your working area (e.g., Andheri West, Mumbai)" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Service Radius (km)
                </label>
                <Input type="number" placeholder="e.g., 5" defaultValue="5" />
                <p className="text-xs text-gray-500 mt-1">
                  You'll receive job requests within this radius
                </p>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mt-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900 dark:text-blue-100">
                    Almost Done!
                  </p>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Your profile will be reviewed within 24 hours
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setStep(3)}>
                Back
              </Button>
              <Button className="flex-1">
                Submit for Review
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
