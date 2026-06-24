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
    const loadProjects = () => {
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
    };

    loadProjects();
    window.addEventListener("storage", loadProjects);
    return () => window.removeEventListener("storage", loadProjects);
  }, []);

  useEffect(() => {
    if (projects === null) return;
    localStorage.setItem("themeforge-projects", JSON.stringify(projects));
  }, [projects]);

  // ✅ Función centralizada para actualizar proyecto
  const handleSetSelectedProject = (project: any) => {
    setSelectedProject(project);
    localStorage.setItem("themeforge-selected-project", JSON.stringify(project));
    
    // También actualiza en la lista de proyectos
    setProjects((prev) => {
      if (!prev) return prev;
      const updated = prev.map((p) => p.id === project.id ? project : p);
      localStorage.setItem("themeforge-projects", JSON.stringify(updated));
      return updated;
    });
  };

  // ✅ Cuando se selecciona desde ProjectsManager, lee versión más reciente
  const handleSelectProject = (project: any) => {
    const savedProjects = JSON.parse(localStorage.getItem("themeforge-projects") || "[]");
    const latest = savedProjects.find((p: any) => p.id === project.id) || project;
    handleSetSelectedProject(latest);
  };

  const currentProject = selectedProject || {
    name: "Sin proyecto seleccionado",
    style: "",
    status: "—",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">

        <div className="sticky top-0 z-10 bg-slate-950 border-b border-slate-800 px-8 py-4">
          <TopBar
            selectedProject={selectedProject}
            generatedTheme={generatedTheme}
          />
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">

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

          <div className="grid grid-cols-12 gap-6">

            <div className="col-span-8 space-y-6">

              <ThemeOverview
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                selectedProject={selectedProject}
                setSelectedProject={handleSetSelectedProject}
                projects={projects ?? []}
                setProjects={setProjects}
              />

              {activeTab === "overview" && (
                <>
                  <AssetStudio
                    generatedTheme={generatedTheme}
                    selectedProject={selectedProject}
                    setSelectedProject={handleSetSelectedProject}
                  />

                  <AIAssistant
                    selectedProject={selectedProject}
                    generatedTheme={generatedTheme}
                  />

                  <ProjectForm
                    projects={projects ?? []}
                    setProjects={setProjects}
                    setSelectedProject={handleSetSelectedProject}
                  />

                  <ThemeGenerator
                    onGenerate={setGeneratedTheme}
                  />

                  <ProjectsManager
                    generatedTheme={generatedTheme}
                    selectedProject={selectedProject}
                    setSelectedProject={handleSelectProject}
                    projects={projects}
                    setProjects={setProjects}
                  />
                </>
              )}

              {activeTab === "assets" && (
                <AssetStudio
                  generatedTheme={generatedTheme}
                  selectedProject={selectedProject}
                  setSelectedProject={handleSetSelectedProject}
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