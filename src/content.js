// All copy and imagery lives here so it can be swapped without touching scene code.
import productImage from './assets/product-placeholder.svg'

export const brand = 'MERIDIAN'

export const opening = {
  eyebrow: 'Autonomous Surface Systems — 2026',
  lines: ['Built for the', 'open water.'],
  sub: 'A new class of uncrewed vessel, engineered for persistence at sea.',
  cue: 'Scroll or press ↓',
}

export const reveal = {
  image: productImage,
  imageAlt: 'Placeholder render of an uncrewed surface vessel',
  captions: [
    { kicker: '01', text: 'Composite hull. 4.2 metres.' },
    { kicker: '02', text: 'Solar-electric drive. Silent at speed.' },
    { kicker: '03', text: 'Ninety days without a port call.' },
  ],
}

export const details = {
  eyebrow: 'The platform',
  headline: 'Endurance, reduced to its essentials.',
  features: [
    {
      title: 'Persistent',
      body: 'Months-long missions on solar power, with no fuel logistics and no crew rotation.',
    },
    {
      title: 'Autonomous',
      body: 'Onboard perception and routing that holds course through weather and traffic.',
    },
    {
      title: 'Modular',
      body: 'A standard payload bay that accepts sensors, comms and cargo without refits.',
    },
  ],
}

// Scene registry drives keyboard navigation and the progress indicator.
export const scenes = [
  { id: 'opening', label: 'Opening' },
  { id: 'reveal', label: 'Product' },
  { id: 'details', label: 'Details' },
]
