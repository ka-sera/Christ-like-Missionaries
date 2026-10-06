import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="bg-navy-800">

      {/* Hero Section - Group Photo Background */}
      <section
        className="relative bg-cover bg-center bg-no-repeat text-white py-32 px-4 border-b-2 border-navy-300"
        style={{
          backgroundImage: "url('/images/team/group-photo.jpeg')"
        }}
      >

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-navy-900/70"></div>

        {/* Hero content */}
        <div className="relative max-w-4xl mx-auto text-center">

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Restoring Lives Through the Love of Christ
          </h1>

          <p className="text-lg md:text-xl text-white mb-8 leading-relaxed drop-shadow">
            Christ-Like Missionaries is a gospel mission group devoted to preaching
            Christ, nurturing disciples, and serving different communities with love,
            humility and faith.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">

            <Link
              to="/join"
              className="bg-navy-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-navy-400 transition-all duration-200 border-2 border-gold shadow-lg"
            >
              Join Us
            </Link>

            <Link
              to="/support"
              className="bg-navy-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-navy-400 transition-all duration-200 border-2 border-gold shadow-lg"
            >
              Support Us
            </Link>

          </div>

        </div>
      </section>


      {/* Welcome Section */}
      <section className="py-20 px-4 bg-navy-800">

        <div className="max-w-6xl mx-auto">

          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* Welcome Text */}
            <div className="bg-gradient-to-br from-navy-500 to-navy-600 rounded-lg shadow-xl p-8 border border-navy-300">

              <h2 className="text-3xl font-bold text-white mb-6">
                Welcome to Christ-Like Missionaries
              </h2>

              <p className="text-lg text-navy-100 leading-relaxed">
                We are Christ-centred gospel mission committed to living out the
                life of Jesus Christ. Our calling is to reach souls with the
                saving gospel, build believers in faith, and reflect Christ's
                love through service to humanity.
              </p>

            </div>

            {/* Group Photograph */}
            <div className="rounded-lg overflow-hidden shadow-2xl border-2 border-gold">

              <img
                src="/images/team/group-photo.jpeg"
                alt="Christ-Like Missionaries team"
                className="w-full h-auto object-cover"
              />

            </div>

          </div>

        </div>

      </section>

     {/* Meet the Team */}
<section className="py-20 bg-[#0B2545]">
  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Section Heading */}
    <div className="text-center mb-12">

      <p className="text-[#FFC857] text-3xl font-bold uppercase tracking-widest">
  Our Leadership
</p>
      <h2 className="text-4xl sm:text-5xl font-bold text-white">
        Meet the Team
      </h2>

      <p className="mt-5 max-w-2xl mx-auto text-white/80 text-base sm:text-lg leading-relaxed">
        Meet the dedicated leaders serving Christ-Like Missionaries
        and helping advance our mission through faith, service, and
        Christian fellowship.
      </p>

    </div>

    {/* Team Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

      {/* Moses Wyclif Augo */}
      <div className="bg-[#12345A] rounded-2xl overflow-hidden shadow-lg border border-white/10 hover:shadow-2xl transition-shadow duration-300">
        <div className="h-80 bg-[#0F2540] overflow-hidden">
          <img
            src="/images/team/wyclif-augo.jpeg"
            alt="Moses Wyclif Augo - Chairman"
            className="w-full h-full object-cover object-top"
          />
        </div>

        <div className="p-6 text-center">
          <h3 className="text-xl font-bold text-white">
            Moses Wyclif Augo
          </h3>
          <p className="mt-2 text-[#FFC857] font-semibold">
            Chairman
          </p>
        </div>
      </div>

      {/* Emmanuel Keter */}
      <div className="bg-[#12345A] rounded-2xl overflow-hidden shadow-lg border border-white/10 hover:shadow-2xl transition-shadow duration-300">
        <div className="h-80 bg-[#0F2540] overflow-hidden">
          <img
            src="/images/team/emmanuel-keter.jpeg"
            alt="Emmanuel Keter - Assistant Chairperson"
            className="w-full h-full object-cover object-top"
          />
        </div>

        <div className="p-6 text-center">
          <h3 className="text-xl font-bold text-white">
            Emmanuel Keter
          </h3>
          <p className="mt-2 text-[#FFC857] font-semibold">
            Assistant Chairperson
          </p>
        </div>
      </div>

      {/* JoyBeryl Atieno */}
      <div className="bg-[#12345A] rounded-2xl overflow-hidden shadow-lg border border-white/10 hover:shadow-2xl transition-shadow duration-300">
        <div className="h-80 bg-[#0F2540] overflow-hidden">
          <img
            src="/images/team/joyberyl-atieno.jpeg"
            alt="JoyBeryl Atieno - Spiritual Leader"
            className="w-full h-full object-cover object-top"
          />
        </div>

        <div className="p-6 text-center">
          <h3 className="text-xl font-bold text-white">
            JoyBeryl Atieno
          </h3>
          <p className="mt-2 text-[#FFC857] font-semibold">
            Spiritual Leader
          </p>
        </div>
      </div>

      {/* Michael Onyango */}
      <div className="bg-[#12345A] rounded-2xl overflow-hidden shadow-lg border border-white/10 hover:shadow-2xl transition-shadow duration-300">
        <div className="h-80 bg-[#0F2540] overflow-hidden">
          <img
            src="/images/team/michael-onyango.jpeg"
            alt="Michael Onyango - Assistant Spiritual Leader"
            className="w-full h-full object-cover object-top"
          />
        </div>

        <div className="p-6 text-center">
          <h3 className="text-xl font-bold text-white">
            Michael Onyango
          </h3>
          <p className="mt-2 text-[#FFC857] font-semibold">
            Assistant Spiritual Leader
          </p>
        </div>
      </div>

      {/* Meshack Kogo */}
      <div className="bg-[#12345A] rounded-2xl overflow-hidden shadow-lg border border-white/10 hover:shadow-2xl transition-shadow duration-300">
        <div className="h-80 bg-[#0F2540] overflow-hidden">
          <img
            src="/images/team/meshack-kogo.jpeg"
            alt="Meshack Kogo - Secretary"
            className="w-full h-full object-cover object-top"
          />
        </div>

        <div className="p-6 text-center">
          <h3 className="text-xl font-bold text-white">
            Meshack Kogo
          </h3>
          <p className="mt-2 text-[#FFC857] font-semibold">
            Secretary
          </p>
        </div>
      </div>

      {/* June Jeptoo */}
      <div className="bg-[#12345A] rounded-2xl overflow-hidden shadow-lg border border-white/10 hover:shadow-2xl transition-shadow duration-300">
        <div className="h-80 bg-[#0F2540] overflow-hidden">
          <img
            src="/images/team/june-jeptoo.jpeg"
            alt="June Jeptoo - Treasurer"
            className="w-full h-full object-cover object-top"
          />
        </div>

        <div className="p-6 text-center">
          <h3 className="text-xl font-bold text-white">
            June Jeptoo
          </h3>
          <p className="mt-2 text-[#FFC857] font-semibold">
            Treasurer
          </p>
        </div>
      </div>

      {/* Pamrolex Odede */}
