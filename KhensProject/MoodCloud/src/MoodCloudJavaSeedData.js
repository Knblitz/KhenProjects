//MoodCloudJavaSeedData.js
import { getMessages, saveMessages, generateMessageId } from './MoodCloudUtils.js';

const seedData = {
    "Happy": [
        { text: "Feeling incredibly joyful today! The sun is shining and good things are happening.", username: "SunnySmiles" },
        { text: "Just had the best cup of coffee and it made my morning! 😊", username: "CoffeeLover" },
        { text: "Laughter is the best medicine, and I got a big dose of it today!", username: "GiggleMonster" },
        { text: "Achieved a small goal today and it feels amazing!", username: "GoalGetter" },
        { text: "Spending time with loved ones always brings me so much happiness.", username: "HeartFull" },
        { text: "Puppies and rainbows! Pure bliss.", username: "RainbowPup" },
        { text: "Today's good mood is sponsored by good food and good company.", username: "FoodieHappy" },
        { text: "Woke up feeling refreshed and ready to conquer the day!", username: "MorningSunshine" },
        { text: "Small victories lead to big smiles. Loving this journey!", username: "VictorySeeker" },
        { text: "Surrounded by positive vibes. What a wonderful day!", username: "GoodVibesOnly" }
    ],
    "Sad": [
        { text: "Feeling a bit down today, trying to find some comfort.", username: "LonelySoul" },
        { text: "Some days are just harder than others. Hoping for a brighter tomorrow.", username: "HopefulHeart" },
        { text: "A quiet moment of reflection, letting the emotions flow.", username: "DeepThinker" },
        { text: "Miss someone dearly today. Sending thoughts out.", username: "MissingYou" },
        { text: "It's okay not to be okay. Taking a break to reset.", username: "RestingMind" },
        { text: "Heavy heart today, but looking for the silver lining.", username: "CloudyDay" },
        { text: "Finding solace in music during a melancholic moment.", username: "MelodyMourner" },
        { text: "Feeling a bit lost, but I know this feeling won't last forever.", username: "LostAndFound" }
    ],
    "Anxious": [
        { text: "My mind is racing with a million thoughts. Need to find my calm.", username: "WorriedMind" },
        { text: "Feeling a knot in my stomach. Just trying to breathe through it.", username: "Breather" },
        { text: "Deadline looming, and the pressure is getting to me.", username: "PressureCooker" },
        { text: "Overthinking everything. Wish I could switch my brain off for a bit.", username: "BrainDrain" },
        { text: "Feeling overwhelmed by everything on my plate.", username: "Overwhelmed" },
        { text: "Can't seem to shake this restless feeling.", username: "RestlessSpirit" },
        { text: "Battling intrusive thoughts. Hoping for some peace soon.", username: "MindBattle" },
        { text: "A bit on edge today. Trying to manage the jitters.", username: "EdgeDweller" }
    ],
    "Calm": [
        { text: "A peaceful moment, just enjoying the quiet.", username: "ZenSeeker" },
        { text: "Feeling completely at ease and present.", username: "MindfulMe" },
        { text: "The gentle rain outside is so soothing.", username: "RainLover" },
        { text: "Meditating has brought such a sense of tranquility.", username: "Meditator" },
        { text: "Just finished a good book, feeling relaxed and content.", username: "Bookworm" },
        { text: "Everything feels balanced and harmonious right now.", username: "Harmony" },
        { text: "Enjoying a cup of tea and the stillness of the evening.", username: "TeaTime" },
        { text: "Took a long walk in nature. Feeling utterly serene.", username: "NatureLover" },
        { text: "Simply existing and appreciating the moment. Bliss.", username: "JustBe" }
    ],
    "Excited": [
        { text: "So much energy today! Ready to take on anything! 🎉", username: "Energizer" },
        { text: "Big news coming soon! Can't wait to share! 😄", username: "NewsBreaker" },
        { text: "Planning an adventure! The anticipation is killing me!", username: "Adventurer" },
        { text: "Feeling a surge of creativity and inspiration!", username: "Creator" },
        { text: "Got tickets to that show I've been wanting to see!", username: "ConcertGoer" },
        { text: "New opportunities on the horizon!", username: "OpportunityKnocks" },
        { text: "Just heard incredible news! My heart is racing!", username: "HeartRacer" },
        { text: "Counting down the days! This is going to be epic!", username: "CountdownChamp" }
    ],
    "Stressed": [
        { text: "Ugh, feeling really stressed and overwhelmed today. Deep breaths.", username: "UnderPressure" },
        { text: "Too much to do, too little time. Need a break.", username: "BurnedOut" },
        { text: "My to-do list just keeps growing. Send help!", username: "TaskList" },
        { text: "Feeling the weight of responsibilities. Wishing for an escape.", username: "HeavyBurden" },
        { text: "Trying to keep it together, but the stress is palpable.", username: "StressBall" },
        { text: "Brain feels like it's on overload. Time for a mental detox.", username: "BrainOnOverload" },
        { text: "Just want to fast forward to tomorrow. This day is a lot.", username: "FastForward" }
    ],
    "Grateful": [
        { text: "Feeling so grateful for the small blessings today. 🙏", username: "Blessed" },
        { text: "Appreciating the support system I have. So thankful.", username: "ThankfulHeart" },
        { text: "A simple gesture of kindness made my day. Grateful for good people.", username: "KindnessReceiver" },
        { text: "Thankful for health, sunshine, and a peaceful moment.", username: "SimpleJoys" },
        { text: "It's the little things that truly count.", username: "DetailsMatter" },
        { text: "So much to be thankful for, even on tough days.", username: "CountingBlessings" },
        { text: "Received unexpected good news today. Feeling truly blessed.", username: "GoodNewsGiver" },
        { text: "Grateful for quiet evenings and warm blankets.", username: "CozyGratitude" }
    ],
    "Neutral": [
        { text: "Just observing the day. Nothing particularly up or down.", username: "Observer" },
        { text: "A quiet, uneventful day. Sometimes that's good.", username: "SteadyState" },
        { text: "Doing some routine tasks. Feeling pretty meh.", username: "RobotMode" },
        { text: "Going with the flow today.", username: "GoWithFlow" },
        { text: "Neither here nor there, just being.", username: "JustBeing" },
        { text: "Getting through the motions. A typical day.", username: "TypicalDay" },
        { text: "The weather is bland, and so is my mood. Just existing.", username: "PlainJane" }
    ]
};

