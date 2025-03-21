import React from 'react';
import { Link } from 'react-router-dom';

const RegisterFooter: React.FC = () => {
  return (
    <div className="p-6 pt-0">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or
          </span>
        </div>
      </div>

      <div className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-primary hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default RegisterFooter;