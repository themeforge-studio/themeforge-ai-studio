import ProjectsManager from "../../components/dashboard/ProjectsManager";
import ProjectForm from "../../components/dashboard/ProjectForm";
import AIAssistant from "../../components/dashboard/AIAssistant";
import ThemeGenerator from "../../components/dashboard/ThemeGenerator";

export default function ProjectsPage() {
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
        <ThemeGenerator />
      </div>
    </div>
  );
}