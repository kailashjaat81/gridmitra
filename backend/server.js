const http = require("http");

const PORT = 4000;
const observations = [];
const photos = [];
const evidencePackages = [];

const server = http.createServer((req, res) => {
    console.log("REQUEST:", req.method, req.url);
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Browser preflight request
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Single Asset Details API
if (req.method === "GET" && req.url.startsWith("/api/assets/")) {
  const assetId = req.url.split("/")[3];

  const assetDetails = {
    "T-182": {
      id: "T-182",
      type: "Transformer",
      location: "Jaipur Zone 4",
      status: "Active",
      installed: "March 2022",
      lastVisit: "17 Sep 2026",
      workers: [
        {
          name: "Ravi Kumar",
          date: "17 Sep 2026",
          observation:
            "Transformer ke neeche oil jaisa kuch dikha. Area ko inspect kiya aur photos capture kiye.",
          tags: [
            "Possible Oil Leakage",
            "Photo Evidence",
            "Inspection"
          ]
        },
        {
          name: "Amit Singh",
          date: "08 Sep 2026",
          observation:
            "Previous inspection completed. Connection points checked and maintenance observation recorded.",
          tags: [
            "Maintenance",
            "Inspection"
          ]
        }
      ]
    }
  };

  const asset = assetDetails[assetId];

  if (!asset) {
    res.writeHead(404, {
      "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
      success: false,
      message: "Asset not found"
    }));

    return;
  }

  res.writeHead(200, {
    "Content-Type": "application/json"
  });

  res.end(JSON.stringify({
    success: true,
    asset: asset
  }));

  return;
}

  // Asset API
if (req.method === "GET" && req.url === "/api/assets") {
  const assets = [
    {
      id: "T-182",
      type: "Transformer",
      location: "Jaipur Zone 4",
      status: "Active",
      lastVisit: "18 Sep 2026",
      worker: "Field Worker"
    },
    {
      id: "T-190",
      type: "Transformer",
      location: "Jaipur Zone 4",
      status: "Active",
      lastVisit: "17 Sep 2026",
      worker: "Field Worker"
    },
    {
      id: "P-047",
      type: "Electric Pole",
      location: "Jaipur Zone 2",
      status: "Maintenance",
      lastVisit: "16 Sep 2026",
      worker: "Field Worker"
    }
  ];

  res.writeHead(200, {
    "Content-Type": "application/json"
  });

  res.end(JSON.stringify({
    success: true,
    assets: assets
  }));

  return;
}

  // Test API
  if (req.method === "GET" && req.url === "/api/health") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        success: true,
        message: "GridMitra backend is running",
      })
    );

    return;
  }

    // Add Observation API
if (req.method === "POST" && req.url === "/api/observations") {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    try {
      const data = JSON.parse(body);

      if (!data.assetId || !data.observation) {
        res.writeHead(400, {
          "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
          success: false,
          message: "Asset ID and observation are required"
        }));

        return;
      }

      const newObservation = {
        id: observations.length + 1,
        assetId: data.assetId,
        observation: data.observation,
        worker: "Field Worker",
        date: new Date().toISOString()
      };

      observations.push(newObservation);

      res.writeHead(201, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify({
        success: true,
        message: "Observation saved successfully",
        observation: newObservation
      }));

    } catch (error) {
      res.writeHead(400, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify({
        success: false,
        message: "Invalid JSON"
      }));
    }
  });

  return;
}

    // Get Observations for an Asset
if (req.method === "GET" && req.url.startsWith("/api/observations/")) {
  const assetId = req.url.split("/")[3];

  const assetObservations = observations.filter(
    (item) => item.assetId === assetId
  );

  res.writeHead(200, {
    "Content-Type": "application/json"
  });

  res.end(JSON.stringify({
    success: true,
    observations: assetObservations
  }));

  return;
}
       // Save Photo Evidence API
if (req.method === "POST" && req.url === "/api/photos") {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    try {
      const data = JSON.parse(body);

      if (!data.assetId) {
        res.writeHead(400, {
          "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
          success: false,
          message: "Asset ID is required"
        }));

        return;
      }

         const newPhoto = {
  id: photos.length + 1,
  assetId: data.assetId,
  fileName: data.fileName || "",
  image: data.image || "",
  description: data.description || "",
  worker: "Field Worker",
  date: new Date().toISOString()
};

      photos.push(newPhoto);

      res.writeHead(201, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify({
        success: true,
        message: "Photo evidence saved successfully",
        photo: newPhoto
      }));

    } catch (error) {
      res.writeHead(400, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify({
        success: false,
        message: "Invalid JSON"
      }));
    }
  });

  return;
}

    // Get Photo Evidence for an Asset
if (req.method === "GET" && req.url.startsWith("/api/photos/")) {
  const assetId = req.url.split("/")[3];

  const assetPhotos = photos.filter(
    (item) => item.assetId === assetId
  );

  res.writeHead(200, {
    "Content-Type": "application/json"
  });

  res.end(JSON.stringify({
    success: true,
    photos: assetPhotos
  }));

  return;
}



         // Field Assistant API
