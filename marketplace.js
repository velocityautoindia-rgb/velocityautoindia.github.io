// 1. THE COMPLETE INVENTORY (Catalog Start)
const inventory = [
    { brandName: "Mercedes M276, BMW N55/B58, Audi EA888, Porsche MA1", part: "Engine Assembly", description: "Complete engine units and long-block rebuilds" },
    { brandName: "Porsche 9A1, BMW S55/S58, Audi RS TFSI", part: "Pistons & Rings", description: "Forged and high-compression piston sets" },
    { brandName: "Mercedes Bosch, BMW Siemens, Audi Continental", part: "Fuel Injectors", description: "High-precision GDI and MPI injection systems" },
    { brandName: "Porsche, Mercedes AMG, BMW M, Akrapovic", part: "Performance Exhaust", description: "High-flow manifolds and titanium exhaust systems" },
    { brandName: "Garrett, BorgWarner, IHI (Porsche/Audi/BMW)", part: "Turbochargers", description: "Twin-scroll and variable geometry turbo units" },
    { brandName: "Mercedes, BMW, Audi, Land Rover", part: "Cooling Radiators", description: "High-efficiency aluminum core radiators" },
    { brandName: "Mercedes 7G/9G-Tronic, BMW ZF 8HP, Audi Tiptronic", part: "Automatic Transmission", description: "Complete gearbox units and mechatronic kits" },
    { brandName: "Porsche PDK, Audi S-Tronic, VW DSG", part: "Dual-Clutch Transmission", description: "PDK/DSG clutch packs and control units" },
    { brandName: "Range Rover, Audi Quattro, BMW xDrive", part: "Transfer Case", description: "4WD/AWD power transfer units and actuators" },
    { brandName: "BMW M-Performance, Mercedes AMG, Porsche", part: "Differential Assembly", description: "Limited slip differentials and final drive units" },
    { brandName: "Mercedes AIRMATIC, Range Rover EAS, Audi Adaptive", part: "Air Suspension Struts", description: "Complete air bellows and shock assemblies" },
    { brandName: "Porsche PCCB, Mercedes AMG, BMW M-Carbon", part: "Carbon-Ceramic Brakes", description: "Ultra-high performance ceramic rotors and pads" },
    { brandName: "Brembo, Akebono, TRW (All Brands)", part: "Brake Calipers", description: "Multi-piston performance braking calipers" },
    { brandName: "Bilstein, Ohlins, KW (BMW/Porsche/Audi)", part: "Coilover Suspension", description: "Adjustable height and damping suspension kits" },
    { brandName: "Mercedes, BMW, Audi, Land Rover", part: "Control Modules (ECM/TCM)", description: "Engine and transmission management computers" },
    { brandName: "Burmester, Harman Kardon, Bang & Olufsen", part: "Audio Amplifiers", description: "Replacement high-fidelity sound processors" },
    { brandName: "Mercedes Multibeam, BMW LaserLight, Audi Matrix", part: "LED Headlight Assembly", description: "Complete intelligent lighting units" },
    { brandName: "Mercedes, BMW, Audi, Volvo", part: "ADAS Radar Sensors", description: "Adaptive cruise and blind-spot radar modules" },
    { brandName: "Mann, Mahle, Hengst (All Luxury Brands)", part: "Service Kit", description: "Premium Oil, Air, Fuel, and Cabin filter sets" },
    { brandName: "Michelin Pilot Sport, Pirelli P-Zero, Continental", part: "Performance Tires", description: "Z-rated tires for high-speed luxury vehicles" },
    { brandName: "Castrol Edge, Mobil 1, Motul (Luxury Grade)", part: "Full Synthetic Oil", description: "Brand-approved performance lubricants" }
];
// (Catalog End)

// 2. INITIALIZE FUZZY SEARCH
const fuse = new Fuse(inventory, {
    keys: ['brandName', 'part', 'description'],
    threshold: 0.3
});
function search() {
    const term = document.getElementById('searchInput').value;
    const grid = document.getElementById('partsList');
    
    // 1. If the box is empty, show a welcoming message
    if (term.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; opacity:0.5; padding:50px;">Explore our catalog of 175+ Luxury Parts...</p>';
        return;
    }

    // 2. Don't search until at least 2 letters are typed
    if (term.length < 2) return;

    const results = fuse.search(term);
    grid.innerHTML = ''; 

    // 3. If no results found
    if (results.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; padding:50px;">Part not found. Click "Contact Expert" for custom sourcing.</p>';
        return;
    }

    // 4. Build the cards for each result
    results.forEach(r => {
        const item = r.item;
        grid.innerHTML += `
            <div class="card">
                <div class="img-placeholder"><i class="fas fa-car-side"></i></div>
                <div class="card-content">
                    <span class="brand">${item.brandName}</span>
                    <h3 class="title">${item.part}</h3>
                    <p style="font-size: 13px; color: #666; margin-bottom: 15px;">${item.description}</p>
                    <a href="https://wa.me/919611991902?text=Inquiry for: ${item.part} (${item.brandName})" class="btn-inquiry">I NEED THIS PART</a>
                </div>
            </div>
        `;
    });
}
// 4. VIN VERIFICATION
function checkVin() {
    const v = document.getElementById('vinBox').value;
    if(v.length < 1) return alert("Please enter a VIN");
    window.location.href = `https://wa.me/919611991902?text=VIN Compatibility Check: ${v}`;
}

// 5. START UP
window.onload = search;
