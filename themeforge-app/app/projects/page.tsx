"use client";

import { useState } from "react";

import ProjectsManager from "../../components/dashboard/ProjectsManager";
import ProjectForm from "../../components/dashboard/ProjectForm";
import AIAssistant from "../../components/dashboard/AIAssistant";
import ThemeGenerator from "../../components/dashboard/ThemeGenerator";
import AssetStudio from "../../components/dashboard/AssetStudio";

export default function ProjectsPage() {
  const [generatedTheme, setGeneratedTheme] =
    useState<any>(null);

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold">
        Projects Manager
      </h1>

      <p className="mt-4 text-slate-400">
        Manage all ThemeForge projects.
      </p>

      <div className="mt-8">
        <ProjectForm />
      </div>

      <div className="mt-8">
        <ProjectsManager />
      </div>

      <div className="mt-8">
        <AIAssistant />
      </div>

      <div className="mt-8">
        <ThemeGenerator
          onGenerate={setGeneratedTheme}
        />
      </div>

      <div className="mt-8">
        <AssetStudio
          generatedTheme={generatedTheme}
        />
      </div>
    </div>
  );
}