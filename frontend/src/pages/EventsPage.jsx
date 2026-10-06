import React, { useState } from 'react'

export default function EventsPage() {
  const [events] = useState([
    {
      id: 1,
      title: 'NAMANGA MISSION',
      date: '26th April - 10th May 2026',
      location: 'Namanga Town',
      description:
        'A mission geared towards seeking souls and planting an Adventist church in the Namanga area, where churches are located at a distance.',
      video:
        '/VIDEOS/NAMANGA%20MISSION/WhatsApp%20Video%202026-09-24%20at%209.40.55%20AM.mp4',
    },
    {
      id: 2,
      title: 'Weekly Bible Study',
      date: 'Every Wednesday',
      time: '7:00 PM - 8:30 PM',
      location: 'AVS 10',
      description:
        "In-depth study of God's Word to strengthen believers and nurture discipleship.",
    },
    {
      id: 3,
      title: 'Fellowship Night',
      date: 'Every Friday',
      time: '6:00 PM - 8:00 PM',
      location: 'School Auditorium',
      description:
        "Fellowship, worship, and mentorship for young believers.",
    },
    {
      id: 4,
      title: 'Community Outreach Day',
      date: 'Third Sunday of every month',
      time: '9:00 AM - 3:00 PM',
      location: 'Various Locations',
      description:
        "Visiting hospitals, orphanages, and communities to show Christ's love.",
    },
    {
      id: 5,
      title: 'Prayer and Fasting Session',
      date: 'Monthly (Date TBA)',
      time: '6:00 AM - 12:00 PM',
      location: 'Room 15',
      description:
        'Dedicated time for intercession and prayer for our nations and communities.',
    },
    {
      id: 6,
      title: 'Annual Missions Planning',
      date: 'April (Dates TBA)',
      time: 'Full Weekend',
      location: 'AVS 10',
      description:
        'Strategic planning, spiritual renewal, and mission focus for all members.',
    },
  ])

  return (
    <div className="bg-navy-800 py-12 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">

        {/* PAGE HEADER */}
        <div className="text-center mb-12 border-b-2 border-navy-300 pb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Events & Missions
          </h1>

          <p className="text-lg text-navy-100">
            Join us for gospel missions, fellowship events, prayer,
            outreach, and other mission activities.
          </p>
        </div>

        {/* EVENTS GRID */}
        <div className="grid md:grid-cols-2 gap-8">

          {events.map((event) => (
            <div
              key={event.id}
              className="bg-gradient-to-br from-navy-500 to-navy-600 rounded-lg shadow-lg p-8 border-l-4 border-gold hover:shadow-xl transition-shadow"
            >

              {/* EVENT TITLE */}
              <h3 className="text-2xl font-bold text-white mb-4">
                {event.title}
              </h3>

              {/* EVENT DETAILS */}
              <div className="space-y-3 text-navy-100">

                <div>
                  <span className="font-bold text-white">Date:</span>{' '}
                  {event.date}
                </div>

                {event.time && (
                  <div>
                    <span className="font-bold text-white">Time:</span>{' '}
                    {event.time}
                  </div>
                )}

                <div>
                  <span className="font-bold text-white">Location:</span>{' '}
                  {event.location}
                </div>

                {/* DESCRIPTION */}
                <div className="mt-5 pt-5 border-t border-navy-400">
                  <p className="leading-relaxed text-navy-150">
                    {event.description}
                  </p>
                </div>

                {/* NAMANGA MISSION VIDEO LINK */}
                {event.video && (
                  <div className="pt-5">
                    <a
                      href={event.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gold text-navy-900 px-6 py-3 rounded-lg font-bold hover:bg-white transition duration-200"
                    >
                      <span className="text-lg">▶</span>
                      Watch Namanga Mission Video
                    </a>
                  </div>
                )}

              </div>
            </div>
          ))}

        </div>

        {/* CONTACT SECTION */}
        <div className="mt-12 bg-gradient-to-r from-navy-700 to-navy-800 text-white p-8 rounded-lg text-center border-b border-navy-300 shadow-lg">

          <h3 className="text-2xl font-bold mb-4 text-gold">
            Want to Join an Event?
          </h3>

          <p className="mb-6 text-lg text-navy-100">
            Contact us for more details and to get involved in our
            mission activities.
          </p>

          <a
            href="mailto:christlikemissionaries@gmail.com"
            className="inline-block bg-gold text-navy-900 px-6 py-3 rounded-lg font-bold hover:bg-white transition duration-200"
          >
            Get in Touch
          </a>

        </div>

      </div>
    </div>
  )
}
