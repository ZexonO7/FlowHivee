import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate, useLocation } from "react-router-dom";
import { BookOpen, ArrowLeft, ArrowRight, CheckCircle, Video, FileText, Headphones, Download, Play, Brain, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Lesson content database
const lessonContent: Record<number, any> = {
  1: {
    title: "Introduction to Algebra",
    subject: "Mathematics",
    duration: "45 min",
    videoUrl: "/video lessons/Introduction to Algebra (1 of 2_ What Happens when you don t know a number which you need to find ).mp4",
    hasQuiz: true,
    documents: [
      { 
        name: "Algebra Basics Workbook.pdf", 
        size: "2.4 MB",
        content: "# Algebra Basics Workbook\n\n## Chapter 1: Variables and Expressions\n\nVariables are letters that represent unknown numbers. We use them to solve problems!\n\n### Key Concepts:\n- Variables (x, y, z) represent unknown values\n- Constants are fixed numbers (1, 2, 3, etc.)\n- Expressions combine variables and constants (2x + 5)\n\n### Practice Problems:\n\n1. If x = 3, what is 2x + 4?\n   Answer: 2(3) + 4 = 6 + 4 = 10\n\n2. Solve: x + 7 = 12\n   Answer: x = 12 - 7 = 5\n\n3. What is 3(x - 2) when x = 5?\n   Answer: 3(5 - 2) = 3(3) = 9\n\n## Tips for Success:\n✓ Always isolate the variable\n✓ Do the same operation to both sides\n✓ Check your answer by substituting back\n✓ Practice daily for best results!"
      },
      { 
        name: "Practice Problems.pdf", 
        size: "1.8 MB",
        content: "# Algebra Practice Problems\n\n## Easy Level\n1. x + 5 = 10 → x = ?\n2. 2x = 8 → x = ?\n3. x - 3 = 7 → x = ?\n\n## Medium Level\n4. 3x + 2 = 11 → x = ?\n5. 2(x + 1) = 10 → x = ?\n6. 4x - 3 = 13 → x = ?\n\n## Challenge Level\n7. 5x + 3 = 2x + 12 → x = ?\n8. 3(2x - 1) = 15 → x = ?\n9. x/2 + 4 = 7 → x = ?\n\n## Answer Key\n1. x = 5\n2. x = 4\n3. x = 10\n4. x = 3\n5. x = 4\n6. x = 4\n7. x = 3\n8. x = 3\n9. x = 6"
      },
      { 
        name: "Formula Sheet.pdf", 
        size: "890 KB",
        file: "/lessons/algebra-formula-sheet.pdf",
        content: `# Basic Algebra Formulas

## Essential Algebraic Identities

1. (a + b)² = a² + 2ab + b²
2. (a - b)² = a² - 2ab + b²
3. (a + b)(a - b) = a² - b²
4. (x + a)(x + b) = x² + (a + b)x + ab
5. (x - a)(x - b) = x² - (a + b)x + ab
6. (a + b + c)² = a² + b² + c² + 2(ab + bc + ca)
7. (a - b - c)² = a² + b² + c² - 2(ab - bc + ca)
8. (a + b)³ = a³ + 3a²b + 3ab² + b³
9. (a - b)³ = a³ - 3a²b + 3ab² - b³
10. (a + b + c)³ = a³ + b³ + c³ + 3(a + b)(b + c)(c + a)

These formulas are essential for solving algebraic equations and simplifying expressions.`
      },
    ],
    sections: [
      {
        type: "intro",
        title: "What is Algebra?",
        content: "Algebra is a branch of mathematics that uses letters and symbols to represent numbers and quantities in formulas and equations. It's like a puzzle where we need to find the missing pieces!",
        videoUrl: "/video lessons/Introduction to Algebra (1 of 2_ What Happens when you don t know a number which you need to find ).mp4",
      },
      {
        type: "text",
        title: "Variables and Constants",
        content: "In algebra, we use variables (like x, y, z) to represent unknown values. Constants are fixed numbers that don't change. For example, in the equation 2x + 5 = 11, 'x' is the variable, while 2, 5, and 11 are constants.",
        videoUrl: "/video lessons/Variables and Constents.mp4",
      },
      {
        type: "example",
        title: "Example: Solving for x",
        content: "Let's solve: x + 7 = 15\n\nStep 1: We want to get x alone\nStep 2: Subtract 7 from both sides\nx + 7 - 7 = 15 - 7\nx = 8\n\nThat's it! x equals 8.",
      },
      {
        type: "practice",
        title: "Try it yourself!",
        content: "Practice problems:\n1. x + 5 = 12 (Answer: x = 7)\n2. 2x = 10 (Answer: x = 5)\n3. x - 3 = 9 (Answer: x = 12)",
      },
      {
        type: "summary",
        title: "Key Takeaways",
        content: "✓ Variables represent unknown values\n✓ We can solve equations by isolating the variable\n✓ What we do to one side, we must do to the other\n✓ Practice makes perfect!",
      },
    ],
  },
  2: {
    title: "The Water Cycle",
    subject: "Science",
    duration: "30 min",
    videoUrl: "", // User will provide later
    hasQuiz: true,
    documents: [
      { 
        name: "Water Cycle Diagram.pdf", 
        size: "1.2 MB",
        content: "# The Water Cycle\n\n## Visual Diagram\n\n```\n        ☀️ SUN HEATS WATER\n            ↓\n    💨 EVAPORATION\n    (liquid → vapor)\n            ↓\n        ☁️ CONDENSATION\n    (vapor → droplets)\n            ↓\n        🌧️ PRECIPITATION\n        (rain, snow)\n            ↓\n    🌊 COLLECTION\n    (rivers, oceans)\n            ↓\n        (cycle repeats)\n```\n\n## The Four Stages:\n\n1. **EVAPORATION** 💨\n   - Sun heats water\n   - Liquid turns to vapor\n   - Rises into atmosphere\n\n2. **CONDENSATION** ☁️\n   - Vapor cools down\n   - Forms tiny droplets\n   - Creates clouds\n\n3. **PRECIPITATION** 🌧️\n   - Droplets combine\n   - Become heavy\n   - Fall as rain/snow\n\n4. **COLLECTION** 🌊\n   - Water gathers\n   - In oceans, lakes, rivers\n   - Cycle starts again!"
      },
      { 
        name: "Study Notes.pdf", 
        size: "950 KB",
        content: "# Water Cycle Study Notes\n\n## Key Terms\n\n**Evaporation**: Process where liquid water becomes water vapor (gas)\n- Happens when sun heats water\n- Water molecules gain energy\n- Rise into the air\n\n**Condensation**: Water vapor becomes liquid\n- Vapor cools in atmosphere\n- Forms tiny water droplets\n- These droplets make clouds\n\n**Precipitation**: Water falling from sky\n- Rain, snow, sleet, or hail\n- Happens when clouds get heavy\n- Returns water to Earth\n\n**Collection**: Water gathering on Earth\n- Flows to oceans, rivers, lakes\n- Some soaks into ground\n- Cycle continues from here\n\n## Why It Matters\n- Water is never created or destroyed\n- Same water has been cycling for billions of years\n- Essential for all life on Earth\n- Helps regulate Earth's temperature"
      },
      { 
        name: "Experiment Guide.pdf", 
        size: "1.5 MB",
        content: "# Water Cycle Experiments\n\n## Experiment 1: Mini Water Cycle\n\n**Materials:**\n- Clear plastic bowl\n- Plastic wrap\n- Small cup\n- Water\n- Small weight (like a coin)\n\n**Steps:**\n1. Put cup in center of bowl\n2. Pour water around cup (not in it)\n3. Cover bowl with plastic wrap\n4. Put weight on wrap over cup\n5. Place in sunny spot\n6. Wait a few hours\n\n**What Happens:**\n- Water evaporates from bowl\n- Condenses on plastic wrap\n- Drips into cup (precipitation!)\n\n## Experiment 2: Cloud in a Jar\n\n**Materials:**\n- Glass jar\n- Hot water\n- Ice cubes\n- Plate\n\n**Steps:**\n1. Pour hot water in jar (1 inch)\n2. Put plate with ice on top\n3. Watch what happens!\n\n**Result:** You'll see a cloud form inside the jar!"
      },
    ],
    sections: [
      {
        type: "intro",
        title: "Understanding the Water Cycle",
        content: "The water cycle is Earth's natural recycling system! Water moves continuously between the ocean, atmosphere, and land through four main processes.",
      },
      {
        type: "text",
        title: "1. Evaporation",
        content: "When the sun heats water in rivers, lakes, or oceans, it turns into water vapor (a gas) and rises into the air. This is called evaporation. Think of it like water 'disappearing' into the air!",
      },
      {
        type: "text",
        title: "2. Condensation",
        content: "As water vapor rises and cools down, it turns back into tiny water droplets. These droplets come together to form clouds. This process is called condensation - it's why you see water droplets on a cold glass!",
      },
      {
        type: "text",
        title: "3. Precipitation",
        content: "When clouds get heavy with water droplets, they fall back to Earth as rain, snow, sleet, or hail. This is precipitation - nature's way of returning water to the ground.",
      },
      {
        type: "text",
        title: "4. Collection",
        content: "When precipitation reaches the ground, it collects in oceans, rivers, lakes, and underground. From here, the cycle starts all over again with evaporation!",
      },
      {
        type: "summary",
        title: "The Cycle Continues",
        content: "🌊 Evaporation → ☁️ Condensation → 🌧️ Precipitation → 🏞️ Collection → repeat!\n\nThis cycle has been happening for billions of years and is essential for all life on Earth.",
      },
    ],
  },
  3: {
    title: "Creative Writing Basics",
    subject: "English",
    duration: "40 min",
    videoUrl: "", // User will provide later
    hasQuiz: true,
    documents: [
      { 
        name: "Writing Prompts Collection.pdf", 
        size: "2.1 MB",
        content: "# Creative Writing Prompts\n\n## Story Starters\n\n1. **The Mysterious Door**\n   You find a door in your basement you've never seen before...\n\n2. **Time Traveler's Mistake**\n   You accidentally travel 100 years into the future...\n\n3. **The Talking Pet**\n   One morning, your pet starts speaking to you...\n\n4. **Magical Backpack**\n   Your backpack grants one wish per day, but...\n\n5. **Invisible for a Day**\n   You wake up invisible. What do you do?\n\n## Character Ideas\n\n- A shy inventor who builds talking robots\n- A brave girl who can speak to animals\n- A clumsy wizard's apprentice\n- A detective who solves mysteries with her cat\n\n## Setting Ideas\n\n- A floating city in the clouds\n- An underwater kingdom\n- A magical library where books come alive\n- A school on Mars\n\n## Tips for Writing:\n✍️ Start with an interesting character\n✍️ Create a problem they must solve\n✍️ Add unexpected twists\n✍️ Show emotions through actions\n✍️ End with a satisfying conclusion"
      },
      { 
        name: "Grammar Guide.pdf", 
        size: "1.7 MB",
        content: "# Grammar Quick Guide\n\n## Parts of Speech\n\n**Nouns**: Person, place, or thing\n- Examples: cat, school, happiness\n\n**Verbs**: Action or state of being\n- Examples: run, jump, is, was\n\n**Adjectives**: Describe nouns\n- Examples: big, blue, happy\n\n**Adverbs**: Describe verbs\n- Examples: quickly, slowly, carefully\n\n## Common Mistakes\n\n❌ Their/There/They're\n✓ Their = possessive (their book)\n✓ There = location (over there)\n✓ They're = they are (they're happy)\n\n❌ Your/You're\n✓ Your = possessive (your pencil)\n✓ You're = you are (you're smart)\n\n❌ Its/It's\n✓ Its = possessive (its tail)\n✓ It's = it is (it's raining)\n\n## Punctuation\n\n**Period (.)** - End of sentence\n**Question Mark (?)** - Asking\n**Exclamation (!)** - Strong feeling\n**Comma (,)** - Pause or list\n**Quotation (\"\")** - Speech"
      },
      { 
        name: "Story Templates.pdf", 
        size: "1.3 MB",
        content: "# Story Templates\n\n## The Hero's Journey\n\n1. **Ordinary World**: Introduce your character\n2. **Call to Adventure**: Something happens\n3. **Challenges**: Problems they face\n4. **Climax**: Biggest challenge\n5. **Resolution**: How it ends\n\n## Example:\n\n**Beginning**\nSam was an ordinary student who loved science...\n\n**Middle**\nOne day, Sam discovered a formula that could...\nBut then, a problem occurred...\n\n**End**\nAfter facing many challenges, Sam finally...\n\n## Story Planning Sheet\n\n**Main Character**: _______\n**Setting**: _______\n**Problem**: _______\n**How they solve it**: _______\n**Ending**: _______\n\n## Helpful Words\n\n**Time Words**: first, next, then, finally, meanwhile\n**Feeling Words**: excited, nervous, proud, worried\n**Action Words**: raced, whispered, grabbed, discovered"
      },
    ],
    sections: [
      {
        type: "intro",
        title: "The Art of Storytelling",
        content: "Every great story has certain elements that make it engaging and memorable. Let's explore the building blocks of creative writing!",
      },
      {
        type: "text",
        title: "Story Elements",
        content: "Every story needs:\n\n• Characters - Who is in your story?\n• Setting - Where and when does it take place?\n• Plot - What happens? (Beginning, Middle, End)\n• Conflict - What problem do the characters face?\n• Resolution - How is the problem solved?",
      },
      {
        type: "text",
        title: "Show, Don't Tell",
        content: "Instead of: 'She was sad.'\nTry: 'Tears rolled down her cheeks as she stared at the empty chair.'\n\nShowing emotions through actions and descriptions makes your writing come alive!",
      },
      {
        type: "example",
        title: "Descriptive Writing",
        content: "Compare these:\n\nTelling: 'The room was messy.'\n\nShowing: 'Clothes spilled from the overflowing hamper, books lay scattered across the floor, and yesterday's dishes created a small mountain on the desk.'",
      },
      {
        type: "practice",
        title: "Your Turn to Write!",
        content: "Writing prompt: Write a short paragraph about your favorite place. Use descriptive words that appeal to all five senses (sight, sound, smell, taste, touch).",
      },
      {
        type: "summary",
        title: "Remember",
        content: "✍️ Every story needs characters, setting, and plot\n✍️ Show emotions through actions and descriptions\n✍️ Use sensory details to bring your writing to life\n✍️ Practice regularly - every writer started somewhere!",
      },
    ],
  },
  4: {
    title: "Ancient Civilizations",
    subject: "History",
    duration: "50 min",
    videoUrl: "", // User will provide later
    hasQuiz: true,
    documents: [
      { 
        name: "Ancient Civilizations Timeline.pdf", 
        size: "3.2 MB",
        content: "# Ancient Civilizations Timeline\n\n## 🏜️ Ancient Egypt (3100 BCE - 30 BCE)\n\n**Key Dates:**\n- 3100 BCE: Egypt unified under first pharaoh\n- 2560 BCE: Great Pyramid of Giza built\n- 1334 BCE: King Tutankhamun rules\n- 30 BCE: Egypt becomes part of Roman Empire\n\n**Achievements:**\n- Built pyramids and sphinx\n- Invented hieroglyphic writing\n- Advanced mathematics and astronomy\n- Mummification techniques\n- Paper from papyrus reeds\n\n## 🏛️ Ancient Greece (800 BCE - 146 BCE)\n\n**Key Dates:**\n- 776 BCE: First Olympic Games\n- 508 BCE: Democracy begins in Athens\n- 432 BCE: Parthenon completed\n- 146 BCE: Rome conquers Greece\n\n**Achievements:**\n- Democracy (government by the people)\n- Philosophy (Socrates, Plato, Aristotle)\n- Olympic Games\n- Theater and drama\n- Advanced mathematics (geometry)\n\n## 🏛️ Ancient Rome (753 BCE - 476 CE)\n\n**Key Dates:**\n- 753 BCE: Rome founded\n- 44 BCE: Julius Caesar assassinated\n- 27 BCE: Roman Empire begins\n- 476 CE: Western Empire falls\n\n**Achievements:**\n- Roads and aqueducts\n- Roman law system\n- Concrete and arches\n- Latin language\n- Military tactics"
      },
      { 
        name: "Map of Ancient World.pdf", 
        size: "2.8 MB",
        content: "# Ancient World Geography\n\n## Ancient Egypt\n\n```\n    MEDITERRANEAN SEA\n         |\n    [NILE DELTA]\n         |\n    [LOWER EGYPT]\n         |\n    === NILE RIVER ===\n         |\n    [UPPER EGYPT]\n         |\n    [VALLEY OF KINGS]\n         |\n    [NUBIA]\n```\n\n**Key Locations:**\n- Giza: Pyramids and Sphinx\n- Cairo: Modern capital\n- Luxor: Valley of the Kings\n- Alexandria: Great Library\n\n## Ancient Greece\n\n```\n[MACEDONIA]\n    |\n[ATHENS] --- [SPARTA]\n    |\n[MEDITERRANEAN SEA]\n    |\n[CRETE]\n```\n\n**Key City-States:**\n- Athens: Democracy, philosophy\n- Sparta: Military power\n- Corinth: Trade center\n- Delphi: Oracle temple\n\n## Ancient Rome\n\n```\n     [GAUL]\n        |\n    [ROME] --- [GREECE]\n        |\n   [CARTHAGE]\n        |\n    [EGYPT]\n```\n\n**Empire at Peak:**\n- Stretched from Britain to Egypt\n- Mediterranean = \"Roman Lake\"\n- 50+ million people"
      },
      { 
        name: "Cultural Comparisons.pdf", 
        size: "1.9 MB",
        content: "# Comparing Ancient Civilizations\n\n## Government\n\n**Egypt**: Pharaoh (god-king)\n- Absolute power\n- Religious leader\n- Ruled for life\n\n**Greece**: Democracy (Athens)\n- Citizens vote\n- Direct participation\n- Only free men\n\n**Rome**: Republic → Empire\n- Senate and consuls\n- Later: emperors\n- Written laws\n\n## Religion\n\n**Egypt**: Many gods\n- Ra (sun god)\n- Osiris (afterlife)\n- Animal-headed gods\n\n**Greece**: Olympic gods\n- Zeus (king of gods)\n- Athena (wisdom)\n- Human-like gods\n\n**Rome**: Adopted Greek gods\n- Jupiter (Zeus)\n- Mars (war god)\n- Later: Christianity\n\n## Legacy\n\n**Egypt gave us:**\n- Calendar (365 days)\n- Paper (papyrus)\n- Architecture\n\n**Greece gave us:**\n- Democracy\n- Philosophy\n- Olympics\n- Theater\n\n**Rome gave us:**\n- Law systems\n- Engineering\n- Roads\n- Latin language"
      },
    ],
    sections: [
      {
        type: "intro",
        title: "Journey to the Past",
        content: "Ancient civilizations built incredible societies thousands of years ago. Let's explore three of the greatest: Egypt, Greece, and Rome!",
      },
      {
        type: "text",
        title: "Ancient Egypt (3100 BCE - 30 BCE)",
        content: "The Egyptian civilization flourished along the Nile River. They are famous for:\n\n🏛️ Pyramids and Sphinx\n📜 Hieroglyphic writing\n👑 Powerful Pharaohs\n⚰️ Mummification practices\n\nThe Nile River was crucial - its annual floods provided rich soil for farming!",
      },
      {
        type: "text",
        title: "Ancient Greece (800 BCE - 146 BCE)",
        content: "Greek civilization gave us:\n\n🏛️ Democracy (rule by the people)\n🎭 Theater and drama\n🏃 Olympic Games\n📚 Philosophy (Socrates, Plato, Aristotle)\n⚡ Mythology (Zeus, Athena, Apollo)\n\nGreek ideas about government and thinking still influence us today!",
      },
      {
        type: "text",
        title: "Ancient Rome (753 BCE - 476 CE)",
        content: "The Roman Empire was massive and powerful:\n\n🏛️ Advanced architecture (Colosseum, aqueducts)\n⚔️ Powerful military and conquered lands\n📜 Roman law system\n🛣️ Roads connecting the empire\n🗣️ Latin language (root of many modern languages)\n\nRome's influence on law, language, and government is still felt worldwide!",
      },
      {
        type: "example",
        title: "Comparing the Three",
        content: "Egypt: Known for monuments and preservation of the dead\nGreece: Known for ideas, philosophy, and democracy\nRome: Known for engineering, law, and military might\n\nEach civilization contributed unique achievements to human history!",
      },
      {
        type: "summary",
        title: "Legacy of Ancient Civilizations",
        content: "🌍 These civilizations shaped our modern world\n📚 Their inventions and ideas still influence us\n🏛️ They built lasting monuments we can still visit\n💡 They solved problems creatively with limited technology",
      },
    ],
  },
  5: {
    title: "Python Programming",
    subject: "Computer Science",
    duration: "60 min",
    videoUrl: "", // User will provide later
    hasQuiz: true,
    documents: [
      { 
        name: "Python Cheat Sheet.pdf", 
        size: "1.1 MB",
        content: "# Python Cheat Sheet\n\n## Basic Commands\n\n```python\n# Print output\nprint('Hello, World!')\nprint(42)\nprint('My age is', 13)\n\n# Variables\nname = 'Alex'\nage = 13\nheight = 5.5\n\n# User Input\nname = input('What is your name? ')\nprint('Hello,', name)\n```\n\n## Data Types\n\n```python\n# String (text)\nmessage = 'Hello'\nname = \"Python\"\n\n# Integer (whole numbers)\nage = 13\nscore = 100\n\n# Float (decimals)\nheight = 5.5\nprice = 9.99\n\n# Boolean (True/False)\nis_student = True\nhas_homework = False\n```\n\n## Math Operations\n\n```python\n# Basic Math\nprint(5 + 3)   # 8\nprint(10 - 4)  # 6\nprint(6 * 7)   # 42\nprint(15 / 3)  # 5.0\nprint(10 % 3)  # 1 (remainder)\n\n# Variables\nx = 5\ny = 3\nprint(x + y)   # 8\n```\n\n## Conditionals\n\n```python\nage = 13\nif age >= 13:\n    print('Teenager')\nelif age >= 6:\n    print('Child')\nelse:\n    print('Younger')\n```"
      },
      { 
        name: "Code Examples.pdf", 
        size: "2.3 MB",
        content: "# Python Code Examples\n\n## Example 1: Simple Calculator\n\n```python\nnum1 = int(input('First number: '))\nnum2 = int(input('Second number: '))\n\nprint('Sum:', num1 + num2)\nprint('Difference:', num1 - num2)\nprint('Product:', num1 * num2)\nprint('Quotient:', num1 / num2)\n```\n\n## Example 2: Age Checker\n\n```python\nage = int(input('How old are you? '))\n\nif age >= 18:\n    print('You are an adult!')\nelif age >= 13:\n    print('You are a teenager!')\nelse:\n    print('You are a child!')\n```\n\n## Example 3: Counting Loop\n\n```python\n# Count from 1 to 5\nfor i in range(1, 6):\n    print(i)\n\n# Count from 1 to 10 by 2s\nfor i in range(1, 11, 2):\n    print(i)\n```\n\n## Example 4: Greeting Program\n\n```python\nname = input('What is your name? ')\nfavorite_color = input('Favorite color? ')\n\nprint(f'Hello {name}!')\nprint(f'I love {favorite_color} too!')\n```\n\n## Example 5: Simple Game\n\n```python\nimport random\n\nsecret = random.randint(1, 10)\nguess = int(input('Guess (1-10): '))\n\nif guess == secret:\n    print('You won! 🎉')\nelse:\n    print(f'Wrong! It was {secret}')\n```"
      },
      { 
        name: "Projects Guide.pdf", 
        size: "3.5 MB",
        content: "# Python Project Ideas\n\n## Beginner Projects\n\n### 1. Mad Libs Game\n```python\nnoun = input('Enter a noun: ')\nverb = input('Enter a verb: ')\nadjective = input('Enter an adjective: ')\n\nstory = f'The {adjective} {noun} {verb} quickly!'\nprint(story)\n```\n\n### 2. Temperature Converter\n```python\ncelsius = float(input('Celsius: '))\nfahrenheit = (celsius * 9/5) + 32\nprint(f'{celsius}°C = {fahrenheit}°F')\n```\n\n### 3. Countdown Timer\n```python\nimport time\n\nfor i in range(10, 0, -1):\n    print(i)\n    time.sleep(1)\nprint('Blast off! 🚀')\n```\n\n## Intermediate Projects\n\n### 4. Simple Quiz\n```python\nscore = 0\n\nprint('Question 1: What is 2+2?')\nif input() == '4':\n    score += 1\n    print('Correct!')\n\nprint('Question 2: Capital of France?')\nif input().lower() == 'paris':\n    score += 1\n    print('Correct!')\n\nprint(f'Score: {score}/2')\n```\n\n### 5. Rock Paper Scissors\n```python\nimport random\n\ncomputer = random.choice(['rock', 'paper', 'scissors'])\nplayer = input('Choose: ').lower()\n\nprint(f'Computer chose: {computer}')\n\nif player == computer:\n    print('Tie!')\nelif (player == 'rock' and computer == 'scissors') or \\\n     (player == 'paper' and computer == 'rock') or \\\n     (player == 'scissors' and computer == 'paper'):\n    print('You win! 🎉')\nelse:\n    print('Computer wins!')\n```"
      },
    ],
    sections: [
      {
        type: "intro",
        title: "Welcome to Python!",
        content: "Python is one of the most popular programming languages in the world. It's easy to read, powerful, and fun to learn. Let's start coding!",
      },
      {
        type: "text",
        title: "Your First Python Program",
        content: "Every programmer starts here:\n\nprint('Hello, World!')\n\nThis simple line tells Python to display text on the screen. Try it yourself!",
      },
      {
        type: "text",
        title: "Variables: Storing Information",
        content: "Variables are like labeled boxes that hold information:\n\nname = 'Alex'\nage = 14\nheight = 5.5\n\nNow Python remembers these values and you can use them anytime!",
      },
      {
        type: "example",
        title: "Using Variables",
        content: "name = 'Sam'\nage = 13\n\nprint('Hello, my name is ' + name)\nprint('I am ' + str(age) + ' years old')\n\nOutput:\nHello, my name is Sam\nI am 13 years old",
      },
      {
        type: "text",
        title: "Data Types",
        content: "Python has different types of data:\n\n• String: text ('hello', 'Python')\n• Integer: whole numbers (1, 42, 100)\n• Float: decimal numbers (3.14, 5.5)\n• Boolean: True or False\n\nPython automatically figures out which type you're using!",
      },
      {
        type: "practice",
        title: "Try These Exercises",
        content: "1. Create a variable with your favorite color\n2. Create a variable with your age\n3. Print both variables\n4. Create a variable that adds two numbers together",
      },
      {
        type: "summary",
        title: "What You Learned",
        content: "💻 How to print output with print()\n📦 How to store data in variables\n🔤 Different data types (strings, numbers, booleans)\n✨ Python is easy to read and write\n\nKeep practicing - coding gets easier with time!",
      },
    ],
  },
  6: {
    title: "Variables and Constants",
    subject: "Mathematics",
    duration: "40 min",
    videoUrl: "/video lessons/Variables and Constents.mp4",
    hasQuiz: true,
    documents: [
      { 
        name: "Variables Guide.pdf", 
        size: "1.5 MB",
        content: "# Variables and Constants Guide\n\n## What are Variables?\n\nVariables are symbols (usually letters) that represent unknown or changing values in mathematics.\n\n### Common Variables:\n- x, y, z (most common in algebra)\n- a, b, c (often used for constants or coefficients)\n- n, m (frequently used for counting)\n\n### Examples of Variables:\n- If x = 5, then 2x = 10\n- In y + 3 = 7, the variable y = 4\n- Temperature can be represented as T\n\n## What are Constants?\n\nConstants are fixed values that never change.\n\n### Examples of Constants:\n- Numbers: 1, 2, 3, 100, -5, 3.14\n- π (pi) ≈ 3.14159...\n- e (Euler's number) ≈ 2.71828...\n\n## Variables vs Constants\n\n| Variables | Constants |\n|-----------|----------|\n| Can change | Fixed value |\n| Represented by letters | Usually numbers |\n| Unknown values | Known values |\n| x, y, z | 1, 2, 3, π |\n\n## Practice Problems:\n\n1. In 3x + 7 = 19, identify the variable and constants\n   - Variable: x\n   - Constants: 3, 7, 19\n\n2. If y = 4, find 5y + 2\n   - Answer: 5(4) + 2 = 20 + 2 = 22\n\n3. Solve for x: x - 8 = 15\n   - Answer: x = 23"
      },
    ],
    sections: [
      {
        type: "intro",
        title: "Understanding Variables and Constants",
        content: "Variables and constants are the building blocks of algebra. Understanding the difference between them is crucial for solving equations!",
      },
      {
        type: "text",
        title: "What is a Variable?",
        content: "A variable is a symbol (usually a letter like x, y, or z) that represents a value that can change or is unknown. Think of it as a container that can hold different numbers!",
      },
      {
        type: "text",
        title: "What is a Constant?",
        content: "A constant is a fixed number that doesn't change. In the expression 3x + 5, the number 5 is a constant because it always stays the same, while x is a variable that can be different values.",
      },
      {
        type: "example",
        title: "Example: Identifying Variables and Constants",
        content: "In the equation 2x + 7 = 15:\n\n• Variable: x (the unknown we're solving for)\n• Constants: 2, 7, and 15 (fixed numbers)\n\nTo solve:\n2x + 7 = 15\n2x = 15 - 7\n2x = 8\nx = 4",
      },
      {
        type: "practice",
        title: "Practice Time!",
        content: "Try these:\n1. In 4y + 3 = 19, what is the variable? (Answer: y)\n2. What are the constants in 5x - 2 = 13? (Answer: 5, 2, 13)\n3. If a = 6, what is 3a + 4? (Answer: 22)",
      },
      {
        type: "summary",
        title: "Key Points",
        content: "✓ Variables = letters that represent unknown values\n✓ Constants = fixed numbers that don't change\n✓ Variables can take on different values\n✓ Understanding both helps you solve equations!",
      },
    ],
  },
  7: {
    title: "Advanced Calculus",
    subject: "Mathematics",
    duration: "55 min",
    videoUrl: "",
    hasQuiz: false,
    documents: [],
    sections: [
      {
        type: "intro",
        title: "🔒 Locked Content",
        content: "This lesson requires you to complete previous mathematics lessons first. Keep learning to unlock advanced content!",
      },
      {
        type: "text",
        title: "Coming Soon",
        content: "Advanced Calculus covers:\n\n• Integration techniques\n• Differentiation rules\n• Limits and continuity\n• Applications in real-world problems\n\nComplete 'Introduction to Algebra' and other basic math lessons to access this content.",
      },
    ],
  },
};

export default function LessonContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const lessonId = location.state?.lessonId || 1;
  
  const lesson = lessonContent[lessonId] || lessonContent[1];
  const [currentSection, setCurrentSection] = useState(0);
  const [viewingDocument, setViewingDocument] = useState<any>(null);
  const totalSections = lesson.sections.length;
  const progress = ((currentSection + 1) / totalSections) * 100;

  // Reset section when changing lessons
  useEffect(() => {
    setCurrentSection(0);
  }, [lessonId]);

  const handleNext = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      // Lesson complete - show quiz option
      if (lesson.hasQuiz) {
        toast({
          title: "Lesson Complete! 🎉",
          description: "Ready to test your knowledge?",
        });
        setTimeout(() => navigate('/lesson-quiz', { state: { lessonId } }), 1500);
      } else {
        toast({
          title: "Lesson Complete! 🎉",
          description: `You've finished ${lesson.title}`,
        });
        setTimeout(() => navigate('/lessons'), 1500);
      }
    }
  };

  const handleDownload = (docName: string) => {
    const doc = lesson.documents.find((d: any) => d.name === docName);
    
    if (doc?.file) {
      // Download actual PDF file
      const link = document.createElement('a');
      link.href = doc.file;
      link.download = docName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download started",
        description: `${docName} is being downloaded`,
      });
    } else if (doc?.content) {
      // Create text file from content
      const blob = new Blob([doc.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = docName.replace('.pdf', '.txt');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download started",
        description: `${docName} is being downloaded as text`,
      });
    }
  };

  const handleViewDocument = (doc: any) => {
    setViewingDocument(doc);
  };

  const handlePlayVideo = () => {
    if (!lesson.videoUrl) {
      toast({
        title: "Video Coming Soon!",
        description: "Video content will be added shortly",
      });
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const section = lesson.sections[currentSection];
  
  const getSectionIcon = (type: string) => {
    switch (type) {
      case "intro":
        return <BookOpen className="w-5 h-5" />;
      case "video":
        return <Video className="w-5 h-5" />;
      case "audio":
        return <Headphones className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getSectionColor = (type: string) => {
    switch (type) {
      case "intro":
        return "bg-primary/10 text-primary";
      case "example":
        return "bg-secondary/10 text-secondary";
      case "practice":
        return "bg-accent/10 text-accent";
      case "summary":
        return "bg-success/10 text-success";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <>
      <Dialog open={!!viewingDocument} onOpenChange={() => setViewingDocument(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary" />
              {viewingDocument?.name}
            </DialogTitle>
            <DialogDescription>{viewingDocument?.size}</DialogDescription>
          </DialogHeader>
          <div className="prose prose-sm max-w-none mt-4">
            <pre className="whitespace-pre-wrap text-foreground bg-muted/30 p-6 rounded-lg leading-relaxed">
              {viewingDocument?.content}
            </pre>
          </div>
          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleDownload(viewingDocument?.name)}
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button
              variant="warm"
              className="flex-1"
              onClick={() => setViewingDocument(null)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-6 animate-slide-up pb-20 md:pb-8">
        {/* Header */}
      <div>
        <Button variant="ghost" onClick={() => navigate("/lessons")} className="mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Lessons
        </Button>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">{lesson.title}</h1>
          <Badge variant="secondary">{lesson.subject}</Badge>
        </div>
        <p className="text-muted-foreground">
          Section {currentSection + 1} of {totalSections} • {lesson.duration}
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      {/* Video Section */}
      {lesson.videoUrl !== undefined && (
        <Card className="shadow-soft bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle>Video Lesson</CardTitle>
                <CardDescription>Watch the full video explanation</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {lesson.videoUrl ? (
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <video key={`${lessonId}-${currentSection}`} controls className="w-full h-full">
                  <source src={(section as any).videoUrl || lesson.videoUrl} type="video/mp4" />
                </video>
              </div>
            ) : (
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <Button variant="warm" size="lg" onClick={handlePlayVideo}>
                  <Play className="w-6 h-6" />
                  Video Coming Soon
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Downloadable Documents */}
      {lesson.documents && lesson.documents.length > 0 && (
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-accent/10 rounded-lg">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <div>
                <CardTitle>Study Materials</CardTitle>
                <CardDescription>Download offline resources</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {lesson.documents.map((doc: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">{doc.size}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDocument(doc)}
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(doc.name)}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content Card */}
      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${getSectionColor(section.type)}`}>
              {getSectionIcon(section.type)}
            </div>
            <Badge variant="outline" className="capitalize">
              {section.type}
            </Badge>
          </div>
          <CardTitle className="text-2xl">{section.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-lg max-w-none">
            <p className="whitespace-pre-line text-foreground leading-relaxed">
              {section.content}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentSection === 0}
          className="flex-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>
        <Button variant="warm" onClick={handleNext} className="flex-1">
          {currentSection === totalSections - 1 ? (
            lesson.hasQuiz ? (
              <>
                Take Quiz
                <Brain className="w-4 h-4" />
              </>
            ) : (
              <>
                Complete Lesson
                <CheckCircle className="w-4 h-4" />
              </>
            )
          ) : (
            <>
              Next Section
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>

      {/* Section Navigator */}
      <Card className="shadow-soft">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground mb-3">Lesson Sections:</p>
          <div className="space-y-2">
            {lesson.sections.map((sec: any, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentSection(index)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  index === currentSection
                    ? "border-primary bg-primary/5"
                    : index < currentSection
                    ? "border-success/20 bg-success/5"
                    : "border-muted hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded ${getSectionColor(sec.type)}`}>
                      {getSectionIcon(sec.type)}
                    </div>
                    <div>
                      <p className="font-medium">{sec.title}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {sec.type}
                      </p>
                    </div>
                  </div>
                  {index < currentSection && (
                    <CheckCircle className="w-5 h-5 text-success" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
      </div>
    </>
  );
}
