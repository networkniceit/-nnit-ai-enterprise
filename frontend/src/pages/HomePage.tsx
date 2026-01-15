import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Code, Image, Volume2, Video, FileText } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: FileText,
      title: 'Text AI',
      description: 'Writing assistance, grammar checking, and translation',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Code,
      title: 'Code AI',
      description: 'Code generation, debugging, and optimization',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Image,
      title: 'Image AI',
      description: 'Text-to-image generation and variations',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Volume2,
      title: 'Audio AI',
      description: 'Text-to-speech and speech-to-text',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Video,
      title: 'Video AI',
      description: 'Video processing and subtitle generation',
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-accent-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>
        
        <div className="relative page-container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-accent-300" />
              <span className="text-sm font-medium">100% Free to Start</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Professional AI-Powered
              <br />
              <span className="text-gradient bg-gradient-to-r from-accent-300 to-white bg-clip-text text-transparent">
                Freelancer Platform
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Unlock the power of AI with 5 cutting-edge tools for text, code, image, audio, and video processing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="btn btn-accent inline-flex items-center justify-center space-x-2 text-lg px-8 py-3">
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/dashboard" className="btn bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 inline-flex items-center justify-center space-x-2 text-lg px-8 py-3">
                <span>View Dashboard</span>
              </Link>
            </div>
            
            <p className="text-sm text-gray-300 mt-6">
              Created by <span className="font-semibold">Solomon Omomeje Ayodele</span> | Network Nice IT Tec (NNIT)
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="page-container py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful AI Tools at Your Fingertips
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Five comprehensive AI engines to supercharge your freelance work
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="card hover:shadow-xl transition-all duration-300 group">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
          
          <div className="card hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Job Management
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Create, manage, and track your freelance projects
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-accent-500 text-white py-16">
        <div className="page-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Freelance Business?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join NNIT AI Enterprise today and start using professional AI tools for free
          </p>
          <Link to="/signup" className="btn bg-white text-primary-700 hover:bg-gray-100 inline-flex items-center space-x-2 text-lg px-8 py-3">
            <span>Start Free Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
