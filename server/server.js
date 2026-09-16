const express=require("express");
const path=require("path");

const app=express();

app.use(
  express.json({
    limit:"1mb"
  })
);

app.use(
  express.static(
    path.join(__dirname,"..")
  )
);

app.get(
  "/api/health",
  (req,res)=>{

    res.json({
      ok:true,
      app:"MedVault Nexus",
      version:"1.0.0"
    });

  }
);

/*
  SECURITY RULE:

  API keys must NEVER be placed
  inside www/app.js.

  Future server-side integrations:

  - PubMed / NCBI
  - ClinicalTrials.gov
  - RCSB PDB
  - AI provider
*/

app.post(
  "/api/ai",
  (req,res)=>{

    res.status(501).json({
      ok:false,
      message:"AI provider not configured yet."
    });

  }
);

app.listen(
  process.env.PORT || 3000,
  ()=>console.log(
    "MedVault Nexus v1 server running"
  )
);
