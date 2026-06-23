"use client";

import { useEffect, useState } from "react";

import TopBar from "../../components/layout/TopBar";
import ProjectsManager from "../../components/dashboard/ProjectsManager";
import ProjectForm from "../../components/dashboard/ProjectForm";
import AIAssistant from "../../components/dashboard/AIAssistant";
import ThemeGenerator from "../../components/dashboard/ThemeGenerator";
import AssetStudio from "../../components/dashboard/AssetStudio";
import MobilePreview from "../../components/dashboard/MobilePreview";
import ThemeOverview from "../../components/dashboard/ThemeOverview";
import ExportPanel from "../../components/dashboard/ExportPanel";
import Sidebar from "../../components/layout/Sidebar";

export default function ProjectsPage() {
  const [generatedTheme, setGeneratedTheme] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [projects, setProjects] = useState<any[] | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const savedSelectedProject = localStorage.getItem("themeforge-selected-project");
    if (savedSelectedProject) {
      setSelectedProject(JSON.parse(savedSelectedProject));
    }
  }, []);

  useEffect(() => {
    if (!selectedProject) return;
    localStorage.setItem("themeforge-selected-project", JSON.stringify(selectedProject));
  }, [selectedProject]);

  useEffect(() => {
    const savedProjects = localStorage.getItem("themeforge-projects");
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects([
        {
          id: 1,
          name: "Neon Future",
          type: "Wallpaper Pack",
          status: "Published",
          wallpaper: "Neo Tokyo",
          iconPack: "Fantasy Gold",
          character: "Dark Knight",
          widget: "Clock Widget",
        },
        { id: 2, name: "Cyber Icons", type: "Icon Pack", status: "Draft" },
        { id: 3, name: "Dark AMOLED", type: "Theme", status: "Published" },
      ]);
    }
  }, []);

  useEffect(() => {
    if (projects === null) return;
    localStorage.setItem("themeforge-projects", JSON.stringify(projects));
  }, [projects]);

  const currentProject = selectedProject || {
    name: "Sin proyecto seleccionado",
    style: "",
    status: "—",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* TopBar fijo arriba */}
        <div className="sticky top-0 z-10 bg-slate-950 border-b border-slate-800 px-8 py-4">
          <TopBar
            selectedProject={selectedProject}
            generatedTheme={generatedTheme}
          />
        </div>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto px-8 py-6">

          {/* Header del proyecto */}
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold">
                Proyectos / {currentProject.name}
              </h1>
              <span className="rounded-lg bg-violet-600/20 border border-violet-500/30 px-3 py-1 text-sm text-violet-300">
                {currentProject.status}
              </span>
            </div>
            <p className="mt-2 text-slate-400">
              Proyecto de tema {currentProject.style} generado con IA.
            </p>
          </div>

          {/* Grid principal */}
          <div className="grid grid-cols-12 gap-6">

            {/* Workspace */}
            <div className="col-span-8 space-y-6">

              <ThemeOverview
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
                projects={projects ?? []}
                setProjects={setProjects}
              />

              {activeTab === "overview" && (
                <>
                  <AssetStudio
                    generatedTheme={generatedTheme}
                    selectedProject={selectedProject}
                    setSelectedProject={setSelectedProject}
                  />

                  <AIAssistant
                    selectedProject={selectedProject}
                    generatedTheme={generatedTheme}
                  />

                  <ProjectForm
                    projects={projects ?? []}
                    setProjects={setProjects}
                    setSelectedProject={setSelectedProject}
                  />

                  <ThemeGenerator
                    onGenerate={setGeneratedTheme}
                  />

                  <ProjectsManager
                    generatedTheme={generatedTheme}
                    selectedProject={selectedProject}
                    setSelectedProject={setSelectedProject}
                    projects={projects}
                    setProjects={setProjects}
                  />
                </>
              )}

              {activeTab === "assets" && (
                <AssetStudio
                  generatedTheme={generatedTheme}
                  selectedProject={selectedProject}
                  setSelectedProject={setSelectedProject}
                />
              )}

              {activeTab === "preview" && (
                <AIAssistant
                  selectedProject={selectedProject}
                  generatedTheme={generatedTheme}
                />
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
      </div>
    </div>
  );
}