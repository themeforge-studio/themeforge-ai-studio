import ProjectsManager from "../../components/dashboard/ProjectsManager";
import ProjectForm from "../../components/dashboard/ProjectForm";
import AIAssistant from "../../components/dashboard/AIAssistant";

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

      <ProjectsManager />

      <div className="mt-8">
        <AIAssistant />
      </div>
    </div>
  );
}