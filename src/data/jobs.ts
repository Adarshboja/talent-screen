export type Job = {
  id: string
  title: string
  description: string
  type: string
  location: string
  category: string
}

export const jobs: Job[] = [
  {
    id: 'senior-product-designer',
    title: 'Senior Product Designer',
    description: 'Shape thoughtful workflows and experiences for people doing their best work.',
    type: 'Full-time',
    location: 'Remote-friendly',
    category: 'Design',
  },
  {
    id: 'frontend-engineer',
    title: 'Frontend Engineer',
    description: 'Build fast, accessible interfaces that make complex hiring feel simple.',
    type: 'Full-time',
    location: 'Remote-friendly',
    category: 'Engineering',
  },
  {
    id: 'people-operations-specialist',
    title: 'People Operations Specialist',
    description: 'Create clear, human-centered systems that help teams and candidates thrive.',
    type: 'Full-time',
    location: 'Hybrid',
    category: 'Operations',
  },
  {
    id: 'content-strategist',
    title: 'Content Strategist',
    description: 'Turn product insight into useful stories, guidance, and a distinct point of view.',
    type: 'Contract',
    location: 'Remote-friendly',
    category: 'Marketing',
  },
]
