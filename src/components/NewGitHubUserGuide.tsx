import React, { useState } from 'react';
import {
  Compass,
  User,
  Terminal,
  FolderGit2,
  GitBranch,
  ShieldAlert,
  Sparkles,
  Copy,
  Check,
  CheckCircle2,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

export const NewGitHubUserGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'checklist' | 'commands' | 'special_repo' | 'anatomy'>('checklist');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const GIT_COMMANDS = [
    {
      label: 'Configure Git Identity (Run once upon install)',
      code: `git config --global user.name "Your Full Name"\ngit config --global user.email "your_email@example.com"`,
      notes: 'Matches your commits to your GitHub account email address.',
    },
    {
      label: 'Initialize a Local Repository & Connect to GitHub',
      code: `git init\ngit add .\ngit commit -m "feat: initial commit"\ngit branch -M main\ngit remote add origin https://github.com/your-username/your-repo.git\ngit push -u origin main`,
      notes: 'Turns any folder on your machine into a trackable Git repository.',
    },
    {
      label: 'Daily Development Loop',
      code: `git status                 # Check which files have changed\ngit add <filename>         # Stage specific files (or git add .)\ngit commit -m "feat: add user login" # Record with clear message\ngit push                   # Send your changes to GitHub`,
      notes: 'Keep commits small and focused on single changes.',
    },
    {
      label: 'Feature Branch & Clean Workflow',
      code: `git checkout -b feature/dark-mode  # Create and switch to new branch\n# ... make code edits ...\ngit commit -am "feat: implement dark mode toggle"\ngit push -u origin feature/dark-mode # Push branch for Pull Request`,
      notes: 'Never code directly on main in shared team repositories.',
    },
  ];

  const PROFILE_README_TEMPLATE = `# Hi there, I'm [Your Name] 👋

- 🔭 Currently working on: [Your current project]
- 🌱 Learning: [Technologies, e.g. TypeScript, React, Go, Python]
- 💬 Ask me about: [Your interests or domain knowledge]
- 📫 How to reach me: [LinkedIn, Twitter, or Email]
- ⚡ Fun fact: [A personal hobby or fun detail]

### 🛠️ Languages & Tools
<!-- Add your primary languages and tools here -->
\`TypeScript\` · \`React\` · \`Node.js\` · \`TailwindCSS\` · \`PostgreSQL\` · \`Git\`
`;

  return (
    <div className="bg-[#FAF5EE] border border-[#E3D5CA] rounded-2xl p-6 sm:p-8 shadow-xs mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#E3D5CA]">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EDEDE9] border border-[#D6CCC2] flex items-center justify-center text-[#C96442] shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-[#2B2118]">
                New GitHub User Primer
              </h3>
              <span className="text-[11px] font-mono font-medium text-[#C96442] bg-[#EDEDE9] px-2 py-0.5 rounded border border-[#D6CCC2]">
                Beginner to Pro
              </span>
            </div>
            <p className="text-xs text-[#6B5B4E] mt-0.5">
              Essential foundational habits, first-login checklist, and Git commands for a high-credibility profile.
            </p>
          </div>
        </div>

        {/* Segmented Tab Navigation */}
        <div className="flex items-center gap-1 p-1 bg-[#EDEDE9] rounded-xl border border-[#D6CCC2] self-start sm:self-auto overflow-x-auto max-w-full">
          {[
            { id: 'checklist', label: 'First Login Checklist' },
            { id: 'special_repo', label: 'Profile README Secret' },
            { id: 'anatomy', label: 'Repository Golden Rules' },
            { id: 'commands', label: 'Git Cheat Sheet' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#FAF5EE] text-[#C96442] shadow-xs'
                  : 'text-[#6B5B4E] hover:text-[#2B2118]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: First Login Checklist */}
      {activeTab === 'checklist' && (
        <div className="space-y-4">
          <div className="p-4 bg-[#EDEDE9] rounded-xl border border-[#D6CCC2] mb-4">
            <h4 className="text-sm font-bold text-[#2B2118] mb-1">
              The 6 Immediate Tasks to Complete Right After Creating Your Account
            </h4>
            <p className="text-xs text-[#6B5B4E]">
              Doing these 6 things in your first hour separates professional junior engineers from anonymous accounts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-md bg-[#EDEDE9] flex items-center justify-center text-xs font-bold font-mono text-[#C96442]">
                  1
                </div>
                <h5 className="text-xs font-bold text-[#2B2118]">
                  Set a Real Developer Avatar
                </h5>
              </div>
              <p className="text-xs text-[#4A3B2C] leading-relaxed mb-2">
                Replace the default geometric identicon with a clear, friendly photo or professional digital illustration. Anonymous avatars trigger automated spam filters and look like inactive accounts to recruiters.
              </p>
              <span className="text-[11px] font-mono text-[#8C7B6E]">
                Settings → Public Profile → Profile Picture
              </span>
            </div>

            <div className="p-4 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-md bg-[#EDEDE9] flex items-center justify-center text-xs font-bold font-mono text-[#C96442]">
                  2
                </div>
                <h5 className="text-xs font-bold text-[#2B2118]">
                  Write an Action-Oriented Bio
                </h5>
              </div>
              <p className="text-xs text-[#4A3B2C] leading-relaxed mb-2">
                Limit it to 1 sentence mentioning your core tech stack and what you build. E.g.: "Full-stack engineer building fast web apps with React, TypeScript & Node.js."
              </p>
              <span className="text-[11px] font-mono text-[#8C7B6E]">
                Keep under 160 characters · Mention real languages
              </span>
            </div>

            <div className="p-4 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-md bg-[#EDEDE9] flex items-center justify-center text-xs font-bold font-mono text-[#C96442]">
                  3
                </div>
                <h5 className="text-xs font-bold text-[#2B2118]">
                  Link Your Portfolio & Location
                </h5>
              </div>
              <p className="text-xs text-[#4A3B2C] leading-relaxed mb-2">
                Recruiters filter candidates by region and look for external verification (your personal portfolio, LinkedIn, or Twitter/X). A linked website doubles recruiter response rates.
              </p>
              <span className="text-[11px] font-mono text-[#8C7B6E]">
                Settings → Profile → URL, Location & Social Accounts
              </span>
            </div>

            <div className="p-4 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-md bg-[#EDEDE9] flex items-center justify-center text-xs font-bold font-mono text-[#C96442]">
                  4
                </div>
                <h5 className="text-xs font-bold text-[#2B2118]">
                  Enable Two-Factor Authentication (2FA)
                </h5>
              </div>
              <p className="text-xs text-[#4A3B2C] leading-relaxed mb-2">
                GitHub now mandates 2FA for active contributors. Using an authenticator app (1Password, Google Authenticator) protects your repositories and public keys from credential stuffing.
              </p>
              <span className="text-[11px] font-mono text-[#8C7B6E]">
                Settings → Password and Authentication → Enable 2FA
              </span>
            </div>

            <div className="p-4 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-md bg-[#EDEDE9] flex items-center justify-center text-xs font-bold font-mono text-[#C96442]">
                  5
                </div>
                <h5 className="text-xs font-bold text-[#2B2118]">
                  Set Up an SSH Key for Painless Pushes
                </h5>
              </div>
              <p className="text-xs text-[#4A3B2C] leading-relaxed mb-2">
                Instead of typing personal access tokens on every terminal push, generate an SSH key (`ssh-keygen -t ed25519`) and paste the public key into GitHub.
              </p>
              <span className="text-[11px] font-mono text-[#8C7B6E]">
                Settings → SSH and GPG Keys → New SSH Key
              </span>
            </div>

            <div className="p-4 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-md bg-[#EDEDE9] flex items-center justify-center text-xs font-bold font-mono text-[#C96442]">
                  6
                </div>
                <h5 className="text-xs font-bold text-[#2B2118]">
                  Create Your Special Profile README
                </h5>
              </div>
              <p className="text-xs text-[#4A3B2C] leading-relaxed mb-2">
                Create a public repository named exactly the same as your username (`username/username`). The `README.md` inside will automatically render as your personal landing page!
              </p>
              <span className="text-[11px] font-mono text-[#8C7B6E]">
                See "Profile README Secret" tab for a starter template
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Profile README Secret */}
      {activeTab === 'special_repo' && (
        <div className="space-y-4">
          <div className="p-4 bg-[#EDEDE9] rounded-xl border border-[#D6CCC2]">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#C96442]" />
              <h4 className="text-sm font-bold text-[#2B2118]">
                How the Special Profile Repository Works
              </h4>
            </div>
            <p className="text-xs text-[#4A3B2C] leading-relaxed">
              When you create a new public repository where the <strong>Repository Name</strong> exactly matches your <strong>GitHub Username</strong> (case-insensitive), GitHub displays a special green banner saying: <em>"You found a secret! [username]/[username] is a special repository."</em>
            </p>
          </div>

          <div className="p-5 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#2B2118]">
                Recommended Starter Profile README.md
              </span>
              <button
                type="button"
                onClick={() => handleCopy('profile-readme', PROFILE_README_TEMPLATE)}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-[#EDEDE9] hover:bg-[#E3D5CA] border border-[#D6CCC2] text-xs font-medium text-[#2B2118] rounded-md transition-colors cursor-pointer"
              >
                {copiedKey === 'profile-readme' ? (
                  <Check className="w-3.5 h-3.5 text-[#5B8266]" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-[#8C7B6E]" />
                )}
                <span>{copiedKey === 'profile-readme' ? 'Copied' : 'Copy Template'}</span>
              </button>
            </div>

            <pre className="p-4 bg-[#EDEDE9] rounded-lg text-xs font-mono text-[#2B2118] overflow-x-auto border border-[#D6CCC2] leading-relaxed">
              {PROFILE_README_TEMPLATE}
            </pre>

            <div className="mt-4 pt-3 border-t border-[#E3D5CA] text-xs text-[#6B5B4E]">
              <strong className="text-[#2B2118]">Pro-Tip: </strong>
              Avoid cluttering your profile README with 50 flashing animated badges or fake visitor counter images. Keep it clean, legible, and focused on what you build and what you are learning.
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Repository Golden Rules */}
      {activeTab === 'anatomy' && (
        <div className="space-y-4">
          <div className="p-4 bg-[#EDEDE9] rounded-xl border border-[#D6CCC2]">
            <h4 className="text-sm font-bold text-[#2B2118] mb-1">
              The "Golden Triad" of Every Public Repository
            </h4>
            <p className="text-xs text-[#6B5B4E]">
              Never push a project to GitHub without these three essential files:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2]">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-[#C96442]" />
                <h5 className="text-xs font-bold text-[#2B2118]">1. README.md</h5>
              </div>
              <p className="text-xs text-[#4A3B2C] leading-relaxed mb-3">
                The storefront of your project. Answers three questions in 10 seconds:
              </p>
              <ul className="space-y-1 text-xs text-[#6B5B4E]">
                <li>• What does this project do?</li>
                <li>• What does it look like? (Screenshot/GIF)</li>
                <li>• How do I run it locally? (3 commands)</li>
              </ul>
            </div>

            <div className="p-4 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2]">
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert className="w-4 h-4 text-[#C96442]" />
                <h5 className="text-xs font-bold text-[#2B2118]">2. .gitignore</h5>
              </div>
              <p className="text-xs text-[#4A3B2C] leading-relaxed mb-3">
                Prevents accidental secret leaks and bloat:
              </p>
              <ul className="space-y-1 text-xs text-[#6B5B4E]">
                <li>• Never commit <code className="text-[#A34828]">.env</code> or API keys!</li>
                <li>• Exclude <code className="text-[#8C7B6E]">node_modules/</code></li>
                <li>• Exclude build outputs (<code className="text-[#8C7B6E]">dist/</code>, <code className="text-[#8C7B6E]">.build/</code>)</li>
              </ul>
            </div>

            <div className="p-4 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2]">
              <div className="flex items-center gap-2 mb-2">
                <FolderGit2 className="w-4 h-4 text-[#C96442]" />
                <h5 className="text-xs font-bold text-[#2B2118]">3. LICENSE</h5>
              </div>
              <p className="text-xs text-[#4A3B2C] leading-relaxed mb-3">
                Declares legal permissions for visitors:
              </p>
              <ul className="space-y-1 text-xs text-[#6B5B4E]">
                <li>• No license = Default copyright (illegal to fork)</li>
                <li>• <strong>MIT License</strong>: most popular and permissive</li>
                <li>• Takes 1 click in GitHub UI to generate</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2]">
            <h5 className="text-xs font-bold text-[#2B2118] mb-1">
              The Reality of the GitHub "Green Contribution Squares"
            </h5>
            <p className="text-xs text-[#4A3B2C] leading-relaxed">
              Don't stress over having a solid green wall of commits every single day. Experienced engineering managers know contribution graphs can be gamed with automated bots. What actually wins interviews is <strong>2 to 4 deeply documented, tested, original projects</strong> that solve a real problem and have reproducible setup instructions.
            </p>
          </div>
        </div>
      )}

      {/* Tab 4: Git Cheat Sheet */}
      {activeTab === 'commands' && (
        <div className="space-y-4">
          <div className="p-4 bg-[#EDEDE9] rounded-xl border border-[#D6CCC2]">
            <h4 className="text-sm font-bold text-[#2B2118] mb-1">
              Essential Terminal Commands for Daily Workflow
            </h4>
            <p className="text-xs text-[#6B5B4E]">
              Copy and execute these commands in your terminal or IDE terminal:
            </p>
          </div>

          <div className="space-y-3">
            {GIT_COMMANDS.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#FAF5EE] rounded-xl border border-[#D6CCC2]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#2B2118]">
                    {item.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(`cmd-${idx}`, item.code)}
                    className="flex items-center gap-1.5 px-2 py-1 bg-[#EDEDE9] hover:bg-[#E3D5CA] border border-[#D6CCC2] text-xs font-medium text-[#2B2118] rounded-md transition-colors cursor-pointer"
                  >
                    {copiedKey === `cmd-${idx}` ? (
                      <Check className="w-3.5 h-3.5 text-[#5B8266]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-[#8C7B6E]" />
                    )}
                    <span>{copiedKey === `cmd-${idx}` ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <pre className="p-3 bg-[#2B2118] text-[#FAF5EE] rounded-lg text-xs font-mono overflow-x-auto leading-relaxed mb-2">
                  {item.code}
                </pre>
                <p className="text-[11px] text-[#6B5B4E] italic">
                  💡 {item.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
