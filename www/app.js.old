const KEY = "medvault_workspace";

function getWorkspace() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "null");
  } catch {
    return null;
  }
}

function createWorkspace() {
  const workspace = {
    id: "MV-" + Date.now(),
    name: "New MedVault Research Workspace",
    question: "",
    pico: { P: "", I: "", C: "", O: "" },
    booleanQuery: "",
    documents: [],
    entities: [],
    evidence: [],
    screening: [],
    riskOfBias: [],
    synthesis: {},
    drugDevelopment: {},
    modules: {
      scan: true,
      question: true,
      boolean: true,
      evidence: true,
      screening: true,
      riskOfBias: true,
      synthesis: true,
      drugDevelopment: true
    },
    createdAt: new Date().toISOString()
  };

  localStorage.setItem(KEY, JSON.stringify(workspace));
  localStorage.setItem("medvault_workspace_id", workspace.id);
  renderWorkspace();
}

function renderWorkspace() {
  const workspace = getWorkspace();
  const element = document.getElementById("workspace");

  if (!element) return;

  if (!workspace) {
    element.textContent = "No workspace loaded yet.";
    return;
  }

  element.innerHTML =
    "<strong>" + workspace.name + "</strong><br>" +
    "Workspace ID: " + workspace.id + "<br>" +
    "Status: Connected";
}

window.addEventListener("load", renderWorkspace);
" +
    "Status: Connected";
}

window.addEventListener("load", renderWorkspace);
