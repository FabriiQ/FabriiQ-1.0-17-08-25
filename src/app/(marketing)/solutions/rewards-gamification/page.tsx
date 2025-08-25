import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Award, Target, Zap, Users, BarChart3, Trophy, Gift, Play } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Rewards & Gamification System - FabriiQ',
  description: 'Implemented gamification features including student points system, achievements, leaderboards, and social learning elements designed to boost engagement.',
}

const gamificationFeatures = [
  {
    icon: Award,
    title: 'Points & Levels System',
    description: 'Students earn points for completing activities, assignments, and achieving milestones, progressing through levels'
  },
  {
    icon: Trophy,
    title: 'Achievement Badges',
    description: 'Unlock special badges for academic excellence, perfect attendance, participation, and other accomplishments'
  },
  {
    icon: Target,
    title: 'Goal Setting & Tracking',
    description: 'Set personal learning goals and track progress with visual indicators and milestone celebrations'
  },
  {
    icon: Users,
    title: 'Class Leaderboards',
    description: 'Friendly competition with class-based leaderboards showcasing top performers and most improved students'
  },
  {
    icon: BarChart3,
    title: 'Progress Analytics',
    description: 'Detailed analytics showing learning progress, strengths, areas for improvement, and achievement trends'
  },
  {
    icon: Gift,
    title: 'Reward Redemption',
    description: 'Redeem earned points for virtual rewards, privileges, or real-world incentives set by teachers'
  },
  {
    icon: Zap,
    title: 'Instant Feedback',
    description: 'Immediate recognition and feedback for completed tasks, correct answers, and positive behaviors'
  },
  {
    icon: Play,
    title: 'Interactive Challenges',
    description: 'Engaging learning challenges, quests, and mini-games that make education fun and interactive'
  }
]

const rewardTypes = [
  {
    category: 'Academic Achievement',
    rewards: [
      'Perfect Score Badge - 100% on assessments',
      'Knowledge Master - Complete all course modules',
      'Quick Learner - Fast completion of activities',
      'Consistent Performer - Maintain high grades'
    ]
  },
  {
    category: 'Participation & Engagement',
    rewards: [
      'Active Participant - Regular class participation',
      'Discussion Leader - Lead class discussions',
      'Helpful Peer - Assist classmates with learning',
      'Question Master - Ask thoughtful questions'
    ]
  },
  {
    category: 'Attendance & Punctuality',
    rewards: [
      'Perfect Attendance - No missed classes',
      'Early Bird - Consistently arrive on time',
      'Reliable Student - Regular attendance pattern',
      'Commitment Champion - Long-term consistency'
    ]
  },
  {
    category: 'Special Achievements',
    rewards: [
      'Innovation Award - Creative problem solving',
      'Leadership Badge - Demonstrate leadership',
      'Improvement Star - Significant progress',
      'Team Player - Excellent collaboration'
    ]
  }
]

const benefits = [
  'Increased student motivation and engagement in learning activities',
  'Improved assignment completion rates and academic performance',
  'Enhanced classroom participation and peer collaboration',
  'Better attendance and punctuality through positive reinforcement',
  'Development of goal-setting and self-monitoring skills',
  'Reduced behavioral issues through positive behavior recognition',
  'Stronger student-teacher relationships through achievement celebration',
  'Data-driven insights into student motivation and learning patterns'
]

export default function RewardsGamificationPage() {
  return (
    <div className="marketing-section">
      <div className="marketing-container">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium mb-8" style={{ backgroundColor: '#D8E3E0', color: '#1F504B' }}>
            <Award className="h-4 w-4 mr-2" />
            <span>Gamified Learning</span>
          </div>
          
          <h1 className="marketing-heading-xl mb-6">
            Rewards & Gamification System
          </h1>
          
          <p className="marketing-body-lg max-w-3xl mx-auto mb-10">
            Boost student engagement with our implemented gamification features including points system,
            achievements, leaderboards, and social learning elements. Currently deployed and actively
            enhancing student motivation across the platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/demo" className="marketing-btn-primary">
              See gamification in action
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/solutions/student-portal" className="marketing-btn-secondary">
              View student portal
            </Link>
          </div>

          {/* Key Metrics */}
          <div className="marketing-grid-3 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: '#1F504B' }}>8+</div>
              <div className="marketing-body-sm">Gamification Features</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: '#5A8A84' }}>50+</div>
              <div className="marketing-body-sm">Achievement Types</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: '#1F504B' }}>Real-time</div>
              <div className="marketing-body-sm">Progress Tracking</div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="marketing-heading-lg mb-4">
              How our gamification system works
            </h2>
            <p className="marketing-body max-w-2xl mx-auto">
              Our comprehensive rewards system motivates students through multiple engagement mechanisms, 
              creating a fun and competitive learning environment.
            </p>
          </div>

          <div className="marketing-grid-2 gap-8">
            {gamificationFeatures.map((feature, index) => (
              <div key={index} className="marketing-card">
                <feature.icon className="h-8 w-8 mb-4" style={{ color: '#1F504B' }} />
                <h3 className="marketing-heading-md mb-3" style={{ color: '#1F504B' }}>{feature.title}</h3>
                <p className="marketing-body">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reward Categories */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="marketing-heading-lg mb-4">
              Achievement categories & rewards
            </h2>
            <p className="marketing-body max-w-2xl mx-auto">
              Students can earn various types of achievements and badges across different categories, 
              recognizing diverse forms of academic and behavioral excellence.
            </p>
          </div>

          <div className="marketing-grid-2 gap-8">
            {rewardTypes.map((category, index) => (
              <div key={index} className="marketing-card">
                <h3 className="marketing-heading-md mb-4" style={{ color: '#1F504B' }}>{category.category}</h3>
                <div className="space-y-3">
                  {category.rewards.map((reward, rewardIndex) => (
                    <div key={rewardIndex} className="flex items-start">
                      <Award className="h-4 w-4 mr-3 mt-1 flex-shrink-0" style={{ color: '#5A8A84' }} />
                      <span className="marketing-body-sm">{reward}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="rounded-3xl p-8 lg:p-12 mb-20" style={{ backgroundColor: '#D8E3E0' }}>
          <div className="text-center mb-12">
            <h2 className="marketing-heading-lg mb-4" style={{ color: '#1F504B' }}>
              Proven benefits of gamified learning
            </h2>
            <p className="marketing-body max-w-2xl mx-auto" style={{ color: '#1F504B' }}>
              Research shows that well-designed gamification systems significantly improve student 
              engagement, motivation, and academic outcomes.
            </p>
          </div>

          <div className="marketing-grid-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#1F504B' }} />
                <span className="marketing-body" style={{ color: '#1F504B' }}>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="marketing-heading-lg mb-4">
            Ready to gamify your classroom?
          </h2>
          <p className="marketing-body mb-8 max-w-2xl mx-auto">
            Transform your students' learning experience with our comprehensive rewards and 
            gamification system that makes education engaging and fun.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/demo" className="marketing-btn-primary">
              Schedule demonstration
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/solutions" className="marketing-btn-ghost">
              ← Back to solutions
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
