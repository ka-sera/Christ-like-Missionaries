import React, { useState } from 'react'

export default function EventsPage() {
  const [events] = useState([
    {
      id: 1,
      title: "Monthly House order meetings",
      date: "First Saturday of every month",
      time: "3:00 PM - 6:00 PM",
      location: "AVS 10",
      description: "We meet up every month to do house keeping and plan for upcoming missions"
    },
    {
      id: 2,
      title: "Weekly Bible Study",
      date: "Every Wednesday",
      time: "7:00 PM - 8:30 PM",
      location: "AVS 10",
      description: "In-depth study of God's Word to strengthen believers and nurture discipleship."
    },
    {
      id: 3,
      title: "Fellowship Night",
      date: "Every Friday",
      time: "6:00 PM - 8:00 PM",
      location: "School auditorium",
      description: "Fellowship, worship, and mentorship for young believers."
    },
    {
      id: 4,
      title: "Community Outreach Day",
      date: "Third Sunday of every month",
      time: "9:00 AM - 3:00 PM",
      location: "Various Locations",
      description: "Visiting hospitals, orphanages, and communities to show Christ's love."
    },
    {
      id: 5,
      title: "Prayer and Fasting Session",
      date: "Monthly (Date TBA)",
      time: "6:00 AM - 12:00 PM",
      location: "Room 15",
      description: "Dedicated time for intercession and prayer for our nations and communities."
    },
    {
      id: 6,
      title: "Annual Missions planning",
      date: "April (Dates TBA)",
      time: "Full Weekend",
      location: "AVS 10",
      description: "Strategic planning, spiritual renewal, and mission focus for all members."
    }
  ])

  return (
    <div className="bg-navy-800 py-12 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4 text-center">Events & Missions</h1>
        <p className="text-lg text-navy-100 text-center mb-12 border-b-2 border-navy-300 pb-6">
          Join us for upcoming gospel crusades, fellowship events, and mission activities
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-gradient-to-br from-navy-500 to-navy-600 rounded-lg shadow-lg p-8 border-l-4 border-gold hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-white mb-3">{event.title}</h3>
              
              <div className="space-y-3 text-navy-100">
                <div>
                  <span className="font-bold">Date:</span> {event.date}
                </div>
                <div>
                  <span className="font-bold">Time:</span> {event.time}
                </div>
                <div>
                  <span className="font-bold">Location:</span> {event.location}
                </div>
                <div className="mt-4 pt-4 border-t border-navy-400">
                  <p className="text-navy-150">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-navy-700 to-navy-800 text-white p-8 rounded-lg text-center border-b border-navy-300 shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-gold">Want to Join an Event?</h3>
          <p className="mb-6 text-lg text-navy-100">
            Contact us for more details and to get involved in our mission activities.
          </p>
          <a href="mailto:contact@christlikeemissionaries.org" className="bg-gold text-white-900 px-6 py-2 rounded font-bold hover:bg-white-500 transition inline-block">
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  )
}
