async function loadUpdates() {
    const response = await fetch("updates.json");
    const data = await response.json();

    renderLatest(data.latest);
    renderOlder(data.updates);
}

function createDownloadButton(platform, info, version) {
    const icon = platform === "windows" ? "imgs/windows.png" : "imgs/mac.png";
    
    let downloadUrl = "";
    if (platform === "mac") {
        const fileName = info.file.includes('/') ? info.file.split('/').pop() : info.file;
        
        downloadUrl = `https://github.com/gotorfi/HolyPresenterPages/releases/download/${version}/${fileName}`;
    } else {
        downloadUrl = `apps/${info.file}`;
    }

    return `
        <a
            class="download-btn"
            href="${downloadUrl}"
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
                <!-- Välitetään update.version mukaan funktiolle -->
                ${createDownloadButton("windows", update.windows, update.version)}

                ${createDownloadButton("mac", update.mac, update.version)}

            </div>
        </div>
    `;
}

function renderOlder(updates) {
    const container = document.getElementById("older-updates");

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
                    <!-- Välitetään update.version mukaan myös vanhoille versioille -->
                    ${createDownloadButton("windows", update.windows, update.version)}

                    ${createDownloadButton("mac", update.mac, update.version)}

                </div>

            </div>
        `;
    });
}

loadUpdates();
