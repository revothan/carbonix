import React from 'react';
import { Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SocialProvider } from '../types';

interface SocialRegisterFormProps {
  formErrors: {
    submit?: string;
  };
  loading: boolean;
  handleSocialRegister: (provider: SocialProvider) => void;
}

const SocialRegisterForm: React.FC<SocialRegisterFormProps> = ({
  formErrors,
  loading,
  handleSocialRegister
}) => {
  return (
    <CardContent className="space-y-4 pt-4">
      {formErrors.submit && (
        <Alert variant="destructive">
          <AlertDescription>{formErrors.submit}</AlertDescription>
        </Alert>
      )}

      <Button 
        variant="outline" 
        className="w-full" 
        onClick={() => handleSocialRegister('google')}
        disabled={loading}
      >
        <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/>
          <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"/>
          <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"/>
          <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"/>
        </svg>
        <span>Sign up with Google</span>
      </Button>

      <Button 
        variant="outline" 
        className="w-full" 
        onClick={() => handleSocialRegister('facebook')}
        disabled={loading}
      >
        <Facebook className="mr-2 h-4 w-4 text-blue-600" />
        <span>Sign up with Facebook</span>
      </Button>

      <Button 
        variant="outline" 
        className="w-full" 
        onClick={() => handleSocialRegister('twitter')}
        disabled={loading}
      >
        <Twitter className="mr-2 h-4 w-4 text-sky-500" />
        <span>Sign up with Twitter</span>
      </Button>
    </CardContent>
  );
};

export default SocialRegisterForm;