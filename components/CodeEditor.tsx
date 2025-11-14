
import React from 'react';

interface CodeEditorProps {
    code: string;
    onCodeChange: (newCode: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, onCodeChange }) => {
    return (
        <div className="flex flex-col bg-gray-800 rounded-lg shadow-inner h-full overflow-hidden">
            <div className="flex items-center p-3 bg-gray-900 border-b border-gray-700">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="flex-grow text-center text-sm font-medium text-gray-400">Code Editor</span>
            </div>
            <div className="relative flex-grow h-full">
                <textarea
                    value={code}
                    onChange={(e) => onCodeChange(e.target.value)}
                    className="w-full h-full p-4 bg-transparent text-gray-300 font-mono text-sm resize-none focus:outline-none leading-relaxed"
                    spellCheck="false"
                    wrap="off"
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                />
            </div>
        </div>
    );
};
