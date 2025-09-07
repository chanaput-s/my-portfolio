// Init AOS
AOS.init();

// Chart.js Achievements Graph
const ctx = document.getElementById("achievementsChart").getContext("2d");
new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Data Analysis", "ML Models", "Projects Done", "Conferences"],
    datasets: [
      {
        label: "Achievements 2024-25",
        data: [85, 70, 12, 3],
        backgroundColor: ["#00eaff", "#ff4ecd", "#39ff14", "#ffcc00"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  },
});
// Filter Function
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.getAttribute("data-category");

    // Filter cards
    document.querySelectorAll(".achievement-card").forEach((card) => {
      if (
        category === "all" ||
        card.getAttribute("data-category") === category
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });

    // Update Chart data dynamically
    let newData = [];
    let newLabels = [];
    if (category === "all") {
      newLabels = [
        "Python",
        "SQL",
        "ML",
        "Visualization",
        "Research",
        "Soft Skills",
      ];
      newData = [90, 75, 70, 80, 85, 75];
    } else if (category === "programming") {
      newLabels = ["Python", "SQL"];
      newData = [90, 75];
    } else if (category === "data") {
      newLabels = ["ML", "Visualization"];
      newData = [70, 80];
    } else if (category === "research") {
      newLabels = ["Research"];
      newData = [85];
    } else if (category === "soft") {
      newLabels = ["Soft Skills"];
      newData = [75];
    }

    achievementsChart.data.labels = newLabels;
    achievementsChart.data.datasets[0].data = newData;
    achievementsChart.update();
  });
});