<div className="bg-[#12345A] rounded-2xl overflow-hidden shadow-lg border border-white/10 hover:shadow-2xl transition-shadow duration-300 lg:col-start-2">
        <div className="h-80 bg-[#0F2540] overflow-hidden">
          <img
            src="/images/team/pamrolex-odede.jpeg"
            alt="Pamrolex Odede - Co-ordinator"
            className="w-full h-full object-cover object-top"
          />
        </div>
        

        <div className="p-6 text-center">
          <h3 className="text-xl font-bold text-white">
            Pamrolex Odede
          </h3>
          <p className="mt-2 text-[#FFC857] font-semibold">
            Co-ordinator
          </p>
        </div>
      </div>

    </div>
  </div>
</section>


      {/* Focus Areas */}
      <section className="py-20 px-4 bg-navy-850">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold text-center text-white mb-14">
            Our Focus Areas
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <Link
              to="/ministries"
              className="group bg-gradient-to-br from-navy-500 to-navy-600 rounded-lg shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:translate-y-2 border border-navy-300 hover:border-gold"
            >
              <h3 className="text-2xl font-bold text-navy-50 mb-4 group-hover:text-gold transition-colors">
                Our Ministries
              </h3>

              <p className="text-navy-150 group-hover:text-navy-100 transition-colors">
                Serving God, transforming lives, and advancing the Kingdom
                through various ministries.
              </p>

            </Link>


            <Link
              to="/events"
              className="group bg-gradient-to-br from-navy-400 to-navy-500 rounded-lg shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:translate-y-2 border border-navy-200 hover:border-gold"
            >
              <h3 className="text-2xl font-bold text-navy-50 mb-4 group-hover:text-gold transition-colors">
                Events & Missions
              </h3>

              <p className="text-navy-100 group-hover:text-navy-50 transition-colors">
                Upcoming gospel crusades, outreach programs, and mission
                activities.
              </p>

            </Link>


            <Link
              to="/testimonials"
              className="group bg-gradient-to-br from-navy-500 to-navy-600 rounded-lg shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:translate-y-2 border border-navy-300 hover:border-gold"
            >
              <h3 className="text-2xl font-bold text-navy-50 mb-4 group-hover:text-gold transition-colors">
                Testimonials
              </h3>

              <p className="text-navy-150 group-hover:text-navy-100 transition-colors">
                Stories of transformation and God's work through Christ-Like
                Missionaries.
              </p>

            </Link>

          </div>

        </div>

      </section>

    </div>
  )
}