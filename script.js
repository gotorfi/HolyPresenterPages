async function loadUpdates() {

    const response = await fetch("updates.json");
    const data = await response.json();

    renderLatest(data.latest);
    renderOlder(data.updates);
}

function createDownloadButton(platform, info) {

    const icon =
        platform === "windows"
        ? "imgs/windows.png"
        : "imgs/mac.png";

    return `
        <a
            class="download-btn"
            href="apps/${info.file}"
            download
        >
            <img src="${icon}">
            
            <div>
                <strong>${platform.toUpperCase()}</strong><br>

                Requires ${info.requires}
            </div>
        </a>
    `;
}

function renderLatest(update) {

    document.getElementById("latest-update").innerHTML = `
        <div class="update-entry">

            <h3 class="version-title">
                v${update.version}
            </h3>

            <div class="update-meta">
                <span>${update.date}</span>
            </div>

            <p style="margin-top:15px;">
                ${update.description}
            </p>

            <div class="download-buttons">

                ${createDownloadButton("windows", update.windows)}

                ${createDownloadButton("mac", update.mac)}

            </div>
        </div>
    `;
}

function renderOlder(updates) {

    const container =
        document.getElementById("older-updates");

    updates.forEach(update => {

        container.innerHTML += `
            <div class="update-entry">

                <h3>Version ${update.version}</h3>

                <div class="update-meta">
                    <span>${update.date}</span>
                </div>

                <p style="margin-top:15px;">
                    ${update.description}
                </p>

                <div class="download-buttons">

                    ${createDownloadButton("windows", update.windows)}

                    ${createDownloadButton("mac", update.mac)}

                </div>

            </div>
        `;
    });
}

loadUpdates();