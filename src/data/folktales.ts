export interface Folktale {
  id: string;
  title: string;
  origin: string;
  region: string;
  category: string;
  summary: string;
  content: string;
  themes: string[];
  readingTime: number;
}

export const mockFolktales: Folktale[] = [
  {
    id: "1",
    title: "The Clever Spider Anansi",
    origin: "Ghana",
    region: "West Africa", 
    category: "Trickster Tales",
    summary: "How Anansi the spider brought wisdom to all the world's people through his clever tricks.",
    content: `Long ago, all the wisdom in the world belonged to Nyame, the Sky God. But Anansi the spider thought that wisdom should belong to everyone.

One day, Anansi decided to collect all the wisdom in the world and put it in a large pot. He worked day and night, gathering every bit of wisdom he could find. When the pot was full, Anansi decided to hide it at the top of a tall tree where no one else could reach it.

Anansi tied the pot to his belly and began to climb the tree. But the pot kept getting in his way, and he couldn't climb properly. His young son, who had been watching, called out, "Father, why don't you tie the pot to your back instead?"

Anansi was amazed by his son's wise suggestion. He realized that even though he had collected all the wisdom in the world, his own child still had wisdom that he didn't possess. In his frustration, Anansi threw the pot down from the tree.

The pot shattered, and all the wisdom scattered to the four winds. From that day forward, wisdom belonged to everyone in the world - some people have a little, some have more, but everyone has some.

And that is why no single person has all the wisdom in the world.`,
    themes: ["wisdom", "humility", "sharing", "trickster"],
    readingTime: 3
  },
  {
    id: "2", 
    title: "The Rainbow Serpent",
    origin: "Aboriginal Australia",
    region: "Australia",
    category: "Creation Myths",
    summary: "The great serpent that shaped the land and brought water to create all life.",
    content: `In the Dreamtime, when the world was young and flat, there lived a great Rainbow Serpent deep beneath the earth. The Serpent was enormous and beautiful, with scales that shimmered in every color imaginable.

One day, the Rainbow Serpent decided to rise up from beneath the ground and travel across the land. As the great serpent moved, its massive body carved out rivers, valleys, and mountain ranges. Where it rested, it created billabongs and waterholes.

The Rainbow Serpent called to the frogs, who came out of the ground with their bellies full of water. The Serpent tickled the frogs until they laughed so hard that the water spilled out of their mouths, filling the rivers and lakes that the Serpent had created.

Then the grass began to grow, and the trees sprouted from the earth. Animals awakened and came to drink from the fresh waters. The Rainbow Serpent had brought life to the land.

But the Serpent made laws that all creatures must follow. Those who obeyed the laws were rewarded with human form. Those who broke the laws were turned to stone, becoming the hills and mountains we see today.

When it rains and the sun shines at the same time, you can see the Rainbow Serpent in the sky, reminding us all of the laws we must follow to live in harmony with the land.`,
    themes: ["creation", "law", "nature", "harmony"],
    readingTime: 4
  },
  {
    id: "3",
    title: "The Firebird",
    origin: "Russia", 
    region: "Eastern Europe",
    category: "Magical Tales",
    summary: "A prince's quest to capture the magnificent Firebird and win his father's approval.",
    content: `In a kingdom far away, there lived a Tsar who had a magnificent garden. In this garden grew a tree that bore golden apples. But every night, someone would steal the precious fruit.

The Tsar sent his eldest son to guard the tree. But the prince fell asleep, and in the morning, more apples were gone. The same thing happened with the second son.

Finally, Ivan, the youngest prince, asked to try. His father didn't believe he could succeed where his brothers had failed, but he agreed to let Ivan attempt to catch the thief.

That night, Ivan stayed awake and saw a magnificent bird with feathers of fire descend from the sky. The Firebird's feathers glowed like flames, and its eyes sparkled like diamonds. As it flew away with a golden apple, Ivan managed to grab one of its tail feathers.

The feather was so beautiful and bright that it lit up the entire palace. The Tsar was amazed, but now he wanted the whole bird. He sent Ivan on a quest to capture the Firebird.

Ivan's journey led him through dark forests and across vast plains. With the help of a gray wolf who became his companion, Ivan not only captured the Firebird but also won the hand of a beautiful princess and returned home as a hero.

The Firebird now lives in the palace, lighting up the kingdom with its magical glow, and Ivan learned that courage and kindness are more valuable than being the eldest or strongest.`,
    themes: ["courage", "perseverance", "magic", "brotherhood"],
    readingTime: 5
  },
  {
    id: "4",
    title: "Coyote and the Stars",
    origin: "Lakota Nation",
    region: "North America", 
    category: "Trickster Tales",
    summary: "How Coyote's curiosity and mischief created the scattered pattern of stars in the night sky.",
    content: `Long ago, when the world was still being made, First Maker was carefully placing stars in the sky. He worked with great patience, creating beautiful patterns and pictures that would guide people through the seasons.

Coyote, who was always curious and impatient, watched First Maker working. "Let me help!" Coyote said. "I can do that too!"

First Maker shook his head. "This work requires patience and care, Coyote. You must wait until I am finished."

But Coyote couldn't wait. While First Maker was resting, Coyote grabbed the bag containing all the remaining stars. "I'll show everyone how quickly I can work!" he said.

Coyote began throwing stars into the sky as fast as he could. But in his excitement, he tripped and the bag burst open. Stars scattered everywhere across the heavens in a glittering mess.

First Maker woke up to find stars sprinkled randomly across the sky. Some places had too many stars, others had too few. The careful patterns he had been creating were lost in Coyote's wild scattering.

"Coyote!" First Maker sighed. "Look what you have done!"

Coyote looked up at the sky and saw the chaos he had created. But then he noticed something wonderful - the scattered stars created a bright path across the heavens that was beautiful in its own way.

"I'm sorry," Coyote said. "But look - now there are stars everywhere for everyone to see!"

And that is why, to this day, we see stars scattered across the night sky, and the bright band of the Milky Way shows us the path where Coyote spilled the stars.`,
    themes: ["curiosity", "consequences", "creativity", "acceptance"],
    readingTime: 4
  },
  {
    id: "5",
    title: "The Bamboo Princess",
    origin: "Japan",
    region: "East Asia",
    category: "Magical Tales", 
    summary: "A mysterious princess born from bamboo brings both joy and sorrow to an old bamboo cutter.",
    content: `Long ago in Japan, there lived an old bamboo cutter named Taketori no Okina. Every day he would go into the bamboo grove to cut bamboo for baskets and other useful things.

One morning, he noticed a bamboo stalk that glowed with a soft, mysterious light. When he cut it down, inside he found a tiny, beautiful girl no bigger than his thumb. She was so lovely that she seemed to be made of moonbeams and starlight.

The old man took the tiny girl home to his wife, and they raised her as their own daughter. They named her Nayotake no Kaguya-hime, the Bamboo Princess. As she grew, she became more beautiful than anyone had ever seen.

The Bamboo Princess brought good fortune to the old couple. Every time the bamboo cutter went to work, he would find stalks filled with gold and precious jewels. They became wealthy, but more importantly, they were happy.

Many noble men came to ask for Kaguya-hime's hand in marriage, but she gave them impossible tasks to prove their love. None could complete them, for the tasks required treasures that existed only in legends.

One night, Kaguya-hime revealed the truth to her parents. She was not of this world, but had come from the Moon. Soon, she would have to return to her home in the sky.

When the time came, celestial beings descended from the Moon to take her home. Though the old couple wept, Kaguya-hime gave them a robe of feathers and an elixir of immortality as thanks for their love and care.

Before she left, she looked back at the Earth with sadness, for though she had to return to the Moon, she had learned to love the human world and the kindness of the old bamboo cutter and his wife.`,
    themes: ["love", "sacrifice", "beauty", "belonging"],
    readingTime: 5
  },
  {
    id: "6",
    title: "Why the Sun and Moon Live in the Sky",
    origin: "Nigeria",
    region: "West Africa",
    category: "Creation Myths",
    summary: "A tale of friendship and consequences that explains why the Sun and Moon moved to the heavens.",
    content: `Long, long ago, the Sun and Moon lived on Earth and were the best of friends. They lived in a beautiful house next to the Ocean, who was also their close friend.

Sun and Moon often visited Ocean, but Ocean never visited them. One day, Sun asked Ocean, "Why do you never come to visit us?"

Ocean replied, "Your house is too small, my friends. If I come to visit with all my people - the fish, the whales, the waves, and all the creatures of the sea - we would not fit in your house."

Sun and Moon talked it over and decided to build a bigger house so Ocean could visit them. They worked for many months, building the largest house anyone had ever seen.

When the house was finished, Sun and Moon invited Ocean to visit. Ocean was pleased and began to flow toward their house, bringing with him all the fish, crabs, lobsters, and sea creatures.

"Are you sure your house is big enough?" Ocean asked as he began to enter.

"Yes, yes! Come in!" said Sun and Moon.

Ocean continued to flow in, and the water rose higher and higher. Soon it was up to Sun and Moon's ankles, then their knees, then their waists.

"Are you sure it's still safe for us to come in?" Ocean asked again.

Sun and Moon, not wanting to disappoint their friend, said yes. But the water kept rising - to their chests, their necks, and finally over their heads.

Sun and Moon had to float up to the ceiling, and then right through the roof! They floated higher and higher into the sky, where they remain to this day.

And that is why the Sun and Moon live in the sky, while their friend Ocean covers most of the Earth below.`,
    themes: ["friendship", "hospitality", "consequences", "nature"],
    readingTime: 4
  }
];

export const categories = [
  "All Stories",
  "Trickster Tales", 
  "Creation Myths",
  "Magical Tales"
];

export const regions = [
  "All Regions",
  "West Africa",
  "Australia", 
  "Eastern Europe",
  "North America",
  "East Asia"
];