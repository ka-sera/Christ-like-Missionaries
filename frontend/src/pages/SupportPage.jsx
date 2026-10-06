import React, { useEffect, useState } from 'react'
import { prayerAPI } from '../services/api'

const supportMethods = [
  {
    id: 'donation',
    title: 'One-Time Donation',
    description:
      'Make a one-time contribution to help Christ-Like Missionaries support ministry, outreach, and community work.',
  },
  {
    id: 'monthly',
    title: 'Become a Monthly Sponsor',
    description:
      'Provide consistent monthly support that helps us plan and sustain our missionary activities.',
  },
  {
    id: 'project',
    title: 'Support a Project',
    description:
      'Support a specific ministry project or outreach initiative that is making a difference in people’s lives.',
  },
  {
    id: 'volunteer',
    title: 'Volunteer Your Time',
    description:
      'Use your skills, time, and talents to serve alongside Christ-Like Missionaries.',
  },
  {
    id: 'prayer',
    title: 'Prayer Support',
    description:
      'Pray for our missionaries, ministry activities, communities, and the people we serve.',
  },
  {
    id: 'resource',
    title: 'Donate Resources',
    description:
      'Support the ministry with useful resources, equipment, books, clothing, food, or other practical items.',
  },
]

const fundingNeeds = [
  'Missionary outreach',
  'Community service',
  'Evangelism and discipleship',
  'Youth ministry',
  'Educational support',
  'Mission projects',
]

function SupportPage() {
  const [selectedMethod, setSelectedMethod] = useState('donation')

  const [prayerForm, setPrayerForm] = useState({
    name: '',
    email: '',
    phone: '',
    request: '',
    is_private: false,
  })

  const [prayerMessage, setPrayerMessage] = useState('')

  useEffect(() => {
    const hash = window.location.hash

    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash)

        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
      }, 100)
    }
  }, [])

  const handleMethodClick = (method) => {
    setSelectedMethod(method)

    setTimeout(() => {
      const element = document.getElementById(`${method}-action`)

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }, 100)
  }

  const handlePrayerChange = (event) => {
    const { name, value, type, checked } = event.target

    setPrayerForm((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }))

    setPrayerMessage('')
  }

  const handlePrayerSubmit = async (event) => {
    event.preventDefault()

    setPrayerMessage('Sending your prayer request...')

    try {
      await prayerAPI.sendRequest(prayerForm)

      setPrayerMessage(
        'Thank you for sharing your prayer request. Our prayer team will keep it in prayer.'
      )

      setPrayerForm({
        name: '',
        email: '',
        phone: '',
        request: '',
        is_private: false,
      })
    } catch (error) {
      console.error('Prayer request submission failed:', error)

      const message = JSON.stringify(error.response?.data || error.message || 'Unknown error')

      setPrayerMessage(message)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B2545] text-white">
      {/* PAGE HEADER */}
      <section className="border-b border-white/10 bg-[#0B2545] px-6 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#FFC857]">
            Support The Mission
          </p>

          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">
            Partner With Christ-Like Missionaries
          </h1>

          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/80">
            Your prayers, generosity, time, and resources help us share the
            love of Christ and serve communities through meaningful missionary
            work.
          </p>
        </div>
      </section>

      {/* SUPPORT METHODS */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#FFC857]">
              Ways To Help
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Choose How You Would Like To Support
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              There are many ways to become part of the mission. Choose the
              form of support that works best for you.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {supportMethods.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => handleMethodClick(method.id)}
                className="rounded-2xl border border-white/10 bg-[#12345A] p-7 text-left transition hover:-translate-y-1 hover:border-[#FFC857]/50 hover:shadow-xl"
              >
                <h3 className="mb-3 text-xl font-bold text-white">
                  {method.title}
                </h3>

                <p className="leading-relaxed text-white/70">
                  {method.description}
                </p>

                <span className="mt-5 inline-block font-semibold text-[#FFC857]">
                  Learn More →
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT INFORMATION */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-[#12345A] p-8 sm:p-10">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#FFC857]">
                Contact Us
              </p>

              <h2 className="mb-4 text-3xl font-bold">
                We Would Love To Hear From You
              </h2>

              <p className="leading-relaxed text-white/70">
                If you have questions about supporting the ministry, projects,
                volunteering, prayer, or resources, please contact us.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:info@christ-likemissionaries.org"
                className="block rounded-xl bg-[#D9E5F5] p-4 font-semibold text-[#0B2545] transition hover:bg-white"
              >
                info@christ-likemissionaries.com
              </a>

              <a
                href="mailto:clm@christ-likemissionaries.org"
                className="block rounded-xl bg-[#D9E5F5] p-4 font-semibold text-[#0B2545] transition hover:bg-white"
              >
                clm@christ-likemissionaries.org
              </a>

              <a
                href="mailto:register@christ-likemissionaries.com"
                className="block rounded-xl bg-[#D9E5F5] p-4 font-semibold text-[#0B2545] transition hover:bg-white"
              >
                register@christ-likemissionaries.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ONE-TIME DONATION */}
      {selectedMethod === 'donation' && (
        <section
          id="donation-action"
          className="px-6 pb-20"
        >
          <div className="mx-auto max-w-5xl rounded-2xl border-l-4 border-[#FFC857] bg-[#12345A] p-8 sm:p-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#FFC857]">
              Financial Support
            </p>

            <h2 className="mb-4 text-3xl font-bold">
              One-Time Donation
            </h2>

            <p className="mb-8 max-w-3xl leading-relaxed text-white/70">
              Your one-time gift can help provide practical support for
              missionary activities and ministry projects.
            </p>

            <div className="rounded-2xl bg-[#D9E5F5] p-6 text-[#0B2545]">
              <h3 className="mb-4 text-xl font-bold">
                Areas Your Donation Can Support
              </h3>

              <ul className="grid gap-3 sm:grid-cols-2">
                {fundingNeeds.map((need) => (
                  <li key={need}>✓ {need}</li>
                ))}
              </ul>

              <p className="mt-6 text-sm leading-relaxed">
                Payment and donation processing can be connected here once
                your preferred payment method is configured.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* MONTHLY SPONSOR */}
      {selectedMethod === 'monthly' && (
        <section
          id="monthly-action"
          className="px-6 pb-20"
        >
          <div className="mx-auto max-w-5xl rounded-2xl border-l-4 border-[#FFC857] bg-[#12345A] p-8 sm:p-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#FFC857]">
              Consistent Support
            </p>

            <h2 className="mb-4 text-3xl font-bold">
              Become A Monthly Sponsor
            </h2>

            <p className="mb-8 max-w-3xl leading-relaxed text-white/70">
              Monthly sponsorship provides consistent support that helps the
              ministry plan its activities and serve communities throughout
              the year.
            </p>

            <div className="rounded-2xl bg-[#D9E5F5] p-6 text-[#0B2545]">
              <h3 className="mb-4 text-xl font-bold">
                Monthly Partnership
              </h3>

              <p className="leading-relaxed">
                Choose a monthly amount that works for you. Payment options can
                be connected here after the payment system is configured.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* PROJECT SUPPORT */}
      {selectedMethod === 'project' && (
        <section
          id="project-action"
          className="px-6 pb-20"
        >
          <div className="mx-auto max-w-5xl rounded-2xl border-l-4 border-[#FFC857] bg-[#12345A] p-8 sm:p-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#FFC857]">
              Ministry Projects
            </p>

            <h2 className="mb-4 text-3xl font-bold">
              Support A Project
            </h2>

            <p className="mb-8 max-w-3xl leading-relaxed text-white/70">
              You can support a specific project or outreach initiative.
              Contact us to learn about current and upcoming projects.
            </p>

            <a
              href="mailto:christlikemissionaries@gmail.com?subject=Project%20Support"
              className="inline-block rounded-xl bg-[#FFC857] px-6 py-3 font-bold text-[#0B2545] transition hover:bg-[#E6B84B]"
            >
              Ask About Projects
            </a>
          </div>
        </section>
      )}

      {/* VOLUNTEER */}
      {selectedMethod === 'volunteer' && (
        <section
          id="volunteer-action"
          className="px-6 pb-20"
        >
          <div className="mx-auto max-w-5xl rounded-2xl border-l-4 border-[#FFC857] bg-[#12345A] p-8 sm:p-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#FFC857]">
              Serve With Us
            </p>

            <h2 className="mb-4 text-3xl font-bold">
              Volunteer Your Time
            </h2>

            <p className="mb-8 max-w-3xl leading-relaxed text-white/70">
              Your time and skills can make a meaningful contribution to our
              missionary activities. We welcome people who want to serve.
            </p>

            <a
              href="mailto:christlikemissionaries@gmail.com?subject=Volunteer%20Interest"
              className="inline-block rounded-xl bg-[#FFC857] px-6 py-3 font-bold text-[#0B2545] transition hover:bg-[#E6B84B]"
            >
              I Would Like To Volunteer
            </a>
          </div>
        </section>
      )}

      {/* PRAYER SUPPORT */}
      {selectedMethod === 'prayer' && (
        <section
          id="prayer-action"
          className="px-6 pb-20"
        >
          <div className="mx-auto max-w-5xl rounded-2xl border-l-4 border-[#FFC857] bg-[#12345A] p-8 sm:p-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#FFC857]">
              Prayer Ministry
            </p>

            <h2 className="mb-4 text-3xl font-bold">
              Submit A Prayer Request
            </h2>

            <p className="mb-8 max-w-3xl leading-relaxed text-white/70">
              We believe in the power of prayer. Share your prayer request
              with our team and let us stand with you in prayer.
            </p>

            <form
              onSubmit={handlePrayerSubmit}
              className="space-y-6 rounded-2xl bg-[#D9E5F5] p-6 text-[#0B2545] sm:p-8"
            >
              <div>
                <label
                  htmlFor="prayer-name"
                  className="mb-2 block font-semibold"
                >
                  Name *
                </label>

                <input
                  id="prayer-name"
                  type="text"
                  name="name"
                  value={prayerForm.name}
                  onChange={handlePrayerChange}
                  required
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-[#A0C1E0] bg-white px-4 py-3 outline-none focus:border-[#FFC857] focus:ring-2 focus:ring-[#FFC857]/30"
                />
              </div>

              <div>
                <label
                  htmlFor="prayer-email"
                  className="mb-2 block font-semibold"
                >
                  Email Address *
                </label>

                <input
                  id="prayer-email"
                  type="email"
                  name="email"
                  value={prayerForm.email}
                  onChange={handlePrayerChange}
                  required
                  placeholder="Enter your email address"
                  className="w-full rounded-xl border border-[#A0C1E0] bg-white px-4 py-3 outline-none focus:border-[#FFC857] focus:ring-2 focus:ring-[#FFC857]/30"
                />
              </div>

              <div>
                <label
                  htmlFor="prayer-phone"
                  className="mb-2 block font-semibold"
                >
                  Phone Number
                  <span className="ml-2 text-sm font-normal opacity-70">
                    (Optional)
                  </span>
                </label>

                <input
                  id="prayer-phone"
                  type="tel"
                  name="phone"
                  value={prayerForm.phone}
                  onChange={handlePrayerChange}
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-[#A0C1E0] bg-white px-4 py-3 outline-none focus:border-[#FFC857] focus:ring-2 focus:ring-[#FFC857]/30"
                />
              </div>

              <div>
                <label
                  htmlFor="prayer-request"
                  className="mb-2 block font-semibold"
                >
                  Prayer Request *
                </label>

                <textarea
                  id="prayer-request"
                  name="request"
                  value={prayerForm.request}
                  onChange={handlePrayerChange}
                  required
                  rows="7"
                  placeholder="Write your prayer request here..."
                  className="w-full resize-y rounded-xl border border-[#A0C1E0] bg-white px-4 py-3 outline-none focus:border-[#FFC857] focus:ring-2 focus:ring-[#FFC857]/30"
                />
              </div>

              <div className="rounded-xl bg-white/60 p-4">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    name="is_private"
                    checked={prayerForm.is_private}
                    onChange={handlePrayerChange}
                    className="mt-1 h-5 w-5 cursor-pointer"
                  />

                  <span className="text-sm leading-relaxed">
                    <strong>Keep this prayer request private.</strong>
                    <br />
                    Your request will only be shared with the prayer team.
                  </span>
                </label>
              </div>

              {prayerMessage && (
                <div className="rounded-xl bg-white p-4 font-semibold text-[#0B2545]">
                  {prayerMessage}
                </div>
              )}

              <button
                type="submit"
                className="rounded-xl bg-[#FFC857] px-7 py-3.5 font-bold text-[#0B2545] transition hover:bg-[#E6B84B]"
              >
                Submit Prayer Request
              </button>
            </form>
          </div>
        </section>
      )}

      {/* RESOURCE DONATIONS */}
      {selectedMethod === 'resource' && (
        <section
          id="resource-action"
          className="px-6 pb-20"
        >
          <div className="mx-auto max-w-5xl rounded-2xl border-l-4 border-[#FFC857] bg-[#12345A] p-8 sm:p-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#FFC857]">
              Give Practical Support
            </p>

            <h2 className="mb-4 text-3xl font-bold">
              Donate Resources
            </h2>

            <p className="mb-7 max-w-3xl leading-relaxed text-white/70">
              Ministry is supported not only through financial giving but also
              through practical resources.
            </p>

            <div className="rounded-2xl bg-[#D9E5F5] p-6 text-[#0B2545]">
              <h3 className="mb-5 text-xl font-bold">
                Resources We Can Use
              </h3>

              <ul className="grid gap-4 sm:grid-cols-2">
                <li>✓ Bibles and Christian books</li>
                <li>✓ Educational materials</li>
                <li>✓ Medical supplies</li>
                <li>✓ Technology and equipment</li>
                <li>✓ Clothing and food items</li>
                <li>✓ Office supplies</li>
              </ul>

              <div className="mt-7">
                <p className="mb-3 font-semibold">
                  Have resources you would like to donate?
                </p>

                <a
                  href="mailto:christlikemissionaries@gmail.com?subject=Resource%20Donation"
                  className="inline-block rounded-lg bg-[#FFC857] px-6 py-3 font-bold text-[#0B2545] transition hover:bg-[#E6B84B]"
                >
                  Contact Us About Resource Donations
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* IMPACT */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-[#12345A] p-8 text-center sm:p-10">
          <h2 className="mb-5 text-3xl font-bold">
            Your Impact Matters
          </h2>

          <p className="mx-auto mb-6 max-w-3xl text-lg leading-relaxed text-white/80">
            Every donation, prayer, volunteer hour, and resource makes a real
            difference in transforming lives and advancing God's Kingdom.
            Thank you for being part of this mission.
          </p>

          <p className="mx-auto max-w-2xl text-sm text-white/60">
            Christ-Like Missionaries is committed to responsible stewardship of
            the resources entrusted to the mission.
          </p>
        </div>
      </section>
    </div>
  )
}

export default SupportPage


