import { useState } from 'react';
import { PerchCapitalLogo } from './components/PerchCapitalLogo';
import { PerchTerminalLogo } from './components/PerchTerminalLogo';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [variant, setVariant] = useState<'default' | 'monochrome'>('default');

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'light' ? 'bg-[#FFF8F0]' : 'bg-[#1A1410]'
    }`}>
      <div className="container mx-auto px-8 py-16">
        <header className="mb-16">
          <h1 className={`text-5xl font-bold mb-4 ${
            theme === 'light' ? 'text-[#1A1410]' : 'text-[#FFF8F0]'
          }`}>
            Perch Brand Assets
          </h1>
          <p className={`text-xl ${
            theme === 'light' ? 'text-[#1A1410]/70' : 'text-[#FFF8F0]/70'
          }`}>
            Premium logo system - Apple × Bloomberg aesthetics
          </p>
        </header>

        {/* Controls */}
        <div className="mb-12 flex gap-4">
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="px-6 py-3 bg-[#C45000] text-white rounded-lg font-medium hover:bg-[#A03F00] transition-colors"
          >
            Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
          <button
            onClick={() => setVariant(variant === 'default' ? 'monochrome' : 'default')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              theme === 'light'
                ? 'bg-[#1A1410] text-[#FFF8F0] hover:bg-[#2A2420]'
                : 'bg-[#FFF8F0] text-[#1A1410] hover:bg-[#EFE8E0]'
            }`}
          >
            {variant === 'default' ? 'Monochrome' : 'Color'} Variant
          </button>
        </div>

        {/* Logo Showcase */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Perch Capital */}
          <div className={`p-8 rounded-2xl ${
            theme === 'light' ? 'bg-white' : 'bg-[#2A2420]'
          }`}>
            <h2 className={`text-2xl font-bold mb-6 ${
              theme === 'light' ? 'text-[#1A1410]' : 'text-[#FFF8F0]'
            }`}>
              Perch Capital
            </h2>
            <p className={`mb-6 ${
              theme === 'light' ? 'text-[#1A1410]/70' : 'text-[#FFF8F0]/70'
            }`}>
              Stock trading for PSX - Round eye + upward market tick
            </p>
            
            <div className="space-y-8">
              <div>
                <p className={`text-sm mb-3 ${
                  theme === 'light' ? 'text-[#1A1410]/50' : 'text-[#FFF8F0]/50'
                }`}>
                  32px (Default)
                </p>
                <PerchCapitalLogo theme={theme} variant={variant} size={32} />
              </div>
              
              <div>
                <p className={`text-sm mb-3 ${
                  theme === 'light' ? 'text-[#1A1410]/50' : 'text-[#FFF8F0]/50'
                }`}>
                  48px
                </p>
                <PerchCapitalLogo theme={theme} variant={variant} size={48} />
              </div>
              
              <div>
                <p className={`text-sm mb-3 ${
                  theme === 'light' ? 'text-[#1A1410]/50' : 'text-[#FFF8F0]/50'
                }`}>
                  64px
                </p>
                <PerchCapitalLogo theme={theme} variant={variant} size={64} />
              </div>
              
              <div>
                <p className={`text-sm mb-3 ${
                  theme === 'light' ? 'text-[#1A1410]/50' : 'text-[#FFF8F0]/50'
                }`}>
                  128px
                </p>
                <PerchCapitalLogo theme={theme} variant={variant} size={128} />
              </div>
            </div>
          </div>

          {/* Perch Terminal */}
          <div className={`p-8 rounded-2xl ${
            theme === 'light' ? 'bg-white' : 'bg-[#2A2420]'
          }`}>
            <h2 className={`text-2xl font-bold mb-6 ${
              theme === 'light' ? 'text-[#1A1410]' : 'text-[#FFF8F0]'
            }`}>
              Perch Terminal
            </h2>
            <p className={`mb-6 ${
              theme === 'light' ? 'text-[#1A1410]/70' : 'text-[#FFF8F0]/70'
            }`}>
              Agentic ERP - Square pixel eye + straight cursor beak
            </p>
            
            <div className="space-y-8">
              <div>
                <p className={`text-sm mb-3 ${
                  theme === 'light' ? 'text-[#1A1410]/50' : 'text-[#FFF8F0]/50'
                }`}>
                  32px (Default)
                </p>
                <PerchTerminalLogo theme={theme} variant={variant} size={32} />
              </div>
              
              <div>
                <p className={`text-sm mb-3 ${
                  theme === 'light' ? 'text-[#1A1410]/50' : 'text-[#FFF8F0]/50'
                }`}>
                  48px
                </p>
                <PerchTerminalLogo theme={theme} variant={variant} size={48} />
              </div>
              
              <div>
                <p className={`text-sm mb-3 ${
                  theme === 'light' ? 'text-[#1A1410]/50' : 'text-[#FFF8F0]/50'
                }`}>
                  64px
                </p>
                <PerchTerminalLogo theme={theme} variant={variant} size={64} />
              </div>
              
              <div>
                <p className={`text-sm mb-3 ${
                  theme === 'light' ? 'text-[#1A1410]/50' : 'text-[#FFF8F0]/50'
                }`}>
                  128px
                </p>
                <PerchTerminalLogo theme={theme} variant={variant} size={128} />
              </div>
            </div>
          </div>
        </div>

        {/* Brand Colors */}
        <div className="mt-16">
          <h2 className={`text-2xl font-bold mb-6 ${
            theme === 'light' ? 'text-[#1A1410]' : 'text-[#FFF8F0]'
          }`}>
            Brand Colors
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="w-full h-24 bg-[#C45000] rounded-lg"></div>
              <p className={`font-mono text-sm ${
                theme === 'light' ? 'text-[#1A1410]' : 'text-[#FFF8F0]'
              }`}>
                Perch Orange<br />#C45000
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-full h-24 bg-[#FFF8F0] rounded-lg border-2 border-[#1A1410]/10"></div>
              <p className={`font-mono text-sm ${
                theme === 'light' ? 'text-[#1A1410]' : 'text-[#FFF8F0]'
              }`}>
                Cream Light<br />#FFF8F0
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-full h-24 bg-[#1A1410] rounded-lg"></div>
              <p className={`font-mono text-sm ${
                theme === 'light' ? 'text-[#1A1410]' : 'text-[#FFF8F0]'
              }`}>
                Cream Dark<br />#1A1410
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
