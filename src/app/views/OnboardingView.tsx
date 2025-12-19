import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Shield, Smartphone } from 'lucide-react';
import type { UserRole } from '../App';

interface OnboardingViewProps {
  onRoleSelect: (role: UserRole) => void;
}

export default function OnboardingView({ onRoleSelect }: OnboardingViewProps) {
  const [step, setStep] = useState<'splash' | 'role' | 'login'>('splash');
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [phone, setPhone] = useState('');

  const roles = [
    { id: 'customer' as UserRole, label: 'Customer', description: 'Book services & get help' },
    { id: 'worker' as UserRole, label: 'Service Worker', description: 'Provide services & earn' },
    { id: 'pump' as UserRole, label: 'Petrol Pump', description: 'Manage emergency requests' },
    { id: 'admin' as UserRole, label: 'Admin', description: 'Manage platform' },
  ];

  const handleLogin = () => {
    if (phone.length >= 10) {
      onRoleSelect(selectedRole);
    }
  };

  if (step === 'splash') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="bg-white rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <Shield className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Service Connect
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Your Trusted Local Services & Emergency Assistance
          </p>
          <Button 
            onClick={() => setStep('role')}
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Get Started
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'role') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Welcome!</h2>
            <p className="text-gray-600 dark:text-gray-400">Select your role to continue</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {roles.map((role) => (
              <Card
                key={role.id}
                className="p-6 cursor-pointer hover:border-blue-500 transition-all"
                onClick={() => {
                  setSelectedRole(role.id);
                  setStep('login');
                }}
              >
                <h3 className="text-xl font-bold mb-2">{role.label}</h3>
                <p className="text-gray-600 dark:text-gray-400">{role.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <Smartphone className="w-16 h-16 mx-auto mb-4 text-blue-600" />
          <h2 className="text-2xl font-bold mb-2">Login with OTP</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Logging in as: <span className="font-semibold">{roles.find(r => r.id === selectedRole)?.label}</span>
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Mobile Number</label>
            <Input
              type="tel"
              placeholder="Enter 10-digit mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={10}
            />
          </div>
          <Button 
            className="w-full" 
            onClick={handleLogin}
            disabled={phone.length < 10}
          >
            Send OTP
          </Button>
          <Button 
            variant="ghost" 
            className="w-full"
            onClick={() => setStep('role')}
          >
            Back
          </Button>
        </div>
      </Card>
    </div>
  );
}
