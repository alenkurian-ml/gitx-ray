import React, { useEffect, useState } from 'react';
import { ShieldCheck, Compass, Sparkles, Target } from 'lucide-react';

interface HeaderProps {
  onReset?: () => void;
  onOpenGuide?: () => void;
  onOpenAiShowcase?: () => void;
  onOpenRoleTargeting?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onReset,
  onOpenGuide,
  onOpenAiShowcase,
  onOpenRoleTargeting,
}) => {
  const [apiStatus, setApiStatus] = useState<{ remaining: number | null; reset: number | null } | null>(null);

  useEffect(() => {
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => {
        if (data.githubStatus?.rate) {
          setApiStatus({
            remaining: data.githubStatus.rate.remaining,
            reset: data.githubStatus.rate.reset,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <header className="border-b border-[#E3D5CA] bg-[#FAF5EE]/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div 
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group"
          role="button"
          tabIndex={0}
        >
          <div className="w-9 h-9 rounded-lg bg-[#C96442] flex items-center justify-center text-[#FFFBF7] shadow-sm font-bold text-lg tracking-tight">
            XR
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base text-[#2B2118] tracking-tight group-hover:text-[#C96442] transition-colors">
                GitHub X-Ray
              </span>
              <span className="text-xs text-[#8C7B6E] font-medium hidden sm:inline">
                · Forensic Code Intelligence
              </span>
            </div>
            <p className="text-[11px] text-[#6B5B4E] hidden md:block">
              Deep developer profile & repository forensic intelligence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-xs text-[#6B5B4E]">
          {onOpenRoleTargeting && (
            <button
              type="button"
              onClick={onOpenRoleTargeting}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EDEDE9] hover:bg-[#E3D5CA] border border-[#D6CCC2] text-xs font-semibold text-[#2B2118] rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <Target className="w-3.5 h-3.5 text-[#C96442]" />
              <span className="hidden sm:inline">Target a Role</span>
              <span className="sm:hidden">Role</span>
            </button>
          )}

          {onOpenAiShowcase && (
            <button
              type="button"
              onClick={onOpenAiShowcase}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C96442] hover:bg-[#B45535] text-[#FFFBF7] text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Showcase AI: Why API is Over</span>
              <span className="sm:hidden">Showcase AI</span>
            </button>
          )}

          {onOpenGuide && (
            <button
              type="button"
              onClick={onOpenGuide}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EDEDE9] hover:bg-[#E3D5CA] border border-[#D6CCC2] text-xs font-semibold text-[#2B2118] rounded-lg transition-colors cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[#C96442]" />
              <span className="hidden md:inline">New GitHub User Guide</span>
              <span className="md:hidden">Guide</span>
            </button>
          )}

          {apiStatus && apiStatus.remaining !== null && (
            <div className="flex items-center gap-1.5 font-mono text-[11px] bg-[#EDEDE9] px-2.5 py-1.5 rounded-md border border-[#D6CCC2]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5B8266]" />
              <span>
                <strong className="text-[#2B2118]">{apiStatus.remaining}</strong>/60 req
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
