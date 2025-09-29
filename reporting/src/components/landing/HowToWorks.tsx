// app/components/landing/HowItWorks.tsx

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800">How EvaSUE Works</h2>
        <p className="mt-4 text-gray-600">
          A simple, Spirit-led system connecting campuses, leaders, and staff.
        </p>

        <div className="mt-12 space-y-10">
          {[
            {
              role: 'Student Leaders',
              action: 'Submit reports on spiritual life, needs, and events from their campus.',
              color: 'sky',
            },
            {
              role: 'Staff & Super Staff',
              action: 'Receive reports, respond with care, and organize discipleship efforts.',
              color: 'sky',
            },
            {
              role: 'Administration',
              action: 'Oversee national impact, ensure unity, and support growth.',
              color: 'sky',
            },
          ].map((step, i) => (
            <div
              key={i}
              className={`flex flex-col md:flex-row items-center gap-6 p-6 rounded-3xl bg-gradient-to-r from-${step.color}-50 to-white border border-${step.color}-200 shadow-sm`}
            >
              <div className={`w-12 h-12 bg-${step.color}-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg`}>
                {i + 1}
              </div>
              <div className="text-left">
                <h3 className={`text-xl font-semibold text-gray-800`}>{step.role}</h3>
                <p className="text-gray-600 mt-1">{step.action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}