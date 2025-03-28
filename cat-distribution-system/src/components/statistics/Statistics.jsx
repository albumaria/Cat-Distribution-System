import React from "react";
import "./Statistics.css";


const Statistics = ({ catEntities }) => {
    const categories = {
        Kittens: { min: 0, max: 2, color: "#f4a2b8" },
        Adults: { min: 3, max: 10, color: "#f4a2b8" },
        Seniors: { min: 11, max: Infinity, color: "#f4a2b8" }
    };

    const categoryCounts = {
        Kittens: 0,
        Adults: 0,
        Seniors: 0
    };

    catEntities.forEach(cat => {
        if (cat.age >= categories.Kittens.min && cat.age <= categories.Kittens.max) {
            categoryCounts.Kittens++;
        } else if (cat.age >= categories.Adults.min && cat.age <= categories.Adults.max) {
            categoryCounts.Adults++;
        } else if (cat.age >= categories.Seniors.min) {
            categoryCounts.Seniors++;
        }
    });

    const totalCats = Object.values(categoryCounts).reduce((sum, count) => sum + count, 0);

    return (
        <div>
            <h1 className="statistics-title">Cat Age Statistics</h1>
            <div className="statistics-container">
                <div className="statistics-graph">
                    {Object.entries(categories).map(([category, { color }]) => (
                        <div key={category} className="statistics-box">
                            <div
                                className="statistics-bar"
                                style={{
                                    "--color": color,
                                    "--size": `${(categoryCounts[category] / totalCats) * 100}%`}}
                            >
                                <span className="statistics-number">{categoryCounts[category]}</span>
                                <span className="statistics-skill">{category}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Statistics;