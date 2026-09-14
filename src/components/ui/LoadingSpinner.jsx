import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

LoadingSpinner.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  progress: PropTypes.number,
  text: PropTypes.string,
};

LoadingSpinner.defaultProps = {
  progress: 0,
  text: 'Generating...',
};

const LoadingSpinner = ({ isLoading, progress = 0, text = 'Generating...' }) => {
  const [displayProgress, setDisplayProgress] = useState(progress);

  useEffect(() => {
    setDisplayProgress(progress);
  }, [progress]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-gradient-to-br from-[#1a1f3a] to-[#0a0e27] rounded-2xl p-8 shadow-2xl border border-[#8290ff]/30 max-w-sm w-full mx-4">
        {/* Spinner Circle */}
        <div className="flex justify-center mb-6">
          <div className="relative w-16 h-16">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#8290ff] border-r-[#ec9eff] loading-spinner"></div>
            
            {/* Inner rotating ring (slower) */}
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-[#fc7a7a] border-l-[#a6e3f7]" 
                 style={{ animation: 'spinSlow 3s linear infinite reverse' }}></div>
            
            {/* Center circle */}
            <div className="absolute inset-3 rounded-full bg-gradient-to-br from-[#8290ff] to-[#ec9eff] opacity-20"></div>
          </div>
        </div>

        {/* Text */}
        <h3 className="text-center text-white font-semibold text-lg mb-2 pulse-animation">
          {text}
        </h3>

        {/* Progress Percentage */}
        <p className="text-center text-[#a6e3f7] text-sm mb-4 font-medium">
          {Math.round(displayProgress)}%
        </p>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#8290ff] via-[#ec9eff] to-[#fc7a7a] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${displayProgress}%` }}
          ></div>
        </div>

        {/* Tips text */}
        <p className="text-center text-[#c0c0c0] text-xs mt-4 opacity-70">
          Creating your perfect trip... Please wait
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
