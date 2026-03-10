import React from 'react'

export default function AboutPage() {
  return (
    <div className="bg-navy-800 py-12 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Who We Are */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-6">About Us</h1>
          <h2 className="text-2xl font-bold text-gold mb-4">WHO WE ARE</h2>
          <p className="text-lg text-navy-100 leading-relaxed mb-6">
            Christ-Like Missionaries is a gospel mission group dedicated to reflecting the life, 
            character, and teaching of Jesus Christ. We exist to proclaim the saving gospel, 
            nurture believers into spiritual maturity, and serve communities with compassion and humility.
          </p>
          <p className="text-lg text-navy-100 leading-relaxed">
            We believe that every believer is called to live a Christ-Like life- loving God, 
            loving people, and serving the world faithfully.
          </p>
        </section>

        {/* Our Vision & Mission */}
        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-navy-500 to-navy-600 p-8 rounded-lg border-l-4 border-gold shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-navy-100 leading-relaxed">
              To raise Christ-Like believers who impact the world with faith, love and righteousness.
            </p>
          </div>
          <div className="bg-gradient-to-br from-navy-400 to-navy-500 p-8 rounded-lg border-l-4 border-gold shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <ul className="text-navy-100 space-y-2">
              <li>Preach the gospel of Jesus Christ without compromise</li>
              <li>Make disciples grounded in the Word of God</li>
              <li>Nurture spiritual growth through prayer and Bible study</li>
              <li>Serve communities through acts of love and compassion</li>
              <li>Prepare souls for the Kingdom of God</li>
            </ul>
          </div>
        </section>

        {/* Our Foundation */}
        <section className="bg-gradient-to-r from-navy-700 to-navy-800 text-white p-8 rounded-lg border-b border-navy-300 shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-gold">Our Foundation</h3>
          <p className="text-lg mb-6 leading-relaxed text-navy-100">
            We believe in Jesus Christ as Lord and Savior, the authority of the Holy Scriptures, 
            salvation by grace through faith, and the power of the Holy Spirit to transform lives.
          </p>
          <div className="bg-navy-600 bg-opacity-60 p-6 rounded border-l-4 border-gold">
            <p className="text-lg italic text-white">
              "Let this mind be in you which was also in Christ Jesus"
            </p>
            <p className="text-right mt-2 text-navy-200">- Philippians 2:5</p>
          </div>
        </section>
      </div>
    </div>
  )
}
