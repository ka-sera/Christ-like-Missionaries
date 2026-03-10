import React, { useState } from 'react'

export default function TestimonialsPage() {
  const [testimonials] = useState([
    {
      id: 1,
      name: "Joseph Omullo",
      title: "Life Transformed",
      content: "Before I met Christ-Like Missionaries, I was lost and searching for purpose. Through the gospel message and discipleship, my life was completely transformed. I now serve the Lord with joy and help others find their way to Christ."
    },
    {
      id: 2,
      name: "Wycliffe Augo",
      title: "From Despair to Hope",
      content: "The prayer and intercession ministry helped me through the darkest period of my life. The compassion and love shown by the team pointed me to Jesus, and now I'm living a victorious Christian life."
    },
    {
      id: 3,
      name: "Wilkins Simiti",
      title: "Youth Transformed",
      content: "As a young man struggling with direction, the Youth Fellowship program gave me purpose and community. I've grown spiritually and now I'm mentoring other young believers. Thank you, Christ-Like Missionaries!"
    },
    {
      id: 4,
      name: "Pamrolex Odede",
      title: "Healing and Restoration",
      content: "The Community Outreach and Health Ministry provided not just spiritual guidance but also practical support. I received counseling and encouragement that led to my healing. God's love through this ministry is real!"
    },
    {
      id: 5,
      name: "Kelelly Kutto",
      title: "From Missionary to Minister",
      content: "I started as someone curious about the gospel, attended the Bible study, and became discipled. Today, I'm an ambassador helping lead evangelism crusades. God's work through Christ-Like Missionaries is miraculous!"
    },
    {
      id: 6,
      name: "Awinja Apiyo",
      title: "Family Restoration",
      content: "The Family Life ministry helped my family rediscover God's design for us. We've grown closer as a family and stronger in faith. Our children are now growing up with solid biblical foundations."
    }
  ])

  return (
    <div className="bg-navy-800 py-12 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4 text-center">Testimonials</h1>
        <p className="text-lg text-navy-100 text-center mb-12 border-b-2 border-navy-300 pb-6">
          Stories of transformation and God's work through Christ-Like Missionaries
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimony) => (
            <div key={testimony.id} className="bg-gradient-to-br from-navy-500 to-navy-600 rounded-lg shadow-lg p-8 border-t-4 border-gold hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-gray-900 font-bold">
                  {testimony.name[0]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{testimony.name}</h3>
                  <p className="text-sm text-navy-200 font-semibold">{testimony.title}</p>
                </div>
              </div>
              
              <p className="text-navy-100 leading-relaxed italic">
                "{testimony.content}"
              </p>

              <div className="mt-4 text-gold text-2xl font-bold">✓</div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-navy-700 to-navy-800 text-white p-8 rounded-lg text-center border-b border-navy-300 shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-gold">Your Story Matters</h3>
          <p className="mb-6 text-lg text-navy-100">
            Have you experienced God's transformation through Christ-Like Missionaries? 
            We'd love to hear your testimony!
          </p>
          <a href="mailto:testimonies@christlikeemissionaries.org" className="bg-navy-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-navy-400 transition-all duration-200 border-2 border-gold shadow-lg">
            Share Your Testimony
          </a>
        </div>
      </div>
    </div>
  )
}
