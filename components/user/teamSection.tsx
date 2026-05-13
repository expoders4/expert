import Image from 'next/image';
import { Reveal, Stagger } from '../animations';

const team = [
  {
    name: 'Rakesh Patel',
    role: 'Founder & Principal Architect',
    bio: 'Leading visionary with 40 years of global experience.',
  },
  {
    name: 'Dilip Patel',
    role: 'Creative Director',
    bio: 'Design leader focused on modern architectural storytelling.',
  },
//   {
//     name: 'James Osei',
//     role: 'Head of Sustainability',
//     bio: 'Expert in net-zero and green architecture systems.',
//   },
];

export default function TeamSection() {
  return (
    <Reveal>
      <section className="section-dark2 py-24">
        <div className="container-wide">

          <div className="text-center mb-14">
            <span className="section-label">Our Team</span>
            <h2 className="section-heading">
              People Behind the <span>Vision</span>
            </h2>
          </div>

          <Stagger>
            <div className="grid md:grid-cols-3 gap-6">

              {team.map((member) => (
                <div key={member.name} className="border border-dark4 p-6">

                  <div className="relative w-full aspect-[4/3] mb-4">
                    <Image
                      src="/images/about-office.png"
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-primary text-xs uppercase tracking-widest">
                    {member.role}
                  </p>

                  <p className="text-sm text-muted mt-2">
                    {member.bio}
                  </p>

                </div>
              ))}

            </div>
          </Stagger>

        </div>
      </section>
    </Reveal>
  );
}