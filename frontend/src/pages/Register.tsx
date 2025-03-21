import React from 'react';
import RegisterComponent from './Register/index';
import { User } from './Register/types';

interface RegisterPageProps {
  onRegister: (user: User) => void;
}

// This component maintains backward compatibility with the old JSX component
const Register: React.FC<RegisterPageProps> = ({ onRegister }) => {
  return <RegisterComponent onRegister={onRegister} />;
};

export default Register;