function preparePdfSource() {
  const original = document.getElementById("quote-document") || document.body;
  const clone = original.cloneNode(true);

  clone.removeAttribute("id");
  clone.classList.add("pdf-export");

  clone.querySelectorAll(".no-print, #go-top, #whatsapp, #download-pdf").forEach((el) => {
    el.remove();
  });

  clone.querySelectorAll(".wp-block-column").forEach((col) => {
    const text = (col.textContent || "").replace(/\u00a0/g, " ").trim();
    const hasMedia = col.querySelector("img, svg, video, iframe, canvas");
    if (!text && !hasMedia) col.remove();
  });

  const mobilePrice = clone.querySelector(".price-mobile");
  const desktopPrice = clone.querySelector(".price-desktop");
  if (mobilePrice && desktopPrice) {
    desktopPrice.remove();
    mobilePrice.style.display = "block";
    mobilePrice.style.marginTop = "0";
  }

  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText =
    "position:fixed;left:0;top:0;width:680px;visibility:hidden;pointer-events:none;";
  host.appendChild(clone);
  document.body.appendChild(host);

  clampGutenbergSpacing(clone);

  return { clone, host };
}

const MAX_PDF_GAP_PX = 8;
const MAX_PDF_SPACER_PX = 6;

function clampGutenbergSpacing(root) {
  root.querySelectorAll(".wp-block-spacer").forEach((el) => {
    el.removeAttribute("style");
    if (el.className.includes("xg:hidden")) {
      el.style.setProperty("display", "none", "important");
      return;
    }
    el.style.setProperty("height", `${MAX_PDF_SPACER_PX}px`, "important");
    el.style.setProperty("max-height", `${MAX_PDF_SPACER_PX}px`, "important");
    el.style.setProperty("min-height", "0px", "important");
    el.style.setProperty("margin", "0px", "important");
    el.style.setProperty("padding", "0px", "important");
  });

  const scope = root.querySelector("main") || root;
  scope.querySelectorAll("*").forEach((el) => {
    if (el.classList.contains("wp-block-spacer")) return;
    if (el.closest("header, footer")) return;

    const cs = getComputedStyle(el);
    const mt = parseFloat(cs.marginTop) || 0;
    const mb = parseFloat(cs.marginBottom) || 0;
    const pt = parseFloat(cs.paddingTop) || 0;
    const pb = parseFloat(cs.paddingBottom) || 0;

    if (mt > MAX_PDF_GAP_PX) {
      el.style.setProperty("margin-top", `${MAX_PDF_GAP_PX}px`, "important");
    }
    if (mb > MAX_PDF_GAP_PX) {
      el.style.setProperty("margin-bottom", `${MAX_PDF_GAP_PX}px`, "important");
    }
    if (pt > MAX_PDF_GAP_PX) {
      el.style.setProperty("padding-top", `${MAX_PDF_GAP_PX}px`, "important");
    }
    if (pb > MAX_PDF_GAP_PX) {
      el.style.setProperty("padding-bottom", `${MAX_PDF_GAP_PX}px`, "important");
    }
  });
}

export function bindDownloadPdf() {
  const btn = document.getElementById("download-pdf");
  if (!btn || btn.dataset.bound === "true") return;

  btn.dataset.bound = "true";

  btn.addEventListener("click", async () => {
    if (btn.getAttribute("aria-busy") === "true") return;

    btn.setAttribute("aria-busy", "true");
    btn.setAttribute("disabled", "true");

    const filename = btn.dataset.filename || "presupuesto.pdf";

    try {
      const html2pdfModule = await import("html2pdf.js");
      let html2pdf = html2pdfModule.default ?? html2pdfModule;
      if (html2pdf && typeof html2pdf !== "function") {
        html2pdf = html2pdf.default;
      }
      if (typeof html2pdf !== "function") {
        throw new Error("html2pdf no disponible");
      }

      const { clone, host } = preparePdfSource();

      try {
        await html2pdf()
          .set({
            margin: [12, 14, 14, 14],
            filename,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: {
              scale: 2,
              useCORS: true,
              logging: false,
              backgroundColor: "#ffffff",
              scrollX: 0,
              scrollY: 0,
            },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            pagebreak: {
              mode: ["css", "legacy"],
              avoid: [
                "h1",
                "h2",
                "h3",
                "h4",
                "p",
                "li",
                "ul",
                "ol",
                "img",
                "figure",
                "header",
                "footer",
                ".heading",
                ".wp-block-columns",
              ],
            },
          })
          .from(clone)
          .save();
      } finally {
        host.remove();
      }
    } catch (error) {
      console.error("No se pudo generar el PDF:", error);
      window.print();
    } finally {
      btn.removeAttribute("aria-busy");
      btn.removeAttribute("disabled");
    }
  });
}

bindDownloadPdf();
