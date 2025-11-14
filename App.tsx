
import React, { useState, useCallback } from 'react';
import { CodeEditor } from './components/CodeEditor';
import { LivePreview } from './components/LivePreview';
import { generateCode } from './services/geminiService';

const INITIAL_CODE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to CodeAI</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
        }
        .container {
            background: rgba(0, 0, 0, 0.2);
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        p {
            font-size: 1.2rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to CodeAI</h1>
        <p>Describe what you want to build in the prompt above!</p>
    </div>
</body>
</html>
`;

const App: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [generatedCode, setGeneratedCode] = useState<string>(INITIAL_CODE);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateCode = useCallback(async () => {
        if (!prompt || isLoading) return;

        setIsLoading(true);
        setError(null);

        try {
            const code = await generateCode(prompt);
            setGeneratedCode(code);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [prompt, isLoading]);

    const handleCodeChange = (newCode: string) => {
        setGeneratedCode(newCode);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
            <header className="flex items-center p-4 bg-gray-800 border-b border-gray-700 shadow-lg z-10">
                <div className="flex items-center">
                    <i className="fas fa-code text-3xl text-indigo-400 mr-3"></i>
                    <h1 className="text-2xl font-bold tracking-wider">CodeAI</h1>
                </div>
                <div className="flex-grow mx-6">
                    <div className="relative">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleGenerateCode()}
                            placeholder="e.g., A blue portfolio website"
                            className="w-full bg-gray-700 text-white rounded-full py-2 pl-5 pr-32 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleGenerateCode}
                            disabled={isLoading || !prompt}
                            className="absolute right-1 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-semibold py-1.5 px-6 rounded-full transition-all duration-300 flex items-center justify-center"
                        >
                            {isLoading ? (
                                <>
                                    <i className="fas fa-spinner fa-spin mr-2"></i>
                                    <span>Generating...</span>
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-wand-magic-sparkles mr-2"></i>
                                    <span>Generate</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {error && (
                <div className="bg-red-500 text-white p-3 text-center">
                    <i className="fas fa-exclamation-triangle mr-2"></i>
                    Error: {error}
                </div>
            )}

            <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-2 p-2 overflow-hidden">
                <CodeEditor code={generatedCode} onCodeChange={handleCodeChange} />
                <LivePreview code={generatedCode} />
            </main>
        </div>
    );
};

export default App;
