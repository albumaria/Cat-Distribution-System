import React from "react";
import "./Statistics.css";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
    Pie,
    PieChart,
} from "recharts";


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

    const genderCounts = { male: 0, female: 0 }

    const colors = ['#f4a2b8', '#51294B', '#F2B45A'];

    catEntities.forEach(cat => {
        if (cat.age >= categories.Kittens.min && cat.age <= categories.Kittens.max) {
            categoryCounts.Kittens++;
        } else if (cat.age >= categories.Adults.min && cat.age <= categories.Adults.max) {
            categoryCounts.Adults++;
        } else if (cat.age >= categories.Seniors.min) {
            categoryCounts.Seniors++;
        }
        if (cat.gender === "F") {
            genderCounts.female++;
        }
        else if (cat.gender === "M") {
            genderCounts.male++;
        }
    });

    const totalCats = Object.values(categoryCounts).reduce((sum, count) => sum + count, 0);

    const data = Object.keys(categoryCounts).map(key => ({
        name: key,
        percentage: totalCats > 0 ? parseFloat(((categoryCounts[key] / totalCats) * 100).toFixed(2)) : 0,
    }));

    const genderData = Object.keys(genderCounts).map(key => ({
        name: key,
        percentage: totalCats > 0 ? parseFloat(((genderCounts[key] / totalCats) * 100).toFixed(2)) : 0,
    }));

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div>
            <div className="statistics-container">
                <ResponsiveContainer width="30%" height="70%">
                    <BarChart data={data}>
                        <XAxis dataKey="name" />
                        <YAxis unit="%" />
                        <Bar dataKey="percentage">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="30%" height="100%">
                    <PieChart width="100%" height="100%">
                        <Pie
                            data={data}
                            dataKey="percentage"
                            label={renderCustomizedLabel}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="30%" height="70%">
                    <BarChart data={genderData} layout="vertical">
                        <XAxis type="number" unit="%" />
                        <YAxis dataKey="name" type="category" />
                        <Bar dataKey="percentage" fill="#8884d8">
                            {genderData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>


            </div>
        </div>
    );
};

export default Statistics;