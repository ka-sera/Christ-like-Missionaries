import React from 'react'

const ministries = [
  {
    id: 1,
    title: "Evangelism & Missions",
    highlight: "This is the heartbeat of Christ-Like Missionaries. We are committed to reaching souls with the gospel of Jesus Christ through:",
    activities: [
      "Open-air gospel crusades",
      "Door-to-door evangelism/visitations",
      "Mission outreach programs"
    ],
    scripture: '"How beautiful are the feet of those who preach the gospel of peace" - Romans 10:15'
  },
  {
    id: 2,
    title: "Bible Study and Discipleship",
    highlight: "We believe that winning souls must be followed by nurturing them. Our discipleship ministry focuses on spiritual growth and maturity through:",
    activities: [
      "Bible study sessions",
      "Ambassador classes",
      "Youth sessions",
      "Family life sessions",
      "Biblical doctrines teaching",
      "Children ministry"
    ],
    scripture: '"Grow in the grace and knowledge of our Lord and Savior Jesus Christ" - 2 Peter 3:18'
  },
  {
    id: 3,
    title: "Fellowship & Youth Ministry",
    highlight: "We nurture strong Christian fellowship and empower the youth to live purpose-driven lives in Christ through:",
    activities: [
      "Youth forums",
      "Fellowship meetings and retreats",
      "Counselling and spiritual mentorship"
    ],
    scripture: '"Let no one despise your youth, but be an example of the believers" - 1 Timothy 4:12'
  },
  {
    id: 4,
    title: "Prayer and Intercession Ministry",
    highlight: "Prayer is the foundation of our mission. We commit ourselves to Intercession for individuals, families, churches, and communities through:",
    activities: [
      "Prayer meetings",
      "Fasting and intercession programs",
      "Personal prayer support",
      "Testimonies of answered prayers"
    ],
    scripture: '"Men ought always to pray and not to lose heart." - Luke 18:1'
  },
  {
    id: 5,
    title: "Community Outreach and Compassion",
    highlight: "We demonstrate Christ's love through practical service to communities by:",
    activities: [
      "Visiting hospitals, prisons and orphanages",
      "Offering prayer, counselling and encouragement",
      "Meeting practical needs in communities"
    ],
    scripture: '"Faith by itself, if it does not have work, is dead" - James 2:17'
  },
  {
    id: 6,
    title: "Health Ministry",
    highlight: "Our health Ministry follows Christ's example of healing the whole person - body, mind and spirit through:",
    activities: [
      "Nutrition & lifestyle education",
      "Exercise & physical wellness programs",
      "Holistic health awareness"
    ],
    scripture: '"Beloved, I pray that you may prosper in all things and be in health, just as your soul prospers" - 3 John 1:2'
  }
]

export default function MinistriesPage() {
  return (
    <div className="bg-navy-800 py-12 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4 text-center">Our Ministries</h1>
        <p className="text-2xl text-navy-100 text-center mb-12 font-semibold border-b-2 border-navy-300 pb-6">
          Serving God, transforming lives, and advancing the Kingdom.
        </p>

        <div className="space-y-8">
          {ministries.map((ministry) => (
            <div key={ministry.id} className="bg-gradient-to-br from-navy-500 to-navy-600 rounded-lg shadow-lg p-8 border-l-4 border-gold hover:shadow-xl transition-shadow">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-white">{ministry.title}</h2>
              </div>

              <p className="text-navy-100 mb-4 font-semibold">{ministry.highlight}</p>

              <ul className="space-y-2 mb-6 ml-8">
                {ministry.activities.map((activity, idx) => (
                  <li key={idx} className="text-navy-150">
                    • {activity}
                  </li>
                ))}
              </ul>

              <div className="bg-navy-400 p-4 rounded border-l-4 border-gold">
                <p className="text-navy-50 italic\">{ministry.scripture}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-navy-500 to-navy-600 border-2 border-navy-300 p-6 rounded-lg text-center shadow-lg">
          <p className="text-lg text-white font-semibold">All our ministries exist for one purpose: to make the name of Jesus known. In everything we do, we strive to reflect His grace, walk in His truth, and lead others into the life-changing power of His love.</p>
        </div>
      </div>
    </div>
  )
}
