(function () {
  const platformInputs = Array.from(document.querySelectorAll('input[name="platform"]'));
  const downloadButtons = Array.from(document.querySelectorAll(".download-button"));
  const savedPlatform = localStorage.getItem("npgames-platform");
  const initialPlatform = savedPlatform === "intel" ? "intel" : "arm";

  function updateDownloads(platform) {
    document.documentElement.dataset.platform = platform;
    localStorage.setItem("npgames-platform", platform);

    platformInputs.forEach((input) => {
      input.checked = input.value === platform;
    });

    downloadButtons.forEach((button) => {
      const href = button.dataset[`${platform}Href`];
      const size = button.dataset[`${platform}Size`];
      const label = button.dataset[`${platform}Label`];
      const card = button.closest(".game-card");
      const buildLabel = card ? card.querySelector(".build-label") : null;
      const title = card ? card.querySelector("h2") : null;
      const small = button.querySelector("small");

      if (href) {
        button.href = href;
      }

      if (buildLabel && label) {
        buildLabel.textContent = label;
      }

      if (small && label && size) {
        small.textContent = `${label} - ${size}`;
      }

      if (title && label) {
        button.setAttribute("aria-label", `Download ${title.textContent} for ${label}`);
      }
    });
  }

  platformInputs.forEach((input) => {
    input.addEventListener("change", () => updateDownloads(input.value));
  });

  updateDownloads(initialPlatform);
})();
