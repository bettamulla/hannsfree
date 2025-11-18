// app.js — HannsFree Beauty Brander
// Handles: nav tabs + form submit + rendering brand pack

document.addEventListener("DOMContentLoaded", () => {
  console.log("[HannsFree] app.js loaded");

  const form = document.getElementById("brandForm");
  const resultsContainer = document.getElementById("brandResults");
  const loader = document.getElementById("loading");
  const generateSection = document.getElementById("generateSection");
  const infoSection = document.getElementById("infoSection");
  const navButtons = document.querySelectorAll(".nav-btn");

  const API_BASE = "https://hannsfree-beauty-brander-production.up.railway.app";

  // --- safety checks ---
  if (!form) console.warn("[HannsFree] brandForm not found");
  if (!resultsContainer) console.warn("[HannsFree] brandResults not found");
  if (!generateSection) console.warn("[HannsFree] generateSection not found");
  if (!infoSection) console.warn("[HannsFree] infoSection not found");
  if (!navButtons.length) console.warn("[HannsFree] no .nav-btn elements found");

  // ---------- NAV / TABS ----------
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // active state
      navButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const target = btn.dataset.target;
      console.log("[HannsFree] nav click:", target);

      if (target === "generate") {
        if (generateSection) {
          generateSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else if (target === "results") {
        if (resultsContainer && resultsContainer.children.length > 0) {
          resultsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (generateSection) {
          generateSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else if (target === "info") {
        if (infoSection) {
          infoSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // ---------- copy helpers ----------
  function copyText(text) {
    if (!text) return;
    if (!navigator.clipboard) {
      console.warn("[HannsFree] Clipboard API not available");
      return;
    }
    navigator.clipboard.writeText(text).catch(err => {
      console.warn("[HannsFree] clipboard error:", err);
    });
  }

  function createCopyBtn(text) {
    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.type = "button";
    btn.innerText = "Copy";
    btn.onclick = () => copyText(text);
    return btn;
  }

  // ---------- UI builders ----------
  function createSection(title) {
    const div = document.createElement("div");
    div.className = "result-section fade-in";
    div.innerHTML = `<h3>${title}</h3>`;
    return div;
  }

  function createList(arr) {
    const ul = document.createElement("ul");
    (arr || []).forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
    return ul;
  }

  // ---------- form submit ----------
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("[HannsFree] form submitted");

      if (resultsContainer) resultsContainer.innerHTML = "";
      if (loader) loader.style.display = "block";

      const formData = {
        brandName: document.getElementById("brandName")?.value || "",
        niche: document.getElementById("niche")?.value || "",
        tone: document.getElementById("tone")?.value || "",
        audience: document.getElementById("audience")?.value || "",
        imagePrompt: document.getElementById("imagePrompt")?.value || ""
      };

      console.log("[HannsFree] payload:", formData);

      try {
        const response = await fetch(`${API_BASE}/api/generateBrand`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });

        const brand = await response.json();
        if (loader) loader.style.display = "none";

        console.log("[HannsFree] backend response:", brand);

        if (!brand || brand.error) {
          if (resultsContainer) {
            resultsContainer.innerHTML = `<p class="error">Something went wrong.</p>`;
          }
          return;
        }

        displayResults(brand);

        // auto-switch nav to Results
        navButtons.forEach(b => b.classList.remove("active"));
        const resultsBtn = document.querySelector('.nav-btn[data-target="results"]');
        if (resultsBtn) resultsBtn.classList.add("active");
        if (resultsContainer) {
          resultsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
        }

      } catch (err) {
        if (loader) loader.style.display = "none";
        if (resultsContainer) {
          resultsContainer.innerHTML = `<p class="error">Server error.</p>`;
        }
        console.error("[HannsFree] fetch error:", err);
      }
    });
  }

  // ---------- render brand pack ----------
  function displayResults(brand) {
    if (!resultsContainer) return;
    resultsContainer.innerHTML = "";

    // Names
    const namesSection = createSection("Brand Name Ideas");
    if (Array.isArray(brand.brandNames) && brand.brandNames.length > 0) {
      namesSection.appendChild(createCopyBtn(brand.brandNames.join(", ")));
      namesSection.appendChild(createList(brand.brandNames));
    } else {
      namesSection.appendChild(createList([]));
    }
    resultsContainer.appendChild(namesSection);

    // Taglines
    const tagSection = createSection("Taglines");
    tagSection.appendChild(createList(brand.taglines || []));
    resultsContainer.appendChild(tagSection);

    // Slogans
    const sloganSection = createSection("Slogans");
    sloganSection.appendChild(createList(brand.slogans || []));
    resultsContainer.appendChild(sloganSection);

    // Hooks
    const hookSection = createSection("Hooks (Reels/TikTok)");
    hookSection.appendChild(createList(brand.hooks || []));
    resultsContainer.appendChild(hookSection);

    // Captions
    const captionSection = createSection("Captions");
    captionSection.appendChild(createList(brand.captions || []));
    resultsContainer.appendChild(captionSection);

    // Color Palette
    const colorSection = createSection("Color Palette");
    const palette = document.createElement("div");
    palette.className = "palette";

    if (brand.colorPalette && typeof brand.colorPalette === "object") {
      for (const key in brand.colorPalette) {
        const value = brand.colorPalette[key];
        const swatch = document.createElement("div");
        swatch.className = "color-swatch";
        swatch.innerHTML = `
          <div class="swatch-box" style="background:${value}"></div>
          <span>${key}: ${value}</span>
        `;
        palette.appendChild(swatch);
      }
    }

    colorSection.appendChild(palette);
    resultsContainer.appendChild(colorSection);

    // Personality
    const pSection = createSection("Brand Personality");
    if (brand.brandPersonality) {
      pSection.innerHTML += `<p>${brand.brandPersonality}</p>`;
    }
    resultsContainer.appendChild(pSection);

    // Market
    const mSection = createSection("Target Market");
    if (brand.targetMarket) {
      mSection.innerHTML += `<p>${brand.targetMarket}</p>`;
    }
    resultsContainer.appendChild(mSection);

    // USP
    const usp = createSection("Unique Selling Proposition");
    if (brand.uniqueSellingProposition) {
      usp.innerHTML += `<p>${brand.uniqueSellingProposition}</p>`;
    }
    resultsContainer.appendChild(usp);
  }
});
