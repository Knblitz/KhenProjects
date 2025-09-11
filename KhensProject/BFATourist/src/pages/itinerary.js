import React, { useState } from "react";
import styles from "../styles/itinerary.module.css";

const activityPool = {
  Sightseeing: [
    { title: "Visit Marina Bay Sands", description: "Explore the iconic skyline view." },
    { title: "Merlion Park", description: "Take a photo with Singapore's mascot." },
  ],
  Food: [
    { title: "Maxwell Food Centre", description: "Try famous chicken rice." },
    { title: "Lau Pa Sat", description: "Taste local satay and hawker foods." },
  ],
  Culture: [
    { title: "Chinatown Heritage Centre", description: "Learn about Chinese-Singaporean roots." },
    { title: "Little India Tour", description: "Immerse in vibrant Indian culture." },
  ],
  Nature: [
    { title: "Gardens by the Bay", description: "See the Supertree Grove and Flower Dome." },
    { title: "Botanic Gardens", description: "Relax in the UNESCO World Heritage site." },
  ],
  Adventure: [
    { title: "Universal Studios", description: "Enjoy thrilling rides and attractions." },
    { title: "Indoor Skydiving", description: "Experience the thrill at iFly." },
  ],
};

const Itinerary = () => {
  const [customItinerary, setCustomItinerary] = useState([]);
  const [formInput, setFormInput] = useState({ day: "", time: "", title: "", description: "" });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [daysToGenerate, setDaysToGenerate] = useState(1);
  const [activitiesPerDay, setActivitiesPerDay] = useState(2);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== value));
    }
  };

  const handleAddActivity = () => {
    if (formInput.day && formInput.time && formInput.title && formInput.description) {
      setCustomItinerary([...customItinerary, formInput]);
      setFormInput({ day: "", time: "", title: "", description: "" });
    }
  };

  const generateRandomItinerary = () => {
    if (selectedCategories.length === 0) return;
    const generated = [];

    for (let d = 1; d <= daysToGenerate; d++) {
      const usedActivities = new Set();
      for (let i = 0; i < activitiesPerDay; i++) {
        const category = selectedCategories[Math.floor(Math.random() * selectedCategories.length)];
        const activities = activityPool[category];
        let activity;

        do {
          activity = activities[Math.floor(Math.random() * activities.length)];
        } while (usedActivities.has(activity.title) && usedActivities.size < activities.length);

        usedActivities.add(activity.title);

        generated.push({
          day: `Day ${d}`,
          time: `${9 + i}:00 AM`,
          title: activity.title,
          description: activity.description,
        });
      }
    }
    setCustomItinerary([...customItinerary, ...generated]);
  };

  const handleDeleteDay = (day) => {
    setCustomItinerary(customItinerary.filter((item) => item.day !== day));
  };

  const groupedItinerary = customItinerary.reduce((acc, item) => {
    if (!acc[item.day]) {
      acc[item.day] = [];
    }
    acc[item.day].push(item);
    return acc;
  }, {});

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Tourist Itinerary Planner</h1>

      <section className={styles.section}>
        <h2>Create Your Own Itinerary</h2>
        <div className={styles.inputGroup}>
          <input
            type="text"
            name="day"
            placeholder="Day (e.g., Day 1)"
            value={formInput.day}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="text"
            name="time"
            placeholder="Time (e.g., 9:00 AM)"
            value={formInput.time}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="text"
            name="title"
            placeholder="Activity Title"
            value={formInput.title}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formInput.description}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>
        <button onClick={handleAddActivity} className={styles.button}>Add Activity</button>
      </section>

      <section className={styles.section}>
        <h2>Generate Random Itinerary</h2>
        <div className={styles.inputGroup}>
          <label>Days:
            <input type="number" min="1" value={daysToGenerate} onChange={(e) => setDaysToGenerate(Number(e.target.value))} className={styles.input} />
          </label>
          <label>Activities per Day:
            <input type="number" min="1" value={activitiesPerDay} onChange={(e) => setActivitiesPerDay(Number(e.target.value))} className={styles.input} />
          </label>
        </div>
        <div className={styles.inputGroup}>
          {Object.keys(activityPool).map((category) => (
            <label key={category}>
              <input
                type="checkbox"
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={handleCheckboxChange}
              /> {category}
            </label>
          ))}
        </div>
        <button onClick={generateRandomItinerary} className={styles.button}>Generate Itinerary</button>
      </section>

      <section className={styles.section}>
        <h2>Your Custom Itinerary</h2>
        {Object.keys(groupedItinerary).length === 0 ? (
          <p>No activities added yet.</p>
        ) : (
          Object.entries(groupedItinerary).map(([day, activities], index) => (
            <div key={index} className={styles.dayGroup}>
              <div className={styles.dayHeader}>
                <h3>{day}</h3>
                <button className={styles.dayDeleteButton} onClick={() => handleDeleteDay(day)}>Delete Day</button>
              </div>
              <ul className={styles.activityList}>
                {activities.map((activity, i) => (
                  <li key={i} className={styles.activityItem}>
                    <div className={styles.activityText}>
                      <strong>{activity.time}</strong> - <em>{activity.title}</em>: {activity.description}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Itinerary;
