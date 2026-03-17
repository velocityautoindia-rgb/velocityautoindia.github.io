// This is your "Memory" - The list of car parts
const inventory = [
    {
        "brand": "Mercedes M276, BMW N55/B58, Audi EA888, Porsche MA1",
        "category": "Engine Components",
        "part": "Engine Assembly",
        "desc": "Complete engine units and rebuilds",
        "priority": "High"
    },
    {
        "brand": "Mercedes M274, BMW N63, Audi TFSI, Jaguar AJ-V8",
        "category": "Engine Components",
        "part": "Cylinder Block & Head",
        "desc": "Premium engine blocks and cylinder heads",
        "priority": "High"
    }
    // (You will paste the rest of the 175 items here later)
];

// This is your "Brain" - The Search Logic
function triggerSearch() {
    const input = document.getElementById('fastSearchInput').value.toLowerCase();
    const resultsGrid = document.getElementById('resultsGrid');
    
    // Clear old results
    resultsGrid.innerHTML = '';

    // Search through the memory
    const filtered = inventory.filter(item => {
        return brandName.toLowerCase().includes(input) || 
               item.part.toLowerCase().includes(input) || 
               description.toLowerCase().includes(input);
    });

    // Show the results on the screen
    filtered.forEach(item => {
        const card = `
            <div style="border:1px solid #D4AF37; padding:15px; margin:10px; border-radius:10px; background:white;">
                <h4 style="color:#002D62;">${item.part}</h4>
                <p><b>Brand:</b> ${brandName}</p>
                <p>${description}</p>
                <button style="background:#25D366; color:white; border:none; padding:10px; border-radius:5px; cursor:pointer;">
                    I NEED THIS PART
                </button>
            </div>
        `;
        resultsGrid.innerHTML += card;
    });
}
