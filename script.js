document.addEventListener("DOMContentLoaded", function() {
    const dateInput = document.getElementById("date");
    const riceRow = document.getElementById("product-rice");
    const chickenRow = document.getElementById("product-chicken");

    var map = L.map('map');
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Variables to hold marker and route line references
    let benThanhMarker, notreDameMarker, routeLine, markers = [];

    function initializeMarkersAndRoute() {
        // Add predefined markers
        benThanhMarker = L.marker([10.648770015254991, 107.24603502792975]).addTo(map).bindPopup(`
    <strong></strong> Trái Cây Nhập Khẩu 2T FRUITS<br>
    <strong>CO2/ton rice:</strong> 1 kg<br>
    <strong>Total CO2:</strong> 100 kg<br>
    <strong>Evaluate:</strong> GOOD
`);
        notreDameMarker = L.marker([10.591531993168275, 107.23075166064172]).addTo(map).bindPopup("Chợ Đức Mỹ");

        // Add polyline
        const routeCoordinates = [
            [10.648770015254991, 107.24603502792975], // Ben Thanh Market
            [10.591531993168275, 107.23075166064172]  // Saigon Notre-Dame Basilica
        ];
        routeLine = L.polyline(routeCoordinates, {
            color: 'blue',
            weight: 5,
            opacity: 0.7,
            dashArray: '5, 5'
        }).addTo(map);

        // Custom icon for markers
        var customIcon = L.icon({
            iconUrl: 'img/Car.png',
            iconSize: [60, 70],
            iconAnchor: [22, 42],
            popupAnchor: [-3, -42]
        });

        // Add custom markers
        var markerInfo = { name: "Tòa B , ĐH CNTT, DHQG_HCM", location: [10.619668940494229, 107.23818489901322] };
        let marker = L.marker(markerInfo.location, { icon: customIcon }).addTo(map)
            .bindPopup( `
    <strong>Product:</strong> Rice<br>
    <strong>Product ID:</strong> #11001<br>
    <strong>CO2/km:</strong> 2.3 kg<br>
    <strong>Delivery CO2:</strong> 10.5 kg<br>
    <strong>Evaluate:</strong> GOOD
`);
        markers.push(marker);
    }

    function removeAllMarkersAndRoute() {
        if (benThanhMarker) map.removeLayer(benThanhMarker);
        if (notreDameMarker) map.removeLayer(notreDameMarker);
        if (routeLine) map.removeLayer(routeLine);
        markers.forEach(marker => map.removeLayer(marker));
        markers = [];
    }

    function checkDate() {
        // Get the selected date value
        const selectedDate = dateInput.value;
        // Check if the date is "2024-11-02"
        if (selectedDate === "2024-11-02") {
            riceRow.style.display = "table-row"; // Show Rice row
            chickenRow.style.display = "table-row"; // Show Chicken row
            initializeMarkersAndRoute(); // Add markers and route
        } else {
            riceRow.style.display = "none"; // Hide Rice row
            chickenRow.style.display = "none";
            removeAllMarkersAndRoute(); // Remove markers and route
        }
    }

    // Run checkDate on page load
    checkDate();

    // Add event listener to run checkDate when date changes
    dateInput.addEventListener("change", checkDate);

    const bounds = [
        [10.648770015254991, 107.24603502792975], // Ben Thanh Market
        [10.591531993168275, 107.23075166064172]  // Notre Dame
    ];
// Sử dụng fitBounds để zoom vào phạm vi chứa cả hai marker
    map.fitBounds(bounds);

});


document.getElementById('logout').addEventListener('click', function() {
    alert('You have logged out.');
    window.location.href = 'login.html';
});

function generateRandomData(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("co2Chart").getContext("2d");
    const data = Array.from({ length: 12 }, () => generateRandomData(150000, 200000));
    const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "CO2/kg",
                data: data,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Month"
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "CO2 (kg)"
                    }
                }
            }
        }
    });
});
