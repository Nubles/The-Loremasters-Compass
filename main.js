document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map', {
        // crs: L.CRS.Simple, // No longer needed for tile map
    }).setView([3222, 3215], -2); // Center on Lumbridge

    const tileUrl = 'https://mejrs.github.io/layers_rs3/map_squares/-1/{z}/0_{x}_{y}.png';

    L.tileLayer(tileUrl, {
        minZoom: -4,
        maxZoom: 5,
        attribution: 'Map data &copy; <a href="https://github.com/mejrs/mejrs.github.io">Mejrs</a>',
        tms: true,
    }).addTo(map);

    // --- Quest Layer ---
    // Coordinates are [y, x] and are estimates.
    const quests = [
        { name: "Cook's Assistant", coords: [3207, 3214] }, // Lumbridge Castle
        { name: 'Dragon Slayer', coords: [3327, 3188] }, // Champions' Guild
        { name: 'The Restless Ghost', coords: [3240, 3243] }, // Lumbridge Swamp
        { name: "Demon Slayer", coords: [3222, 3424] }, // Varrock
    ];

    const questLayer = L.layerGroup();
    quests.forEach(quest => {
        L.marker(quest.coords)
            .bindPopup(quest.name)
            .addTo(questLayer);
    });

    questLayer.addTo(map);

    const questToggle = document.getElementById('quest-toggle');
    if (questToggle) {
        questToggle.style.display = ''; // Re-enable the toggle
        questToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                map.addLayer(questLayer);
            } else {
                map.removeLayer(questLayer);
            }
        });
    }
});
