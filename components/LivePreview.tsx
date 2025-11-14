
import React from 'react';

interface LivePreviewProps {
    code: string;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ code }) => {
    return (
        <div className="flex flex-col bg-white rounded-lg shadow-inner h-full overflow-hidden">
            <div className="flex items-center p-3 bg-gray-200 border-b border-gray-300">
                 <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="flex-grow text-center text-sm font-medium text-gray-600">Live Preview</span>
            </div>
            <iframe
                srcDoc={code}
                title="Live Preview"
                sandbox="allow-scripts"
                className="w-full h-full border-0"
            />
        </div>
    );
};
