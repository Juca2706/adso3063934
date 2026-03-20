import 'dotenv/config'
import { PrismaClient } from '../app/generated/prisma'
import { PrismaNeon } from '@prisma/adapter-neon'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {

  console.log('🌱 Starting seed...')

  // -----------------------------
  // 1. Clean database
  // -----------------------------

  await prisma.game.deleteMany()
  await prisma.console.deleteMany()

  console.log('🧹 Database cleaned')

  // -----------------------------
  // 2. Create Consoles
  // -----------------------------

  const consoles = await prisma.console.createMany({
    data: [
      {
        name: 'PlayStation 5',
        manufacturer: 'Sony Interactive Entertainment',
        releasedate: new Date('2020-11-12'),
        description:
          'The PlayStation 5 (PS5) is a home video game console bringing 4K gaming at 120Hz and ray tracing support.',
      },
      {
        name: 'Xbox Series X',
        manufacturer: 'Microsoft',
        releasedate: new Date('2020-11-10'),
        description:
          'The Xbox Series X is a high-performance console, featuring a custom AMD processor and 12 TFLOPS of graphical power.',
      },
      {
        name: 'Nintendo Switch OLED Model',
        manufacturer: 'Nintendo',
        releasedate: new Date('2021-10-08'),
        description:
          'A hybrid console that can be used as a home console and a portable handheld device, now with a vibrant OLED screen.',
      },
      {
        name: 'Nintendo Switch 2',
        manufacturer: 'Nintendo',
        releasedate: new Date('2025-06-05'),
        description:
          'The successor to the popular Nintendo Switch, featuring larger magnetic Joy-cons and enhanced performance.',
      },
      {
        name: 'Steam Deck OLED',
        manufacturer: 'Valve',
        releasedate: new Date('2023-11-16'),
        description:
          'A powerful handheld gaming computer that plays PC games from your Steam library on the go.',
      },
    ],
  })

  console.log('🎮 5 consoles seeded')

  // -----------------------------
  // 3. Get consoles from DB
  // -----------------------------

  const allConsoles = await prisma.console.findMany()

  const ps5 = allConsoles.find(c => c.name === 'PlayStation 5')
  const xbox = allConsoles.find(c => c.name === 'Xbox Series X')
  const switchOLED = allConsoles.find(c => c.name === 'Nintendo Switch OLED Model')
  const switch2 = allConsoles.find(c => c.name === 'Nintendo Switch 2')
  const steamDeck = allConsoles.find(c => c.name === 'Steam Deck OLED')

  // -----------------------------
  // 4. Create Games
  // -----------------------------

  const gamesData = [
    {
      title: 'God of War Ragnarök',
      developer: 'Santa Monica Studio',
      releasedate: new Date('2022-11-09'),
      price: 69.99,
      genre: 'Action-adventure',
      description:
        'Kratos and Atreus must journey to each of the Nine Realms and find answers as the forces of Asgard prepare for a prophesied battle.',
      console_id: ps5?.id,
    },
    {
      title: 'Halo Infinite',
      developer: '343 Industries',
      releasedate: new Date('2021-12-08'),
      price: 59.99,
      genre: 'First-person shooter',
      description:
        'Master Chief returns in the most expansive Halo campaign yet.',
      console_id: xbox?.id,
    },
    {
      title: 'The Legend of Zelda: Tears of the Kingdom',
      developer: 'Nintendo EPD',
      releasedate: new Date('2023-05-12'),
      price: 69.99,
      genre: 'Action-adventure',
      description:
        'Link soars through the skies and explores new areas of Hyrule.',
      console_id: switchOLED?.id,
    },
    {
      title: 'Elden Ring',
      developer: 'FromSoftware',
      releasedate: new Date('2022-02-25'),
      price: 59.99,
      genre: 'Action role-playing',
      description:
        'A fantasy action RPG adventure set within a world created by Hidetaka Miyazaki.',
      console_id: ps5?.id,
    },
    {
      title: 'Forza Horizon 5',
      developer: 'Playground Games',
      releasedate: new Date('2021-11-09'),
      price: 59.99,
      genre: 'Racing',
      description:
        'Explore the vibrant open world landscapes of Mexico.',
      console_id: xbox?.id,
    },
    {
      title: 'Pokémon Scarlet',
      developer: 'Game Freak',
      releasedate: new Date('2022-11-18'),
      price: 59.99,
      genre: 'Role-playing',
      description:
        'Embark on a new journey in the Paldea region.',
      console_id: switchOLED?.id,
    },
    {
      title: 'Spider-Man 2',
      developer: 'Insomniac Games',
      releasedate: new Date('2023-10-20'),
      price: 69.99,
      genre: 'Action-adventure',
      description:
        'Peter Parker and Miles Morales face the Symbiote threat.',
      console_id: ps5?.id,
    },
    {
      title: 'Starfield',
      developer: 'Bethesda Game Studios',
      releasedate: new Date('2023-09-06'),
      price: 69.99,
      genre: 'Role-playing',
      description:
        'Explore the vastness of space and create your own story.',
      console_id: xbox?.id,
    },
    {
      title: 'Mario Kart 9',
      developer: 'Nintendo EPD',
      releasedate: new Date('2025-12-01'),
      price: 59.99,
      genre: 'Racing',
      description:
        'The next installment in the popular Mario Kart series.',
      console_id: switch2?.id,
    },
    {
      title: 'Hogwarts Legacy',
      developer: 'Avalanche Software',
      releasedate: new Date('2023-02-10'),
      price: 59.99,
      genre: 'Action role-playing',
      description:
        'Experience a new story set in the wizarding world.',
      console_id: steamDeck?.id,
    },
  ]

  for (const game of gamesData) {
    if (!game.console_id) continue

    await prisma.game.create({
      data: game,
    })
  }

  console.log('🕹️ 10 games seeded')

  console.log('✅ Seed completed successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })