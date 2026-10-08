import React, { useState } from 'react';
import { FactualData } from '../types';
import { X, Copy, Check, Database, ShieldCheck } from 'lucide-react';

interface RawEvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  factualData: FactualData;
}

export const RawEvidenceModal: React.FC<RawEvidenceModalProps> = ({
  isOpen,
  onClose,
  factualData,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const jsonString = JSON.stringify(factualData, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-[#FAF5EE] border border-[#D6CCC2] rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#E3D5CA] flex items-center justify-between bg-[#EDEDE9]">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-[#C96442]" />
            <div>
              <h3 className="text-sm font-bold text-[#2B2118] flex items-center gap-2">
                <span>Verified Public GitHub Evidence</span>
                <span className="text-[11px] text-[#5B8266] flex items-center gap-1 font-mono font-normal">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Real API Data
                </span>
              </h3>
              <p className="text-[11px] text-[#6B5B4E]">
                Raw evidence retrieved for @{factualData.profile.username} before passing to AI Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#FAF5EE] hover:bg-[#E3D5CA] border border-[#D6CCC2] text-xs font-medium text-[#2B2118] rounded-md transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#5B8266]" /> : <Copy className="w-3.5 h-3.5 text-[#8C7B6E]" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#8C7B6E] hover:text-[#2B2118] rounded-md hover:bg-[#D6CCC2]/40 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / JSON viewer */}
        <div className="p-4 flex-1 overflow-auto bg-[#2B2118] text-[#FAF5EE]">
          <pre className="text-xs font-mono leading-relaxed whitespace-pre overflow-x-auto text-[#E3D5CA]">
            {jsonString}
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#EDEDE9] border-t border-[#E3D5CA] flex items-center justify-between text-xs text-[#6B5B4E]">
          <span>
            User: @{factualData.profile.username} · {factualData.deepInspectedRepos.length} repos deeply inspected
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 bg-[#FAF5EE] text-[#2B2118] border border-[#D6CCC2] rounded-md hover:bg-[#E3D5CA] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