if (req.method === "POST" && req.url === "/api/assistant") {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    try {
      const data = JSON.parse(body);

      if (!data.observation || !data.observation.trim()) {
        res.writeHead(400, {
          "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
          success: false,
          message: "Observation is required"
        }));

        return;
      }

      const text = data.observation.toLowerCase();

      let summary = data.observation;
      let category = "General Field Observation";
      let priority = "Review Required";
      let confidence = "Review Required";

      if (
        text.includes("oil") ||
        text.includes("tel") ||
        text.includes("leak") ||
        text.includes("leakage")
      ) {
        summary =
          "Possible fluid or oil leakage observed near the transformer.";
        category = "Maintenance Observation";
        priority = "Needs Inspection";
        confidence = "Review Required";
      } else if (
        text.includes("sound") ||
        text.includes("noise") ||
        text.includes("awaz")
      ) {
        summary =
          "Unusual sound or noise reported near the field asset.";
        category = "Equipment Observation";
        priority = "Needs Inspection";
        confidence = "Review Required";
      } else if (
        text.includes("smoke") ||
        text.includes("fire") ||
        text.includes("burn")
      ) {
        summary =
          "Smoke, fire, or burning-related observation reported.";
        category = "Safety Observation";
        priority = "Immediate Review";
        confidence = "Review Required";
      }

      const result = {
        assetId: data.assetId || "T-182",
        originalObservation: data.observation,
        summary,
        category,
        priority,
        confidence,
        worker: "Field Worker",
        date: new Date().toISOString()
      };

      res.writeHead(200, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify({
        success: true,
        result
      }));

    } catch (error) {
      res.writeHead(400, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify({
        success: false,
        message: "Invalid JSON"
      }));
    }
  });

  return;
}
               
               // Approve Evidence Package API
if (
  req.method === "POST" &&
  req.url.startsWith("/api/evidence-packages/") &&
  req.url.endsWith("/approve")
) {
  const parts = req.url.split("/");
  const packageId = Number(parts[3]);

  const packageData = evidencePackages.find(
    (item) => item.id === packageId
  );

  if (!packageData) {
    res.writeHead(404, {
      "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
      success: false,
      message: "Evidence package not found"
    }));

    return;
  }

  packageData.status = "Approved";

  res.writeHead(200, {
    "Content-Type": "application/json"
  });

  res.end(JSON.stringify({
    success: true,
    message: "Evidence package approved successfully",
    package: packageData
  }));

  return;
}


                // Request Review Evidence Package API
if (
  req.method === "POST" &&
  req.url.startsWith("/api/evidence-packages/") &&
  req.url.endsWith("/review")
) {
  const parts = req.url.split("/");
  const packageId = Number(parts[3]);

  const packageData = evidencePackages.find(
    (item) => item.id === packageId
  );

  if (!packageData) {
    res.writeHead(404, {
      "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
      success: false,
      message: "Evidence package not found"
    }));

    return;
  }

  packageData.status = "Review Requested";

  res.writeHead(200, {
    "Content-Type": "application/json"
  });

  res.end(JSON.stringify({
    success: true,
    message: "Review requested successfully",
    package: packageData
  }));

  return;
}


         // Generate Evidence Package API
if (req.method === "POST" && req.url === "/api/evidence-packages") {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    try {
      const data = JSON.parse(body);
      console.log("EVIDENCE PACKAGE DATA:", data);

      if (!data.assetId || !data.observation) {
        res.writeHead(400, {
          "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
          success: false,
          message: "Asset ID and observation are required"
        }));

        return;
      }

      const packageData = {
        id: Date.now(),
        assetId: data.assetId,
        location: data.location || "",
        observation: data.observation,
        photoAttached: data.photoAttached === true,
        image: data.image || "",
        status: "Ready for Review",
        worker: "Field Worker",
        date: new Date().toISOString()
      };

          evidencePackages.push(packageData);

      res.writeHead(201, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify({
        success: true,
        message: "Evidence package generated successfully",
        package: packageData
      }));

    } catch (error) {
      res.writeHead(400, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify({
        success: false,
        message: "Invalid JSON"
      }));
    }
  });

  return;
}

         // GET /api/evidence-packages
if (req.method === "GET" && req.url === "/api/evidence-packages") {
  res.writeHead(200, {
    "Content-Type": "application/json"
  });

  res.end(JSON.stringify({
    success: true,
    packages: evidencePackages
  }));

  return;
}

  // Unknown route
  res.writeHead(404, {
    "Content-Type": "application/json",
  });

  res.end(
    JSON.stringify({
      success: false,
      message: "Route not found",
    })
  );
});

server.listen(PORT, () => {
  console.log(`GridMitra backend running on http://localhost:${PORT}`);
});
