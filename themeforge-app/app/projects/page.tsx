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
import ExportPanel from "../../components/dashboard/ExportPanel";

export default function ProjectsPage() {
  const [generatedTheme, setGeneratedTheme] =
    useState<any>(null);
    
  const [selectedProject, setSelectedProject] =
    useState<any>(null);

  const [activeTab, setActiveTab] =
    useState("overview");

    const currentProject =
  selectedProject || {
    name: "Cyber Samurai Theme",
    style: "cyberpunk",
    status: "Active",
  };

  return (
    <div className="p-8 text-white">

      <TopBar />

<div className="mb-8">

  <div className="flex items-center gap-3">

    <h1 className="text-4xl font-bold">
      Projects / {currentProject.name}
    </h1>

    <span className="rounded-lg bg-violet-600/20 border border-violet-500/30 px-3 py-1 text-sm text-violet-300">
      {currentProject.status}
    </span>

  </div>

  <p className="mt-2 text-slate-400">
    AI-generated {currentProject.style} theme project.
  </p>

</div>

      <div className="grid grid-cols-12 gap-6">

        {/* Workspace */}

        <div className="col-span-8 space-y-6">

 <ThemeOverview
  activeTab={activeTab}
  setActiveTab={setActiveTab}
  selectedProject={selectedProject}
  setSelectedProject={setSelectedProject}
/>

{activeTab === "overview" && (
  <>
    <ThemeGenerator
      onGenerate={setGeneratedTheme}
    />

    <ProjectsManager
      generatedTheme={generatedTheme}
      selectedProject={selectedProject}
      setSelectedProject={setSelectedProject}
    />
  </>
)}

{activeTab === "assets" && (
  <AssetStudio
    generatedTheme={generatedTheme}
    selectedProject={selectedProject}
  />
)}

{activeTab === "preview" && (
  <AIAssistant />
)}

{activeTab === "export" && (
  <ExportPanel
    generatedTheme={generatedTheme}
    selectedProject={selectedProject}
  />
)}

        </div>

        {/* Preview Panel */}

        <div className="col-span-4">

          <div className="sticky top-6">

            <MobilePreview
              generatedTheme={generatedTheme}
               selectedProject={selectedProject}
            />

          </div>

        </div>

      </div>

    </div>
  );
}