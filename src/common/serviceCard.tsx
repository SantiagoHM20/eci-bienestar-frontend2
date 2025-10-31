import React from 'react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  imageUrl: string;
  linkTo: string;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, imageUrl, linkTo, className = '' }) => {
  return (
    <Link 
      to={linkTo}
      className={`block rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 text-center bg-white">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
    </Link>
  );
};

export default ServiceCard;