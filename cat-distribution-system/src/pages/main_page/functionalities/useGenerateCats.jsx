import { faker } from '@faker-js/faker';
import CatEntities from "../../../assets/CatEntities";
import {useEffect} from "react";

const existingNames = new Set(CatEntities.map(cat => cat.name));

const generateUniqueName = (usedNames) => {
    let name;
    do {
        name = faker.person.firstName();
    } while (usedNames.has(name));
    usedNames.add(name);
    return name;
};

const fetchCatImage = async () => {
    try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search", {
            headers: {
                "x-api-key": "live_vqheiDqxrBRmftyRK83qVlcbmM4fv8PfvvODBg7XLAQ8DQmcWdrVcutiUoMxkPss"
            }
        });
        const data = await response.json();
        return data[0]?.url || "https://via.placeholder.com/300"; // Default fallback image if API fails
    } catch (error) {
        console.error("Error fetching cat image:", error);
        return "https://via.placeholder.com/300"; // Fallback image in case of error
    }
};

const generateDescription = (name, gender, age) => {
    const personalityTraits = [
        "playful and full of energy",
        "calm and affectionate",
        "curious about everything",
        "a little mischievous but very loving",
        "shy at first, but warms up quickly",
        "always looking for a warm lap to sit on",
        "a big talker who loves attention",
        "an independent spirit with a gentle heart",
        "a little clumsy but incredibly sweet",
        "a brave explorer who loves adventure"
    ];

    const trait = faker.helpers.arrayElement(personalityTraits);

    let baseDescription = `${name} is a ${trait} cat. `;

    if (age <= 2) {
        baseDescription += `${gender === "M" ? "He" : "She"} is still very young and loves to play all day long.`;
    } else if (age <= 5) {
        baseDescription += `${gender === "M" ? "He" : "She"} enjoys both playtime and naps, making ${gender === "M" ? "him" : "her"} the perfect companion.`;
    } else if (age <= 10) {
        baseDescription += `${gender === "M" ? "He" : "She"} has a gentle personality and loves cuddles but also appreciates ${gender === "M" ? "his" : "her"} space.`;
    } else {
        baseDescription += `${gender === "M" ? "He" : "She"} is a wise and relaxed cat who enjoys quiet moments and cozy spots.`;
    }

    return baseDescription;
};

const generateRandomCat = () => {
    const name = generateUniqueName(existingNames);
    const gender = faker.helpers.arrayElement(["M", "F"]);
    const age = faker.number.int({ min: 0, max: 20 });

    return {
        name,
        gender,
        age,
        weight: parseFloat(faker.number.float({ min: 2.5, max: 8, precision: 0.1 }).toFixed(1)),
        description: generateDescription(name, gender, age),
        image: fetchCatImage()
    };
};

const useGenerateCats = (isGenerating, addCat) => {
    useEffect(() => {
        let interval;

        if (isGenerating) {
            interval = setInterval(async () => {
                const newCat = generateRandomCat();
                const catWithImage = { ...newCat, image: await newCat.image };
                addCat(catWithImage);
            }, 3000);
        } else {

            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isGenerating, addCat]);
};


export default useGenerateCats;
