import React, { useState } from 'react';
import './ItineraryForm.css';
import mumbaiData from './mumbaiItineraryData.json';
import delhiData from './delhiItineraryData.json';
import rajasthanData from './rajasthanItineraryData.json';
import kashmirData from './kashmirItineraryData.json';
import varanasiData from './varanasiItineraryData.json';
import manaliData from './manaliItineraryData.json';

const ItineraryForm = () => {
    const [formData, setFormData] = useState({
        destination: '', // Change default destination to empty
        numDays: 1,
        budget: '',
    });
    const [itinerary, setItinerary] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Generate itinerary based on the dataset
        generateItinerary(formData);

        setLoading(false);
    };

    const generateItinerary = ({ destination, numDays, budget }) => {
        const totalDays = parseInt(numDays);
        let itineraryData;

        // Select the appropriate dataset based on the destination
        switch (destination.toLowerCase()) {
            case 'mumbai':
                itineraryData = mumbaiData;
                break;
            case 'delhi':
                itineraryData = delhiData;
                break;
            case 'rajasthan':
                itineraryData = rajasthanData;
                break;
            case 'kashmir':
                itineraryData = kashmirData;
                break;
            case 'varanasi':
                itineraryData = varanasiData;
                break;
            case 'manali':
                itineraryData = manaliData;
                break;
            default:
                itineraryData = mumbaiData; // Default to Mumbai if destination is unknown
                break;
        }

        // Create a structured itinerary array
        const itineraryOutput = [];

        // Ensure we do not exceed the available itineraries
        const availableItineraries = itineraryData.itineraries.slice(0, totalDays);

        // Loop through each day of the itinerary
        availableItineraries.forEach((dayInfo, index) => {
            const dailyItinerary = {
                day: dayInfo.day,
                date: `Day ${dayInfo.day}`,
                attractions: dayInfo.attractions.filter(attraction => parseInt(budget) >= attraction.cost),
                localMarkets: dayInfo.localMarkets.filter(market => parseInt(budget) >= market.cost),
                foodOptions: dayInfo.foodOptions.filter(food => parseInt(budget) >= food.cost),
            };

            itineraryOutput.push(dailyItinerary);
        });

        setItinerary(itineraryOutput);
    };

    // Dynamically set the background based on the selected destination
    const getBackgroundImage = (destination) => {
        switch (destination.toLowerCase()) {
            case 'mumbai':
                return 'url(C:\Users\Sarvesh Jadhav\Desktop\New folder\tailored-travel\src\mumbai.jpg)';
            case 'delhi':
                return 'url(/images/delhi.jpg)';
            case 'rajasthan':
                return 'url(/images/rajasthan.jpg)';
            case 'kashmir':
                return 'url(/images/kashmir.jpg)';
            case 'varanasi':
                return 'url(/images/varanasi.jpg)';
            case 'manali':
                return 'url(/images/manali.jpg)';
            default:
                return 'url(/images/default.jpg)'; // Default background if none selected
        }
    };

    return (
        <div
            className="itinerary-container"
            style={{
                backgroundImage: getBackgroundImage(formData.destination),
                backgroundSize: 'cover', // Ensures the background image covers the container
                backgroundPosition: 'center', // Centers the background image
                backgroundRepeat: 'no-repeat', // Prevents image repetition
            }}
        >
            <div className="itinerary-form-container">
                <form className="itinerary-form" onSubmit={handleSubmit}>
                    <h2>Generate Your Travel Itinerary</h2>
                    <div className="form-group">
                        <label htmlFor="destination">Destination</label>
                        <select
                            id="destination"
                            name="destination"
                            value={formData.destination}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select a destination</option>
                            <option value="mumbai">Mumbai</option>
                            <option value="delhi">Delhi</option>
                            <option value="rajasthan">Rajasthan</option>
                            <option value="kashmir">Kashmir</option>
                            <option value="varanasi">Varanasi</option>
                            <option value="manali">Manali</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="numDays">Number of Days (1-7)</label>
                        <select
                            id="numDays"
                            name="numDays"
                            value={formData.numDays}
                            onChange={handleChange}
                            required
                        >
                            {[...Array(7).keys()].map(num => (
                                <option key={num + 1} value={num + 1}>{num + 1}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="budget">Budget (₹)</label>
                        <input
                            type="number"
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            required
                            placeholder="Enter your budget"
                        />
                    </div>
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? 'Generating...' : 'Generate Itinerary'}
                    </button>
                </form>
            </div>

            {/* Itinerary Output Area */}
            <div className="itinerary-output-container">
                {error && <p className="error-message">{error}</p>}
                {itinerary.length > 0 && (
                    <div className="itinerary-output">
                        <h3>Your Itinerary:</h3>
                        {itinerary.map((dayInfo, index) => (
                            <div key={index} className="day-container">
                                <h4>{dayInfo.date}:</h4>
                                <div className="day-info">
                                    <div className="attractions">
                                        <h5>Attractions:</h5>
                                        {dayInfo.attractions.map(attraction => (
                                            <div className="itinerary-item" key={attraction.name}>
                                                <div>
                                                    <strong>{attraction.name}</strong>: {attraction.description} (Recommended Time: {attraction.recommendedTime})
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="localMarkets">
                                        <h5>Local Markets:</h5>
                                        {dayInfo.localMarkets.map(market => (
                                            <div className="itinerary-item" key={market.name}>
                                                <div>
                                                    <strong>{market.name}</strong>: {market.description} (Must Visit: {market.mustVisit})
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="foodOptions">
                                        <h5>Food Options:</h5>
                                        {dayInfo.foodOptions.map(food => (
                                            <div className="itinerary-item" key={food.name}>
                                                <div>
                                                    <strong>{food.name}</strong>: {food.cuisine} - {food.description} (Must Try: {food.mustTry})
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItineraryForm;
