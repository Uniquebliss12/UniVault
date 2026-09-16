const KEY="medvault_nexus_v1";

const defaultState={
  page:"home",

  workspace:{
    name:"MedVault Nexus Workspace",
    question:"",
    pico:{
      P:"",
      I:"",
      C:"",
      O:""
    }
  },

  searches:[],

  messages:[]
};

let state=load();

function load(){

  try{

    return JSON.parse(
      localStorage.getItem(KEY)
    ) || defaultState;

  }catch{

    return defaultState;

  }

}

function save(){

  localStorage.setItem(
    KEY,
    JSON.stringify(state)
  );

}

function esc(value=""){

  return String(value).replace(
    /[&<>"']/g,
    c=>({
      "&":"&amp;",
      "<":"&lt;",
      ">":"&gt;",
      '"':"&quot;",
      "'":"&#39;"
    }[c])
  );

}

function navigate(page){

  state.page=page;

  save();

  render();

}

function render(){

  document
    .querySelectorAll("aside button")
    .forEach(button=>{

      button.classList.toggle(
        "active",
        button.dataset.page===state.page
      );

    });

  const app=
    document.getElementById("app");

  if(state.page==="home")
    app.innerHTML=home();

  if(state.page==="workspace")
    app.innerHTML=workspace();

  if(state.page==="research")
    app.innerHTML=research();

  if(state.page==="assistant")
    app.innerHTML=assistant();

  bind();

}

function home(){

  return `

  <div class="hero">

    <h1>MedVault Nexus</h1>

    <div class="muted">
      Medical research workspace — Version 1
    </div>

    <div class="grid">

      <div class="card">
        <h3>Workspace</h3>
        <b>1</b>
        <div class="muted">
          active workspace
        </div>
      </div>

      <div class="card">
        <h3>Research</h3>
        <b>${state.searches.length}</b>
        <div class="muted">
          saved searches
        </div>
      </div>

      <div class="card">
        <h3>AI</h3>
        <b>${state.messages.length}</b>
        <div class="muted">
          messages
        </div>
      </div>

    </div>

  </div>

  <div class="grid">

    <div class="card">
      <h3>v1 Foundation</h3>

      <div class="muted">
        Secure-first foundation for the future
        MedVault platform.
      </div>

    </div>

    <div class="card">

      <h3>Roadmap</h3>

      <div class="muted">
        Advanced evidence, screening,
        3D drug development and additional
        modules can be added in future versions.
      </div>

    </div>

  </div>

  `;

}

function workspace(){

  const p=state.workspace.pico;

  return `

  <div class="hero">

    <h1>Workspace</h1>

    <input
      id="name"
      value="${esc(state.workspace.name)}"
      placeholder="Workspace name"
    >

    <textarea
      id="question"
      rows="5"
      placeholder="Enter your medical research question"
    >${esc(state.workspace.question)}</textarea>

    <div class="grid">

      <input
        id="P"
        value="${esc(p.P)}"
        placeholder="Population"
      >

      <input
        id="I"
        value="${esc(p.I)}"
        placeholder="Intervention"
      >

      <input
        id="C"
        value="${esc(p.C)}"
        placeholder="Comparison"
      >

      <input
        id="O"
        value="${esc(p.O)}"
        placeholder="Outcome"
      >

    </div>

    <button
      class="action"
      id="saveWorkspace"
    >
      Save Workspace
    </button>

  </div>

  `;

}

function research(){

  return `

  <div class="hero">

    <h1>Research</h1>

    <div class="muted">
      Build and save a basic reproducible
      research query.
    </div>

    <textarea
      id="researchQuestion"
      rows="5"
      placeholder="Example: effect of metformin on type 2 diabetes"
    >${esc(state.workspace.question)}</textarea>

    <button
      class="action"
      id="generate"
    >
      Generate Search Query
    </button>

    <div
      class="output"
      id="queryOutput"
    >
      No query generated.
    </div>

    <div class="grid">

      ${state.searches.map(
        (s,i)=>`

        <div class="card">

          <b>Search ${i+1}</b>

          <div class="muted">
            ${esc(s)}
          </div>

        </div>

        `
      ).join("")}

    </div>

  </div>

  `;

}

function assistant(){

  return `

  <div class="hero">

    <h1>AI Assistant</h1>

    <div class="muted">

      Secure AI integration point.
      API credentials must remain on the server.

    </div>

    <textarea
      id="message"
      rows="5"
      placeholder="Ask a medical research question"
    ></textarea>

    <button
      class="action"
      id="send"
    >
      Send
    </button>

    <div class="output">

      ${
        state.messages.map(
          m=>`

          <div>

            <b>You:</b>
            ${esc(m)}

            <br>

            <span class="muted">
              Secure AI backend connection
              will be added through the server.
            </span>

          </div>

          <hr>

          `
        ).join("")
        || "No messages yet."
      }

    </div>

  </div>

  `;

}

function bind(){

  document
    .querySelectorAll("aside button")
    .forEach(button=>{

      button.onclick=
        ()=>navigate(button.dataset.page);

    });

  document
    .getElementById("saveWorkspace")
    ?.addEventListener(
      "click",
      ()=>{

        state.workspace.name=
          document.getElementById("name").value;

        state.workspace.question=
          document.getElementById("question").value;

        ["P","I","C","O"].forEach(k=>{

          state.workspace.pico[k]=
            document.getElementById(k).value;

        });

        save();

        alert("Workspace saved.");

      }
    );

  document
    .getElementById("generate")
    ?.addEventListener(
      "click",
      ()=>{

        const question=
          document
          .getElementById("researchQuestion")
          .value
          .trim();

        state.workspace.question=
          question;

        const query=
          question
          .split(/\s+/)
          .filter(Boolean)
          .map(
            x=>`"${x.replace(/[.,!?]/g,"")}"`
          )
          .join(" AND ");

        state.searches.push(query);

        save();

        document
          .getElementById("queryOutput")
          .textContent=
          query || "Enter a question first.";

      }
    );

  document
    .getElementById("send")
    ?.addEventListener(
      "click",
      ()=>{

        const msg=
          document
          .getElementById("message")
          .value
          .trim();

        if(!msg)return;

        state.messages.push(msg);

        save();

        render();

      }
    );

}

window.MedVault={
  getState:()=>state,
  save,
  navigate
};

render();
