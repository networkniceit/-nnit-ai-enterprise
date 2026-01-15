import { useState } from 'react';
import { FileText } from 'lucide-react';
import { apiService } from '../../services/api';
import toast from 'react-hot-toast';

export default function TextAIPage() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.text.write({
        prompt,
        content_type: 'article',
        tone: 'professional',
        length: 'medium',
      });
      setResult(response.data.data.content);
      toast.success('Content generated successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="flex items-center space-x-3 mb-8">
        <FileText className="w-8 h-8 text-primary-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Text AI Tools</h1>
          <p className="text-gray-600 dark:text-gray-400">Writing, grammar, translation, and more</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Input</h2>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="input min-h-[300px] resize-none"
            placeholder="Enter your prompt or text here..."
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="btn btn-primary mt-4 w-full"
          >
            {loading ? 'Generating...' : 'Generate Content'}
          </button>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Output</h2>
          <div className="input min-h-[300px] bg-gray-50 dark:bg-gray-700/50 whitespace-pre-wrap">
            {result || 'Generated content will appear here...'}
          </div>
        </div>
      </div>
    </div>
  );
}