export function generateSeedPosts() {
    const moods = Object.keys(seedData); // Get moods dynamically from seedData

    let moodMessages = getMessages(); // Retrieve current messages from localStorage

    let addedCount = 0;

    moods.forEach(mood => {
        // Only generate if there are no existing messages for this mood
        if (!moodMessages[mood] || moodMessages[mood].length === 0) {
            console.log(`Generating seed posts for: ${mood}`);
            moodMessages[mood] = []; // Initialize array for this mood if it doesn't exist

            const numPostsToGenerate = Math.floor(Math.random() * (7 - 3 + 1)) + 3; // 3 to 7 posts

            for (let i = 0; i < numPostsToGenerate; i++) {
                const basePost = seedData[mood][i % seedData[mood].length]; // Cycle through available texts

                // Varying timestamps
                const now = new Date();
                let postDate = new Date(now);

                const timeAgoChoice = Math.random();
                if (timeAgoChoice < 0.4) { // 40% chance: recent (0-3 hours ago)
                    postDate.setMinutes(now.getMinutes() - Math.floor(Math.random() * 180));
                } else if (timeAgoChoice < 0.8) { // 40% chance: 1-3 days ago
                    postDate.setDate(now.getDate() - (Math.floor(Math.random() * 3) + 1));
                    postDate.setHours(Math.floor(Math.random() * 24)); // Random hour of the day
                } else { // 20% chance: 3-7 days ago
                    postDate.setDate(now.getDate() - (Math.floor(Math.random() * 5) + 3));
                    postDate.setHours(Math.random() * 24); // Random hour of the day
                }

                // Format timestamp
                const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
                const timestamp = postDate.toLocaleString('en-US', options);

                // Varying likes and views
                const likes = Math.floor(Math.random() * 50) + 5; // 5 to 54 likes
                const views = Math.floor(Math.random() * 200) + 20; // 20 to 219 views

                moodMessages[mood].push({
                    id: generateMessageId(),
                    text: basePost.text,
                    username: basePost.username,
                    timestamp: timestamp,
                    likes: likes,
                    views: views
                });
                addedCount++;
            }
        }
    });

    saveMessages(moodMessages); // Save updated messages to localStorage
    console.log(`Generated and added ${addedCount} seed posts.`);
}