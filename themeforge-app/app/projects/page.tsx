"use client";

import { useState } from "react";

import TopBar from "../../components/layout/TopBar";

import ProjectsManager from "../../components/dashboard/ProjectsManager";
import ProjectForm from "../../components/dashboard/ProjectForm";
import AIAssistant from "../../components/dashboard/AIAssistant";
import ThemeGenerator from "../../components/dashboard/ThemeGenerator";
import AssetStudio from "../../components/dashboard/AssetStudio";
import MobilePreview from "../../components/dashboard/MobilePreview";
import ThemeOverview from "../../components/dashboard/ThemeOverview";

export default function ProjectsPage() {
  const [generatedTheme, setGeneratedTheme] =
    useState<any>(null);

  return (
    <div className="p-8 text-white">

      <TopBar />

<div className="mb-8">

  <div className="flex items-center gap-3">

    <h1 className="text-4xl font-bold">
      Projects / Cyber Samurai Theme
    </h1>

    <span className="rounded-lg bg-violet-600/20 border border-violet-500/30 px-3 py-1 text-sm text-violet-300">
      Active
    </span>

  </div>

  <p className="mt-2 text-slate-400">
    AI-generated cyberpunk theme project.
  </p>

</div>

      <div className="grid grid-cols-12 gap-6">

        {/* Workspace */}

        <div className="col-span-8 space-y-6">

         <ThemeOverview />

          <ThemeGenerator
            onGenerate={setGeneratedTheme}
          />

          <AssetStudio
            generatedTheme={generatedTheme}
          />

          <AIAssistant />

        </div>

        {/* Preview Panel */}

        <div className="col-span-4">

          <div className="sticky top-6">

            <MobilePreview
              generatedTheme={generatedTheme}
            />

          </div>

        </div>

      </div>

    </div>
  );
}