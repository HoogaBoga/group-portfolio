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
    const cardColorMap: Record<string, string> = {
        "black": "bg-black text-white",
        "white": "bg-white text-black",
        "gray": "bg-gray-100 text-gray-900",
        "brand-green": "bg-brand-green text-black"
    };

    const buttonColorMap: Record<string, string> = {
        "black": "bg-black text-brand-green",
        "white": "bg-white text-black", 
        "gray": "bg-brand-green text-gray-100", 
        "brand-green": "bg-brand-green text-gray-900", 
    };

    const bgClass = cardColorMap[mainColor]?.split(' ')[0] || 'bg-white';
    const textClass = cardColorMap[mainColor]?.split(' ')[1] || 'text-black';
    
    const buttonBgClass = buttonColorMap[altColor]?.split(' ')[0] || 'bg-gray-800';
    const buttonTextClass = buttonColorMap[altColor]?.split(' ')[1] || 'text-white';
    
    const borderClass = buttonBgClass;

    return (
        <div className={`${bgClass} ${textClass} rounded-xl shadow-md p-8 w-96 max-w-full transition-all duration-300 hover:shadow-lg`}>
            <div className={'flex justify-center mb-4'}>
                <img src={image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"} 
                     alt={name} 
                     className={`w-32 h-32 rounded-full object-cover border-4 shadow-md ${borderClass}`}/>
            </div>
            <h3 className="text-3xl font-bold mb-2 text-center">{name}</h3>
            <p className="text-xl font-semibold mb-3 opacity-90 text-center">{role}</p>
            <p className="text-center mb-8 text-base leading-relaxed">{description}</p>
            <div className="flex justify-center">
                <button className={`${buttonBgClass} ${buttonTextClass} py-3 px-6 rounded-md font-medium text-lg`}>
                    Portfolio
                </button>
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
            image: "/Edwell.jpeg",
            mainColor: "black",
            altColor: "white",
        },
        {
            name: "Lim, Matthew Spyke",
            role: "CEO & Frontend Engineer",
            description: "As both our CEO and Frontend Engineer, they lead the vision of the company while bringing ideas to life through intuitive user interfaces. Balancing leadership with hands-on development, they make sure the team moves forward with clarity and innovation.",
            image: "/Spyke.jpeg",
            mainColor: "gray",
            altColor: "brand-green",
        },
        {
            name: "Tagalog, Judd",
            role: "Full-Stack Engineer",
            description: "Our Fullstack Engineer bridges the gap between frontend and backend, creating seamless experiences from design to deployment. Skilled in multiple technologies, they adapt to any challenge and ensure that every project is delivered with both functionality and polish.",
            image: "/Judd.jpeg",
            mainColor: "brand-green",
            altColor: "black",
        }
    ]
    
    return (
        <section className="py-16 bg-white w-full flex flex-col items-center justify-center min-h-screen">
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
