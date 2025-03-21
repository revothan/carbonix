import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const RegisterHeader: React.FC = () => {
  return (
    <CardHeader className="space-y-2 text-center">
      <div className="flex justify-center mb-2">
        <svg className="h-10 w-10" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" fill="hsl(var(--primary))" />
          <path d="M12 6L8 8V12L12 16L16 12V8L12 6Z" fill="white" />
        </svg>
      </div>
      <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
      <CardDescription>Join Carbonix and start your carbon trading journey</CardDescription>
    </CardHeader>
  );
};

export default RegisterHeader;