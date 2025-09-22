document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -5,
    });

    const mapUrl = 'https://i.imgur.com/XNJG9Dm.jpeg';
    const mapBounds = [[0, 0], [3555, 4800]];

    L.imageOverlay(mapUrl, mapBounds).addTo(map);
    map.fitBounds(mapBounds);

    // --- Quest Layer ---
    const quests = [
        { name: "Cook's Assistant", coords: [1770, 2450] }, // Lumbridge Castle
        { name: 'Dragon Slayer', coords: [1650, 2480] }, // Champions' Guild
        { name: 'The Restless Ghost', coords: [1800, 2420] }, // Lumbridge Swamp
        { name: "Demon Slayer", coords: [1950, 2600] }, // Varrock
    ];

    const questLayer = L.layerGroup();
    quests.forEach(quest => {
        L.marker(quest.coords)
            .bindPopup(quest.name)
            .addTo(questLayer);
    });

    questLayer.addTo(map);

    const questToggle = document.getElementById('quest-toggle');
    questToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            map.addLayer(questLayer);
        } else {
            map.removeLayer(questLayer);
        }
    });
});
