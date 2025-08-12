import React from 'react';
import { ShoppingCart } from 'lucide-react';

function loading() {
  return (
    // <div className="h-screen flex flex-col justify-center items-center">
    //   <span className="font-bold text-xl">In Progress ...</span>
    //   <ShoppingCart size={20} className="relative" />
    // </div>
    <div className="w-full flex justify-center items-center">
      <div className="animate-spin rounded-full h-20 w-20 border-b-5 bg-transparent border-gray-200"></div>
    </div>
  );
}

export default loading;