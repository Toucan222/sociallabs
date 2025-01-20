// Update the imports at the top
import TikTokTrendGenerator from './TikTokTrendGenerator'
import HashtagMixer from './HashtagMixer'
import BlankTool from './BlankTool'

export const tools = [
  {
    id: 1,
    title: 'TikTok Trend Generator',
    description: 'Generate viral-worthy TikTok video ideas for any topic',
    icon: '🎵',
    component: TikTokTrendGenerator,
    tags: [
      { name: 'TikTok', icon: '📱' },
      { name: 'Viral', icon: '🚀' },
      { name: 'AI', icon: '🤖' }
    ],
    upvotes: 1234
  },
  {
    id: 2,
    title: 'Dynamic Hashtag Mixer',
    description: 'Mix and generate trending hashtag combinations from your keywords',
    icon: '#️⃣',
    component: HashtagMixer,
    tags: [
      { name: 'Hashtags', icon: '#️⃣' },
      { name: 'Growth', icon: '📈' },
      { name: 'AI', icon: '🤖' }
    ],
    upvotes: 856
  },
  // ... rest of the tools ...
].sort((a, b) => b.upvotes - a.upvotes)
 .map((tool, index) => ({ ...tool, rank: index + 1 }));
