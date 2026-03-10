import React, { useState } from 'react'

export default function SupportPage() {
  const [selectedMethod, setSelectedMethod] = useState('donation')

  const supportMethods = [
    {
      id: 'donation',
      title: 'One-Time Donation',
      description: 'Make a financial contribution to support our immediate mission needs.'
    },
    {
      id: 'sponsor',
      title: 'Become a Monthly Sponsor',
      description: 'Commit to regular monthly giving to sustain our long-term ministries.'
    },
    {
      id: 'project',
      title: 'Support a Project',
      description: 'Sponsor a specific project like a mission crusade or community outreach.'
    },
    {
      id: 'volunteer',
      title: 'Volunteer Your Time',
      description: 'Use your skills and talents to serve in our various ministries.'
    },
    {
      id: 'pray',
      title: 'Prayer Support',
      description: 'Join our prayer network and intercede for our mission and communities.'
    },
    {
      id: 'resource',
      title: 'Donate Resources',
      description: 'Contribute materials, books, equipment, or other resources we need.'
    }
  ]

  const fundingNeeds = [
    {
      title: 'Gospel Crusade Equipment',
      amount: '$2,000 (KSH 260,000)',
      description: 'Sound system, projector, and materials for open-air gospel crusades',
      progress: 45
    },
    {
      title: 'Youth Fellowship Program',
      amount: '$1,500 (KSH 195,000)',
      description: 'Activities, counselling services, and mentorship training',
      progress: 60
    },
    {
      title: 'Community Health Outreach',
      amount: '$3,000 (KSH 390,000)',
      description: 'Health screening materials and wellness education programs',
      progress: 35
    },
    {
      title: 'Discipleship Materials',
      amount: '$800 (KSH 104,000)',
      description: 'Bibles, study guides, and training manuals for new believers',
      progress: 75
    }
  ]

  return (
    <div className="bg-navy-800 py-12 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4 text-center">Support Us</h1>
        <p className="text-lg text-navy-100 text-center mb-12 border-b-2 border-navy-300 pb-6">
          Your support enables us to continue our mission of preaching the gospel and serving communities with Christ's love.
        </p>

        {/* Ways to Support */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Ways to Support</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {supportMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-6 rounded-lg cursor-pointer transition transform hover:scale-105 ${
                  selectedMethod === method.id
                    ? 'bg-gradient-to-br from-yellow-600 to-yellow-700 text-gray-900 shadow-lg'
                    : 'bg-gradient-to-br from-navy-500 to-navy-600 text-white border-2 border-navy-300'
                }`}
              >
                <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                <p className="text-sm">{method.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-16 bg-gradient-to-r from-navy-600 to-navy-700 p-8 rounded-lg border-2 border-navy-400">
          <h2 className="text-2xl font-bold text-white mb-6">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Phone</h3>
              <p className="text-navy-100">0700880903 - Wcliffe Augo</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Location</h3>
              <p className="text-navy-100">University of Eastern Africa Baraton</p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-lg font-bold text-white mb-2">Email</h3>
              <p className="text-navy-100">
                <a href="mailto:christlikemissionaries@gmail.com" className="text-gold hover:text-yellow-300">
                  christlikemissionaries@gmail.com
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Selected Method Details */}
        <section className="mb-16 bg-gradient-to-r from-deepblue-800 to-deepblue-900 p-8 rounded-lg border-b-4 border-deepblue-200">
          <h2 className="text-2xl font-bold text-white mb-4">
            {supportMethods.find(m => m.id === selectedMethod)?.title}
          </h2>
          
          {selectedMethod === 'donation' && (
            <div>
              <p className="text-white mb-6">
                Your one-time financial gift helps us meet immediate needs and respond to urgent ministry opportunities.
              </p>
              <div className="space-y-3">
                <p className="font-bold text-deepblue-100">Bank Transfer Details:</p>
                <div className="bg-deepblue-300 p-4 rounded">
                  <p className="text-deepblue-900"><strong>Account Name:</strong> Christ-Like Missionaries</p>
                  <p className="text-deepblue-900"><strong>Account Number:</strong> 1234567890</p>
                  <p className="text-deepblue-900"><strong>Bank:</strong> Community Bank</p>
                  <p className="text-deepblue-900"><strong>Sort Code:</strong> 00-00-00</p>
                </div>
              </div>
            </div>
          )}

          {selectedMethod === 'sponsor' && (
            <div>
              <p className="text-white mb-6">
                Become a monthly sponsor and ensure consistent support for our ongoing ministries. 
                Choose an amount that works for your budget:
              </p>
              <div className="grid md:grid-cols-4 gap-4">
                {[{usd: '$25', ksh: 'KSH 3,250'}, {usd: '$50', ksh: 'KSH 6,500'}, {usd: '$100', ksh: 'KSH 13,000'}, {usd: '$250', ksh: 'KSH 32,500'}].map((amount) => (
                  <button key={amount.usd} className="bg-deepblue-200 border-2 border-deepblue-300 text-deepblue-900 py-3 rounded-lg font-bold hover:bg-deepblue-100 transition">
                    <div>{amount.usd}/month</div>
                    <div className="text-xs">{amount.ksh}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedMethod === 'project' && (
            <div>
              <p className="text-white mb-6">
                Sponsor a specific ministry project and see direct impact from your contribution.
              </p>
              <div className="space-y-4">
                {fundingNeeds.map((project, idx) => (
                  <div key={idx} className="bg-deepblue-300 p-4 rounded">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-deepblue-900">{project.title}</h4>
                      <span className="text-sm font-bold text-deepblue-800">{project.amount}</span>
                    </div>
                    <p className="text-sm text-deepblue-800 mb-3">{project.description}</p>
                    <div className="w-full bg-deepblue-200 rounded-full h-2">
                      <div
                        className="bg-amber-500 h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-deepblue-800 mt-2">{project.progress}% funded</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedMethod === 'volunteer' && (
            <div>
              <p className="text-white mb-6">
                Use your God-given talents and skills to serve in our various ministries.
              </p>
              <div className="bg-deepblue-300 p-4 rounded">
                <p className="mb-4 text-deepblue-900">We need volunteers for:</p>
                <ul className="grid md:grid-cols-2 gap-3 text-deepblue-900">
                  <li>✓ Event organizing and coordination</li>
                  <li>✓ Teaching and Bible studies</li>
                  <li>✓ Counselling and mentorship</li>
                  <li>✓ Medical and health services</li>
                  <li>✓ Music and worship leading</li>
                  <li>✓ Administrative support</li>
                </ul>
                <p className="mt-6 font-bold">
                  <a href="mailto:christlikemissionaries@gmail.com" className="text-deepblue-800 hover:text-deepblue-900">
                    Email us to inquire about volunteer opportunities
                  </a>
                </p>
              </div>
            </div>
          )}

          {selectedMethod === 'pray' && (
            <div>
              <p className="text-white mb-6">
                Join our prayer network and lift up our mission, communities, and believers in prayer.
              </p>
              <div className="bg-deepblue-300 p-4 rounded">
                <p className="mb-4 text-deepblue-900 font-bold">Prayer Focus Areas:</p>
                <ul className="space-y-2 text-deepblue-900">
                  <li>🙏 For wisdom and guidance in our leadership</li>
                  <li>🙏 For effective gospel outreach and soul-winning</li>
                  <li>🙏 For healing and transformation in communities</li>
                  <li>🙏 For spiritual maturity in believers</li>
                  <li>🙏 For protection and strength in our volunteers</li>
                </ul>
                <p className="mt-6 font-bold">
                  <a href="mailto:christlikemissionaries@gmail.com" className="text-deepblue-800 hover:text-deepblue-900">
                    Join our prayer list for specific prayer requests
                  </a>
                </p>
              </div>
            </div>
          )}

          {selectedMethod === 'resource' && (
            <div>
              <p className="text-white mb-6">
                Donate materials, resources, or equipment to support our ministries.
              </p>
              <div className="bg-deepblue-300 p-4 rounded">
                <p className="mb-4 text-deepblue-900 font-bold">We accept donations of:</p>
                <ul className="grid md:grid-cols-2 gap-3 text-deepblue-900 mb-6">
                  <li>✓ Bibles and Christian books</li>
                  <li>✓ Educational materials</li>
                  <li>✓ Medical supplies</li>
                  <li>✓ Technology and equipment</li>
                  <li>✓ Clothing and food items</li>
                  <li>✓ Office supplies</li>
                </ul>
                <p className="font-bold\">
                  <a href="mailto:christlikemissionaries@gmail.com" className="text-deepblue-200 hover:text-white">
                    Contact us to arrange resource donations
                  </a>
                </p>
              </div>
            </div>
          )}
        </section>

        <div className="mt-12 bg-gradient-to-r from-navy-700 to-navy-800 text-white p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Your Impact Matters</h3>
          <p className="text-lg mb-6">
            Every donation, prayer, and volunteer hour makes a real difference in transforming lives 
            and advancing God's Kingdom. Thank you for being part of this mission!
          </p>
          <p className="text-sm opacity-90">
            Christ-Like Missionaries is a non-profit organization. 
            We are committed to transparency and stewardship of all resources.
          </p>
        </div>
      </div>
    </div>
  )
}
