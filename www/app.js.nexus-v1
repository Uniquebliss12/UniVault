const STORAGE_KEY = "medvault_v14_workspace";

let workspace = {
  id: "ws_" + Date.now(),
  name: "Untitled Workspace",
  description: "",
  pico: { p: "", i: "", c: "", o: "" },
  booleanQuery: "",
  studies: [],
  screening: {},
  extractions: {},
  bias: {},
  synthesis: {}
};

function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  
  // Show selected section
  document.getElementById(sectionId).classList.add("active");
  
  // Update header
  const titles = {
    dashboard: "Dashboard",
    workspace: "Workspace Settings",
    question: "Research Question",
    boolean: "Search Strategy",
    evidence: "Import Studies",
    screening: "Screen Studies",
    extraction: "Extract Data",
    bias: "Risk of Bias",
    synthesis: "Synthesis",
    drug: "Drug Development"
  };
  
  document.getElementById("section-title").textContent = titles[sectionId] || "MedVault";
  closeSidebar();
}

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}

function closeSidebar() {
  document.getElementById("sidebar").classList.remove("active");
}

function openWorkspaceModal() {
  document.getElementById("workspaceModal").classList.add("active");
}

function closeWorkspaceModal() {
  document.getElementById("workspaceModal").classList.remove("active");
}

function createWorkspace() {
  const name = document.getElementById("new-ws-name").value.trim();
  const desc = document.getElementById("new-ws-desc").value.trim();
  
  if (!name) {
    alert("Workspace name is required");
    return;
  }
  
  workspace = {
    id: "ws_" + Date.now(),
    name: name,
    description: desc,
    pico: { p: "", i: "", c: "", o: "" },
    booleanQuery: "",
    studies: [],
    screening: {},
    extractions: {},
    bias: {},
    synthesis: {}
  };
  
  saveWorkspace();
  closeWorkspaceModal();
  render();
  showSection("dashboard");
}

function updateWorkspace() {
  workspace.name = document.getElementById("ws-name").value;
  workspace.description = document.getElementById("ws-desc").value;
  saveWorkspace();
  alert("Workspace updated!");
}

function saveWorkspace() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workspace));
}

function loadWorkspace() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      workspace = JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load workspace:", e);
    }
  }
}

function savePICO() {
  workspace.pico = {
    p: document.getElementById("pico-p").value,
    i: document.getElementById("pico-i").value,
    c: document.getElementById("pico-c").value,
    o: document.getElementById("pico-o").value
  };
  
  saveWorkspace();
  
  const picoDisplay = document.getElementById("pico-display");
  const picoText = document.getElementById("pico-text");
  picoText.textContent = `In ${workspace.pico.p}, does ${workspace.pico.i} compared to ${workspace.pico.c} result in ${workspace.pico.o}?`;
  picoDisplay.style.display = "block";
}

function executeSearch() {
  workspace.booleanQuery = document.getElementById("boolean-query").value;
  saveWorkspace();
  alert("Search strategy saved!\nIn a real system, this would query PubMed, Scopus, etc.");
}

function addDemoStudy() {
  const study = {
    id: "study_" + Date.now(),
    title: "Efficacy of metformin on glycemic control in type 2 diabetes patients",
    authors: "Smith et al.",
    year: 2023,
    abstract: "A randomized controlled trial conducted in 2023 examining the effects of metformin versus placebo on HbA1c reduction over 12 weeks in 250 participants.",
    status: "pending"
  };
  
  workspace.studies.push(study);
  saveWorkspace();
  renderStudiesList();
}

function renderStudiesList() {
  const list = document.getElementById("studies-list");
  list.innerHTML = "";
  
  workspace.studies.forEach((study, index) => {
    const item = document.createElement("div");
    item.className = "study-item";
    item.innerHTML = `
      <h4>${study.title}</h4>
      <p>${study.authors}, ${study.year}</p>
      <p style="margin-top: 8px; font-size: 12px;">${study.abstract}</p>
    `;
    list.appendChild(item);
  });
}

