function createThemedGrid(selector, tableData, tableColumns, fileName = "Export", enableColumnSearch = false) {

    // --- 1. THEME & COLORS ---
    const THEME_COLOR_PRIMARY = "#F97316"; // Rich Orange
    const THEME_COLOR_LIGHT = "#fff7ed";  // Very Light Orange (Orange-50)
    const THEME_COLOR_HOVER = "#ffedd5";  // Light Orange (Orange-100)
    const THEME_COLOR_ACCENT = "#fb923c"; // Lighter shade for gradient (Orange-400)
    const HEADER_TEXT_COLOR = "#1f2937";  // Tailwind Gray-800: Excellent contrast for the header

    // Clear old grid content and remove old toolbar
    $(selector).html("");
    const existingToolbar = document.getElementById(`${selector.replace("#", "")}-toolbar`);
    if (existingToolbar) existingToolbar.remove();

    // Enable column search if required
    if (enableColumnSearch) {
        tableColumns = tableColumns.map(col => ({ 
            ...col, 
            headerFilter: "input",
            headerFilterLiveFilter: true,
            headerFilterElement: `<input type='text' style='border-color: ${THEME_COLOR_PRIMARY};' class='w-full px-1 py-1 text-sm border-gray-300 rounded focus:border-[${THEME_COLOR_PRIMARY}] focus:ring-1 focus:ring-[${THEME_COLOR_PRIMARY}]'/>`
        }));
    }

    // Initialize Tabulator
    const table = new Tabulator(selector, {
        data: tableData,
        layout: "fitColumns", 
        height: "false", 
        pagination: "local",
        paginationSize: 100,
        paginationSizeSelector: [10, 25, 50, 100],
        movableColumns: true,
        columns: tableColumns,
        
        renderComplete: function() {
            applyCustomHeaderStyling(selector, THEME_COLOR_PRIMARY, THEME_COLOR_ACCENT, HEADER_TEXT_COLOR);
        },

        // ⭐ Row Formatting with Striping and Hover ⭐
        rowFormatter: function (row) {
            const el = row.getElement();
            const index = row.getPosition(true);
            
            el.classList.remove("bg-white", "bg-gray-50");

            // Striping
            el.style.backgroundColor = (index % 2 === 0) ? THEME_COLOR_LIGHT : "#ffffff";
            el.style.transition = "0.2s";

            // Hover
            el.addEventListener("mouseenter", () => {
                el.style.backgroundColor = THEME_COLOR_HOVER;
            });

            el.addEventListener("mouseleave", () => {
                el.style.backgroundColor = (index % 2 === 0) ? THEME_COLOR_LIGHT : "#ffffff";
            });
        }
    });
    
    // Function to apply custom header styling directly
    const applyCustomHeaderStyling = (selector, colorPrimary, colorAccent, textColor) => {
        const header = document.querySelector(`${selector} .tabulator-header`);
        if (header) {
            header.style.background = `linear-gradient(to right, ${colorPrimary}, ${colorAccent})`; 
            // 🚨 APPLIED NEW TEXT COLOR HERE
            header.style.color = textColor; 
            header.style.fontWeight = "bold";
            header.style.fontFamily = "'Inter', sans-serif";
            // Applied white text shadow to lift the dark text slightly
            header.style.textShadow = "0 1px 1px rgba(255,255,255,0.4)"; 
            header.style.borderBottom = `2px solid ${colorPrimary}`;

             const titles = document.querySelectorAll(`${selector} .tabulator-col .tabulator-col-title`);
           titles.forEach(t => {
        t.style.textAlign = "center";
        t.style.width = "100%";
        t.style.display = "flex";
        t.style.justifyContent = "center";
        t.style.alignItems = "center";
       });
        }
    }

    // Apply header theme after initialization
    setTimeout(() => {
        applyCustomHeaderStyling(selector, THEME_COLOR_PRIMARY, THEME_COLOR_ACCENT, HEADER_TEXT_COLOR);
    }, 50);

    // --- 2. TOOLBAR (Search + Download) ---
    let toolbar = document.createElement("div");
    toolbar.id = `${selector.replace("#", "")}-toolbar`;
    toolbar.className = "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 mb-0 p-1 ";

    // Search input
    let searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Global Search...";
    searchInput.className = "border border-gray-300 px-1 py-1 outline-none transition duration-150 shadow-sm w-full sm:w-64 text-sm";
    searchInput.style.setProperty('--tw-ring-color', THEME_COLOR_PRIMARY); 
    searchInput.style.setProperty('--tw-border-color', THEME_COLOR_PRIMARY); 
    searchInput.addEventListener("keyup", function () {
        table.setFilter((data) => JSON.stringify(data).toLowerCase().includes(this.value.toLowerCase()));
    });

    // Export button
    let btn = document.createElement("button");
    btn.innerText = "Export Excel";
    btn.style.backgroundColor = "#28a745";
    // Keeping button text white as it sits on the darkest part of the theme
    btn.style.color = "white"; 
    btn.style.borderRadius = "4px";
    btn.style.padding = "5px 5px 5px 5px";
    btn.className = "px-1 py-1 font-semibold shadow-md transition duration-150 hover:brightness-110 w-full sm:w-auto text-sm";
    btn.onclick = () => table.download("xlsx", `${fileName}.xlsx`, { sheetName: fileName });

    toolbar.appendChild(searchInput);
    toolbar.appendChild(btn);

    document.querySelector(selector).parentNode.insertBefore(toolbar, document.querySelector(selector));

    return table;
}