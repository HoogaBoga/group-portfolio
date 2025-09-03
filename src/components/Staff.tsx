import React from "react"

interface EmployeeCardProps {
    name: string;
    role: string;
    description: string;
    image: string;
    mainColor: string;
    altColor: string;
}

interface StaffMember {
    name: string;
    role: string;
    description: string;
    image: string;
    mainColor: string;
    altColor: string;
}

function EmployeeCard({
    name, role, description, image, mainColor, altColor
}: EmployeeCardProps) {
    return (
        <div className={'bg-${mainColor} text-${altColor} rounded-xl shadow-md p-6 w-100 max-w-full transition-all duration-300 hover:shadow-lg'}>
            <div className={'flex justify-center mb-4'}>
                <img src={image} alt={name} className={'w-24 h-24 rounded-full object-cover border-4 shadow-md border-${altColor}'}/>
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">{name}</h3>
            <p className="text-lg font-semibold mb-3 opacity-90 text-center">{role}</p>
            <p className="text-center mb-8">{description}</p>
            <div className="flex justify-center">
                <button className={'bg-${altColor} text-${mainColor} py-2 px-4 rounded-md font-medium'}>Portfolio</button>
            </div>
        </div>
    );
};

function Staff() {
    const staffMembers: StaffMember[] = [
        {
            name: "Cotejar, Edwell John",
            role: "Backend Engineer",
            description: "Focused on building the backbone of our applications, our Backend Engineer ensures reliable, secure, and efficient systems. They specialize in designing robust APIs, managing databases, and optimizing performance to keep everything running smoothly behind the scenes.",
            image: "",
            mainColor: "black",
            altColor: "white",
        },
        {
            name: "Lim, Matthew Spyke",
            role: "CEO & Frontend Engineer",
            description: "As both our CEO and Frontend Engineer, they lead the vision of the company while bringing ideas to life through intuitive user interfaces. Balancing leadership with hands-on development, they make sure the team moves forward with clarity and innovation.",
            image: "",
            mainColor: "gray",
            altColor: "green-900",
        },
        {
            name: "Tagalog, Judd",
            role: "Full-Stack Engineer",
            description: "Our Fullstack Engineer bridges the gap between frontend and backend, creating seamless experiences from design to deployment. Skilled in multiple technologies, they adapt to any challenge and ensure that every project is delivered with both functionality and polish.",
            image: "",
            mainColor: "green-900",
            altColor: "black",
        }
    ]
    
    return (
        <section className="py-16 bg-white w-full flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-12 underline">Meet the crew</h1>

            <div className="flex flex-wrap justify-center gap-8">
                {staffMembers.map((member) => (
                    <EmployeeCard key={member.name} {...member}/>
                ))}
            </div>
        </section>
    );
}

export default Staff