function renderScreening() {
  const container = document.getElementById("screening-container");
  container.innerHTML = "";
  
  if (workspace.studies.length === 0) {
    container.innerHTML = "<p style='color: #888;'>No studies to screen. Import studies first.</p>";
    return;
  }
  
  workspace.studies.forEach((study, index) => {
    const card = document.createElement("div");
    card.className = "screening-card";
    
    const status = workspace.screening[study.id] || "pending";
    const statusColor = status === "included" ? "#22c55e" : status === "excluded" ? "#ef4444" : "#f59e0b";
    
    card.innerHTML = `
      <div style="margin-bottom: 12px; display: flex; justify-content: space-between;">
        <span>Study ${index + 1} of ${workspace.studies.length}</span>
        <span style="color: ${statusColor};">${status.toUpperCase()}</span>
      </div>
      <h3>${study.title}</h3>
      <p><strong>${study.authors}, ${study.year}</strong></p>
      <p>${study.abstract}</p>
      <div class="screening-actions">
        <button class="exclude" onclick="screenStudy('${study.id}', 'excluded')">Exclude</button>
        <button class="maybe" onclick="screenStudy('${study.id}', 'maybe')">Maybe</button>
        <button class="include" onclick="screenStudy('${study.id}', 'included')">Include</button>
      </div>
    `;
    
    container.appendChild(card);
  });
  
  renderProgress();
}

function screenStudy(studyId, decision) {
  workspace.screening[studyId] = decision;
  saveWorkspace();
  renderScreening();
}

function saveExtraction() {
  const author = document.getElementById("extract-author").value;
  const n = document.getElementById("extract-n").value;
  const outcome = document.getElementById("extract-outcome").value;
  
  workspace.extractions = { author, n, outcome };
  saveWorkspace();
  alert("Extraction saved!");
}

function saveBias() {
  workspace.bias = {
    selection: document.getElementById("bias-selection").value,
    performance: document.getElementById("bias-performance").value
  };
  saveWorkspace();
  alert("Bias assessment saved!");
}

function performSynthesis() {
  workspace.synthesis = {
    method: document.getElementById("synthesis-method").value,
    model: document.getElementById("synthesis-model").value
  };
  saveWorkspace();
  
  const resultsDiv = document.getElementById("synthesis-results");
  const resultsText = document.getElementById("synthesis-text");
  resultsText.innerHTML = `
    <strong>Method:</strong> ${workspace.synthesis.method}<br>
    <strong>Model:</strong> ${workspace.synthesis.model}<br>
    <strong>Included Studies:</strong> ${Object.values(workspace.screening).filter(s => s === "included").length}<br>
    <strong>Overall Effect Size:</strong> -1.2 (95% CI: -1.5 to -0.9) <em>(Example)</em>
  `;
  resultsDiv.style.display = "block";
}

function loadMolecule() {
  alert("Drug Development: 3D molecule viewer would render here. Integrate with RDKit.js or similar.");
}

function renderProgress() {
  const total = workspace.studies.length;
  const included = Object.values(workspace.screening).filter(s => s === "included").length;
  const excluded = Object.values(workspace.screening).filter(s => s === "excluded").length;
  const completed = included + excluded;
  
  const percentage =
    Math.round(
      completed / total * 100
    );
  
  const progressHTML = `
    <div style="margin-top: 20px; padding: 16px; background: #252d3d; border-radius: 8px;">
      <p><strong>Screening Progress</strong></p>
      <p>${completed} of ${total} screened (${percentage}%)</p>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${percentage}%"></div>
      </div>
      <p style="font-size: 12px; color: #888; margin-top: 8px;">
        Included: ${included} | Excluded: ${excluded}
      </p>
    </div>
  `;
  
  document.getElementById("screening-container").innerHTML += progressHTML;
}

function render() {
  // Update workspace display
  const wsInfo = document.getElementById("workspace-info");
  const wsName = document.getElementById("workspace-name");
  const wsStats = document.getElementById("workspace-stats");
  
  wsName.textContent = workspace.name;
  wsStats.innerHTML = `
    Studies: ${workspace.studies.length} |
    Screened: ${Object.keys(workspace.screening).length} |
    Risk Assessments: ${Object.keys(workspace.bias).length || 0}
  `;
  
  // Load workspace settings form
  document.getElementById("ws-name").value = workspace.name;
  document.getElementById("ws-desc").value = workspace.description;
  
  // Load PICO
  document.getElementById("pico-p").value = workspace.pico.p;
  document.getElementById("pico-i").value = workspace.pico.i;
  document.getElementById("pico-c").value = workspace.pico.c;
  document.getElementById("pico-o").value = workspace.pico.o;
  
  if (workspace.pico.p) {
    const picoDisplay = document.getElementById("pico-display");
    picoDisplay.style.display = "block";
    document.getElementById("pico-text").textContent = `In ${workspace.pico.p}, does ${workspace.pico.i} compared to ${workspace.pico.c} result in ${workspace.pico.o}?`;
  }
  
  // Load studies
  renderStudiesList();
  renderScreening();
}

// Initialize
document.addEventListener("DOMContentLoaded", function() {
  loadWorkspace();
  render();
});
