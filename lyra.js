document.addEventListener('DOMContentLoaded', () => {
    // --- Screen and Element References ---
    const splashScreen = document.getElementById('splash-screen');
    const startGameButton = document.getElementById('start-game-button');
    const personalizationScreen = document.getElementById('personalization-screen');
    const nameInput = document.getElementById('name-input');
    const avatarEmojis = document.querySelectorAll('.avatar-emoji');
    const nextToChoicesButton = document.getElementById('next-to-choices-button');
    const hydrationScreen = document.getElementById('hydration-screen');
    const exerciseScreen = document.getElementById('exercise-screen');
    const socialScreen = document.getElementById('social-screen');
    const choiceButtons = document.querySelectorAll('.choice-button');
    const mealSelectionContainer = document.getElementById('meal-selection-container');
    const mealButtons = document.querySelectorAll('.meal-button');
    const gameContainer = document.getElementById('game-container');
    const foodItemsContainer = document.querySelector('.food-container');
    const plate = document.querySelector('.plate');
    const currentScoreElement = document.getElementById('current-score');
    const doneButton = document.getElementById('reset-button');
    const messageDisplay = document.getElementById('message-display');
    const avatarDisplay = document.getElementById('avatar-display');
    const nutrientMessageBox = document.getElementById('nutrient-message-box');
    const currentLevelElement = document.getElementById('current-level');
    const finalOutcomeScreen = document.getElementById('final-outcome-screen');
    const outcomeTitle = document.getElementById('outcome-title');
    const outcomeEmoji = document.getElementById('outcome-emoji');
    const outcomeMessage = document.getElementById('outcome-message');
    const playAgainButton = document.getElementById('play-again-button');

    // --- Game State Variables ---
    let userName = '';
    let avatar = '🧑';
    let totalHeartScore = 0;
    let currentLevel = 1;
    let nutrientsTally = {};
    let mealsBuiltCount = 0;

    // --- Data (Food Items) ---
    const allFoodsData = {
    'Dosa': { emoji: '🥞', score: 8, nutrients: ['Carbohydrates', 'Protein'], benefit: "Good for digestion.", fact: "World's largest dosa was 54 feet long!", significance: "Ancient South Indian staple." },
    'Ragi': { emoji: '🌾', score: 7, nutrients: ['Fiber', 'Vitamins'], benefit: "Helps manage blood sugar.", fact: "Can be stored for up to 10 years.", significance: "Oldest cultivated millets in India." },
    'Spinach & Methi': { emoji: '🍃', score: 6, nutrients: ['Vitamins', 'Fiber'], benefit: "Protects your heart from disease.", fact: "Loses most benefits when cooked.", significance: "Used in ancient Indian medicine." },
    'Almonds': { emoji: '🥜', score: 5, nutrients: ['Healthy Fats', 'Protein', 'Fiber'], benefit: "Helps lower bad cholesterol.", fact: "Technically a seed, not a nut.", significance: "Valuable food source on the Silk Road." },
    'Jalebi': { emoji: '🥨', score: -7, nutrients: ['Sugar', 'Unhealthy Fats'], benefit: "Can lead to weight gain.", fact: "Derived from the Arabic word 'Zulabiya'.", significance: "A Persian sweet made during festivals." },
    'Samosa': { emoji: '🥟', score: -5, nutrients: ['Unhealthy Fats', 'Refined Carbs'], benefit: "Contributes to inflammation.", fact: "Originated in the Middle East.", significance: "A popular travel snack for traders." },
    'Idly': { emoji: '🍚', score: 7, nutrients: ['Carbohydrates', 'Protein'], benefit: "Low in fat and easily digestible.", fact: "An entire museum is dedicated to it.", significance: "Mentioned in a 920 AD Kannada text." },
    'Dals': { emoji: '🍲', score: 8, nutrients: ['Protein', 'Fiber'], benefit: "Lowers blood pressure.", fact: "India is the world's largest producer.", significance: "One of the oldest domesticated crops." },
    'Pomegranates': { emoji: '🔴', score: 6, nutrients: ['Vitamins'], benefit: "Reduces inflammation.", fact: "A single one can contain over 1,000 seeds.", significance: "Symbol of health and fertility." },
    'Pakora': { emoji: '🥠', score: -6, nutrients: ['Unhealthy Fats'], benefit: "Adds unhealthy fats.", fact: "Voted one of the most popular street foods.", significance: "A centuries-old simple fritter." },
    'Gulab Jamun': { emoji: '🍩', score: -8, nutrients: ['Sugar', 'Unhealthy Fats'], benefit: "High in sugar and calories.", fact: "Name comes from Persian words 'gul' and 'ab'.", significance: "Evolved from a Turkish sweet." },
    'Oats': { emoji: '🥣', score: 7, nutrients: ['Fiber', 'Carbohydrates'], benefit: "Lowers bad cholesterol.", fact: "Used as food for humans for 4,500+ years.", significance: "First cultivated in ancient Europe." },
    'Vada Pav': { emoji: '🍔', score: -7, nutrients: ['Refined Carbs', 'Unhealthy Fats'], benefit: "High in calories and unhealthy fats.", fact: "Often called the 'Indian burger'.", significance: "Gained popularity in Mumbai in the 1960s." },
    'Bhajiya': { emoji: '🥔', score: -6, nutrients: ['Unhealthy Fats', 'Refined Carbs'], benefit: "High oil content.", fact: "Means 'fritter' in Marathi.", significance: "A long history as a quick snack." },
    'Roti': { emoji: '🫓', score: 5, nutrients: ['Carbohydrates', 'Fiber'], benefit: "Good source of fiber.", fact: "Unleavened bread.", significance: "A primary source of sustenance for thousands of years." },
    'Rice': { emoji: '🍚', score: 4, nutrients: ['Carbohydrates'], benefit: "Provides energy.", fact: "Most widely consumed staple food.", significance: "Cultivation dates back to 6500 BC in India." },
    'Pongal': { emoji: '🍚', score: 8, nutrients: ['Carbohydrates', 'Protein', 'Fiber'], benefit: "A wholesome and balanced meal.", fact: "The dish is a major part of the Pongal festival.", significance: "Symbolizes abundance and a new harvest." },
    'Idiyappam': { emoji: '🍜', score: 8, nutrients: ['Carbohydrates', 'Protein'], benefit: "Light, low-fat, and easily digestible.", fact: "Mentioned in 5th-century literature.", significance: "A popular dish in South India and Sri Lanka." },
    'Puttu': { emoji: '🪈', score: 8, nutrients: ['Carbohydrates', 'Fiber'], benefit: "Low in fat and rich in fiber.", fact: "Steamed in a cylindrical puttu maker.", significance: "A staple breakfast in Kerala." },
    'Conjee': { emoji: '🥣', score: 7, nutrients: ['Carbohydrates', 'Protein'], benefit: "Soothing and easy on the stomach.", fact: "The name is derived from the Tamil word 'kanji'.", significance: "A common " },
    'Tomato Soup': { emoji: '🍅', score: 6, nutrients: ['Vitamins', 'Antioxidants'], benefit: "Rich in antioxidants and supports heart health.", fact: "The first recipe was published in a 1798 cookbook.", significance: "A classic comfort food around the world." },
    'Poha': { emoji: '🌾', score: 7, nutrients: ['Carbohydrates', 'Iron', 'Fiber'], benefit: "Light, low in calories, and a good probiotic.", fact: "Is a flattened rice dish.", significance: "A popular and quick breakfast option in India." },
    'Boiled egg': { emoji: '🥚', score: 8, nutrients: ['Protein', 'Healthy Fats'], benefit: "Excellent source of protein and essential nutrients.", fact: "Very fresh eggs can be difficult to peel.", significance: "An ancient and universal food source." },
    'Khichdi': { emoji: '🍲', score: 9, nutrients: ['Carbohydrates', 'Protein', 'Fiber'], benefit: "A complete meal and excellent for digestion.", fact: "Often considered India's. ", significance: "A simple, ancient, and highly nutritious dish." },
    'Coconut Chutney': { emoji: '🥥', score: 5, nutrients: ['Healthy Fats'], benefit: "Provides healthy fats and minerals.", fact: "The primary ingredient is coconut pulp.", significance: "A common condiment in South Indian cuisine." },
    'Poori': { emoji: '🫓', score: -6, nutrients: ['Refined Carbs', 'Unhealthy Fats'], benefit: "High in calories and fried.", fact: "A deep-fried bread.", significance: "Often made for special occasions and festivals." },
    'Sandwich': { emoji: '🥪', score: 4, nutrients: ['Carbohydrates', 'Protein'], benefit: "Can be a balanced meal depending on ingredients.", fact: "Named after John Montagu, the 4th Earl of Sandwich.", significance: "A staple food worldwide for its portability." },
    'Upma': { emoji: '🍲', score: 6, nutrients: ['Carbohydrates', 'Fiber'], benefit: "A filling and quick-to-prepare meal.", fact: "Known as 'uppittu' in Karnataka.", significance: "A popular breakfast dish in South India." },
    'Pesarattu': { emoji: '🥞', score: 8, nutrients: ['Protein', 'Fiber'], benefit: "High in protein and low in calories.", fact: "Made from green gram.", significance: "A traditional dosa from Andhra Pradesh." },
    'Millet Idly': { emoji: '🍚', score: 8, nutrients: ['Fiber', 'Protein'], benefit: "More nutritious than traditional idlis.", fact: "Millet is one of the oldest cultivated grains.", significance: "A healthy alternative to a classic dish." },
    'Coconut Water': { emoji: '🥥', score: 9, nutrients: ['Electrolytes', 'Potassium'], benefit: "Excellent for hydration and a natural sports drink.", fact: "A single coconut can contain a large amount of water.", significance: "A natural source of hydration in tropical regions." },
    'Buttermilk': { emoji: '🥛', score: 8, nutrients: ['Calcium', 'Vitamins'], benefit: "Aids digestion and is a good source of probiotics.", fact: "Traditional buttermilk is a by-product of churning butter.", significance: "A cooling and digestive drink in hot climates." },
    'Badam Kheer': { emoji: '🍮', score: -7, nutrients: ['Sugar', 'Healthy Fats'], benefit: "Can be high in sugar but provides healthy fats from almonds.", fact: "Kheer's origins are rooted in ancient India and Mughal courts.", significance: "A decadent and traditional dessert for special occasions." },
    'Carrot Halwa': { emoji: '🥕', score: -8, nutrients: ['Sugar', 'Unhealthy Fats'], benefit: "High in sugar and calories.", fact: "An Indian astronaut took it to the International Space Station.", significance: "A popular dessert, especially in the winter." },
    'Vegetable Pulao': { emoji: '🍲', score: 6, nutrients: ['Carbohydrates', 'Vitamins'], benefit: "A balanced meal with a mix of carbs and vegetables.", fact: "A one-pot rice dish.", significance: "A festive dish in Indian cuisine." },
    'Dahi Bhat': { emoji: '🍚', score: 7, nutrients: ['Probiotics', 'Carbohydrates'], benefit: "Aids digestion and cools the body.", fact: "Often eaten at the end of a meal to help with spicy food.", significance: "A simple and popular dish in South India." },
    'Sambar Rice': { emoji: '🍲', score: 8, nutrients: ['Protein', 'Carbohydrates'], benefit: "A complete and wholesome meal.", fact: "A mix of sambar and rice.", significance: "A staple in many South Indian households." },
    'Ragi Ball': { emoji: '🫓', score: 8, nutrients: ['Fiber', 'Calcium'], benefit: "High in fiber and a great source of calcium.", fact: "Also known as 'ragi mudde'.", significance: "A traditional food of Karnataka." },
    'Ice Cream': { emoji: '🍦', score: -9, nutrients: ['Sugar', 'Unhealthy Fats'], benefit: "High in sugar and calories.", fact: "The origins of ice cream can be traced back to the 4th century B.C.", significance: "A universal sweet treat." },
    'Motichoor Ladoo': { emoji: '🟠', score: -9, nutrients: ['Sugar', 'Unhealthy Fats'], benefit: "Extremely high in sugar.", fact: "Motichoor means 'crushed pearls'.", significance: "A traditional Indian sweet made for festivals."},
    'Palak Paneer': { emoji: '🍲', score: 6, nutrients: ['Protein', 'Vitamins', 'Fiber'], benefit: "A good source of protein and essential vitamins.", fact: "Paneer, a type of cheese, is a common ingredient in Indian cuisine.", significance: "A popular dish in North Indian cuisine."},
    'Cashew katli(Burfi)': { emoji: '🟫', score: -8, nutrients: ['Sugar', 'Unhealthy Fats'], benefit: "High in sugar and calories.", fact: "The name 'burfi' comes from the Persian word for snow, 'barf'.", significance: "A classic Indian sweet for celebrations and festivals."},
    'Aloo Parata': { emoji: '🫓', score: -5, nutrients: ['Refined Carbs', 'Unhealthy Fats'], benefit: "Can be high in unhealthy fats due to oil.", fact: "A stuffed flatbread originating from the Indian subcontinent.", significance: "A popular breakfast or lunch dish in many parts of India."},
    'Vegetable Noodles': { emoji: '🍜', score: 4, nutrients: ['Carbohydrates', 'Vitamins'], benefit: "A quick meal with a mix of carbs and vegetables.", fact: "The earliest evidence of noodles comes from China, dating back 4,000 years.", significance: "A popular street food and quick meal option."},
    'Badam Milk': { emoji: '🥛', score: 7, nutrients: ['Healthy Fats', 'Protein'], benefit: "A source of healthy fats and protein from almonds.", fact: "Almonds were one of the earliest cultivated nuts.", significance: "A traditional, comforting, and nutritious drink."},
    'Dry fruit Laddu': { emoji: '🟡', score: 7, nutrients: ['Fiber', 'Healthy Fats', 'Vitamins'], benefit: "Provides energy and healthy fats.", fact: "A traditional Indian sweet often made with dates and nuts.", significance: "Commonly prepared during festivals like Diwali."},
    'Pani Poori': { emoji: '⚪', score: -7, nutrients: ['Refined Carbs', 'Unhealthy Fats'], benefit: "High in refined carbs and fried.", fact: "A popular street food across the Indian subcontinent.", significance: "A crunchy and savory snack for social gatherings."},
    'Vada': { emoji: '🍩', score: -6, nutrients: ['Unhealthy Fats', 'Refined Carbs'], benefit: "High oil content.", fact: "A savory fried snack from South India.", significance: "Often served as a snack or a side dish."},
    'Banana': { emoji: '🍌', score: 8, nutrients: ['Potassium', 'Fiber'], benefit: "A good source of potassium for heart health.", fact: "A single banana can contain around 422mg of potassium.", significance: "One of the world's most popular fruits."},
    'Pop Corn': { emoji: '🍿', score: 5, nutrients: ['Fiber', 'Carbohydrates'], benefit: "A whole grain snack with good fiber.", fact: "A type of corn that expands from the kernel and puffs up when heated.", significance: "Enjoyed as a snack for thousands of years."},
    'French Fries': { emoji: '🍟', score: -8, nutrients: ['Unhealthy Fats', 'Refined Carbs'], benefit: "High in unhealthy fats and calories.", fact: "Disputed origins, but popular in the United States and France.", significance: "A popular side dish and snack worldwide."},
    'Chocolate': { emoji: '🍫', score: -6, nutrients: ['Sugar', 'Unhealthy Fats'], benefit: "Can be high in sugar and fat.", fact: "Originated from the Cacao tree in the Americas.", significance: "A popular treat and ingredient in many desserts."},

};
    const mealPlateMap = {
        'breakfast': ['Dosa', 'Idly', 'Oats', 'Ragi', 'Pomegranates', 'Pongal', 'Idiyappam', 'Puttu', 'Conjee', 'Tomato Soup', 'Poha', 'Boiled egg', 'Khichdi', 'Coconut Chutney', 'Poori', 'Sandwich', 'Upma', 'Pesarattu', 'Millet Idly', 'Coconut Water'],
        'lunch': ['Dals', 'Roti', 'Rice', 'Spinach & Methi', 'Pomegranates', 'Buttermilk', 'Badam Kheer', 'Carrot Halwa', 'Vegetable Pulao', 'Boiled egg', 'Dahi Bhat', 'Sambar Rice', 'Ragi Ball', 'Coconut Chutney', 'Ice Cream'],
        'dinner': ['Dals', 'Roti', 'Spinach & Methi', 'Gulab Jamun', 'Tomato Soup', 'Sandwich', 'Buttermilk', 'Vegetable Pulao', 'Palak Paneer', 'Cashew katli(Burfi)', 'Aloo Parata', 'Vegetable Noodles', 'Badam Milk', 'Ice Cream'],
        'snacks': ['Samosa', 'Jalebi', 'Pakora', 'Gulab Jamun', 'Almonds', 'Pomegranates', 'Bhajiya', 'Motichoor Ladoo', 'Dry fruit Laddu', 'Sandwich', 'Pani Poori', 'Vada', 'Banana', 'Pop Corn', 'French Fries', 'Chocolate', 'Vada Pav']
};

    // --- Core Functions ---
    const showScreen = (screenElement) => {
        document.querySelectorAll('.story-screen, #game-container').forEach(screen => {
            screen.classList.remove('active');
        });
        screenElement.classList.add('active');
    };

    const updateFoodDisplay = (mealType) => {
        foodItemsContainer.innerHTML = '';
        const foodNames = mealPlateMap[mealType];
        foodNames.forEach(foodName => {
            const data = allFoodsData[foodName];
            const foodDiv = document.createElement('div');
            foodDiv.className = 'food-item';
            foodDiv.dataset.healthScore = data.score;
            foodDiv.dataset.foodName = foodName;
            foodDiv.innerHTML = `<span class="food-emoji">${data.emoji}</span><span class="food-name">${foodName}</span>`;
            foodItemsContainer.appendChild(foodDiv);
        });
    };

    const updateAvatarEmoji = () => {
        if (totalHeartScore >= 15) { avatarDisplay.textContent = '🥳'; }
        else if (totalHeartScore >= 5) { avatarDisplay.textContent = '😊'; }
        else if (totalHeartScore < 0) { avatarDisplay.textContent = '😟'; }
        else { avatarDisplay.textContent = avatar; }
    };

    const displayFoodInfo = (foodName) => {
        const foodData = allFoodsData[foodName];
        if (foodData) {
            const message = `
                **${foodName}:**
                <br>
                **Benefits:** ${foodData.benefit}
                <br>
                **Fun Fact:** ${foodData.fact}
                <br>
                **Significance:** ${foodData.significance}
            `;
            nutrientMessageBox.innerHTML = message;
            nutrientMessageBox.style.opacity = 1;
        }
    };

    const resetPlateAndScore = () => {
        plate.innerHTML = '';
        messageDisplay.textContent = "";
        nutrientMessageBox.innerHTML = '';
        nutrientMessageBox.style.opacity = 0;
        nutrientsTally = { 'Carbohydrates': 0, 'Protein': 0, 'Fiber': 0, 'Vitamins': 0, 'Healthy Fats': 0, 'Sugar': 0, 'Unhealthy Fats': 0, 'Refined Carbs': 0 };
    };

    const updateScreenTitle = (screenElement, titleText) => {
        const titleElement = screenElement.querySelector('h2');
        if (titleElement) {
            titleElement.innerHTML = titleText;
        }
    };

    const updateOutcomeScreen = () => {
        if (totalHeartScore >= 10) {
            outcomeTitle.textContent = "Congratulations, " + userName + " is a Heart-Healthy Champion!";
            outcomeEmoji.textContent = "🏆";
            outcomeMessage.textContent = "By making healthy choices every day, you're actively preventing heart disease. You can be a champion too!";
        } else {
            outcomeTitle.textContent = "Warning: " + userName + " is Prone to Heart Disease";
            outcomeEmoji.textContent = "😟";
            outcomeMessage.textContent = "Unhealthy choices can put your heart at risk. It's not too late to start making better decisions!";
        }
        showScreen(finalOutcomeScreen);
    };

    // --- Event Listeners ---
    startGameButton.addEventListener('click', () => {
        document.getElementById('game-main-content').style.display = 'block';
        showScreen(personalizationScreen);
    });

    avatarEmojis.forEach(emoji => {
        emoji.addEventListener('click', () => {
            avatarEmojis.forEach(e => e.classList.remove('selected'));
            emoji.classList.add('selected');
            avatar = emoji.dataset.avatar;
            avatarDisplay.textContent = avatar;
        });
    });

    nextToChoicesButton.addEventListener('click', () => {
        userName = nameInput.value || 'Friend';
        const hydrationTitle = `Welcome, ${userName}!`;
        updateScreenTitle(hydrationScreen, hydrationTitle);
        showScreen(hydrationScreen);
    });

    let choiceCounter = 0;
    choiceButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const points = parseInt(event.currentTarget.dataset.points);
            totalHeartScore += points;
            currentScoreElement.textContent = totalHeartScore;
            updateAvatarEmoji();

            choiceCounter++;
            if (choiceCounter < 3) {
                const nextScreenId = choiceCounter === 1 ? 'exercise-screen' : 'social-screen';
                const nextScreen = document.getElementById(nextScreenId);
                const nextTitle = `${userName}'s Next Choice...`;
                updateScreenTitle(nextScreen, nextTitle);
                showScreen(nextScreen);
            } else {
                showScreen(mealSelectionContainer);
                resetPlateAndScore();
            }
        });
    });

    mealButtons.forEach(button => {
        button.addEventListener('click', () => {
            const mealType = button.dataset.mealType;
            resetPlateAndScore();
            updateFoodDisplay(mealType);
            mealButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            showScreen(gameContainer);
        });
    });

    // Event delegation for food items on the plate
    foodItemsContainer.addEventListener('click', (event) => {
        const item = event.target.closest('.food-item');
        if (!item) { return; }

        if (plate.children.length >= 6) {
            messageDisplay.textContent = "The plate is full! Please press 'Done with Meal'.";
            return;
        }

        const score = parseInt(item.dataset.healthScore);
        const foodName = item.dataset.foodName;
        totalHeartScore += score;
        currentScoreElement.textContent = totalHeartScore;
        messageDisplay.textContent = ''; // Clear message if plate was full

        const clonedItem = item.cloneNode(true);
        clonedItem.classList.add('cloned-food-item');
        const xPos = Math.random() * (plate.offsetWidth - 70);
        const yPos = Math.random() * (plate.offsetHeight - 70);
        clonedItem.style.transform = `translate(${xPos}px, ${yPos}px)`;
        plate.appendChild(clonedItem);

        const data = allFoodsData[foodName];
        if (data && data.nutrients) {
            data.nutrients.forEach(nutrient => {
                nutrientsTally[nutrient] = (nutrientsTally[nutrient] || 0) + 1;
            });
        }
        updateAvatarEmoji();
        displayFoodInfo(foodName);
    });

    doneButton.addEventListener('click', () => {
        mealsBuiltCount++;
        messageDisplay.textContent = "Meal complete! Moving to the next...";
        setTimeout(() => {
            resetPlateAndScore();
            if (mealsBuiltCount >= 2) {
                updateOutcomeScreen();
            } else {
                showScreen(mealSelectionContainer);
                currentLevelElement.textContent = mealsBuiltCount + 1;
            }
        }, 3000);
    });

    playAgainButton.addEventListener('click', () => {
        totalHeartScore = 0;
        mealsBuiltCount = 0;
        userName = '';
        avatar = '🧑';
        choiceCounter = 0;

        resetPlateAndScore();
        currentScoreElement.textContent = totalHeartScore;
        avatarDisplay.textContent = '🧑';
        currentLevelElement.textContent = '1';
        nameInput.value = '';
        avatarEmojis.forEach(e => e.classList.remove('selected'));
        showScreen(splashScreen);
    });
});