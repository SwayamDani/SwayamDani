'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function Skills() {
  // Define skills with their levels first to ensure consistency
  const mainSkills = [
    { name: "Python", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "React.js", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "TypeScript", level: 75 },
    { name: "HTML/CSS", level: 80 }
  ];
  
  // Radar chart data derived from the skills array for consistency
  const radarData = {
    labels: mainSkills.map(skill => skill.name),
    datasets: [
      {
        label: 'Skill Level',
        data: mainSkills.map(skill => skill.level),
        backgroundColor: 'rgba(18, 214, 64, 0.2)',
        borderColor: 'rgba(18, 214, 64, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(18, 214, 64, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(18, 214, 64, 1)',
      },
    ],
  };
  
  const radarOptions = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(255, 255, 255, 0.15)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.15)',
        },
        pointLabels: {
          color: '#fff',
          font: {
            size: 14,
            weight: 'bold'
          },
        },
        ticks: {
          display: false,
          beginAtZero: true,
          max: 100,
          stepSize: 20,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 14
        },
        callbacks: {
          label: function(context) {
            return `Proficiency: ${context.raw}%`;
          }
        }
      }
    },
    maintainAspectRatio: false,
  };

  // Technical skills data
  const technicalSkills = [
    {
      category: "Languages",
      skills: [
        { name: "Python", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "TypeScript", level: 75 },
        { name: "Java", level: 75 },
        { name: "C/C++", level: 70 },
        { name: "HTML/CSS", level: 80 },
      ]
    },
    {
      category: "Frameworks & Libraries",
      skills: [
        { name: "React.js", level: 85 },
        { name: "Node.js", level: 80 },
        { name: "Next.js", level: 75 },
        { name: "FastAPI", level: 70 },
        { name: "Material UI", level: 80 },
        { name: "Streamlit", level: 75 },
      ]
    },
    {
      category: "Tools & Technologies",
      skills: [
        { name: "Git", level: 85 },
        { name: "Firebase", level: 80 },
        { name: "Google Cloud", level: 70 },
        { name: "OpenAI API", level: 85 },
        { name: "JWT", level: 75 },
        { name: "Figma", level: 70 },
      ]
    }
  ];

  return (
    <div className="container mx-auto py-20 px-4">
      <h2 className="text-4xl font-bold mb-4 text-center">Technical Skills</h2>
      <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-16 max-w-3xl mx-auto">
        My technical toolkit and proficiency levels across different technologies.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <motion.div 
          className="bg-gray-800 rounded-xl p-6 shadow-lg col-span-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-white">Key Skills</h3>
          <div className="h-80">
            <Radar data={radarData} options={radarOptions} />
          </div>
        </motion.div>

        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {technicalSkills.map((skillGroup, groupIndex) => (
            <div key={groupIndex} className="mb-8">
              <h3 className="text-2xl font-bold mb-4">{skillGroup.category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {skillGroup.skills.map((skill, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-green-500 h-2.5 rounded-full" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div 
        className="mt-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold mb-8 text-center">Specialized Areas</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { name: "Full-Stack Development", icon: "fas fa-laptop-code" },
            { name: "AI Integration", icon: "fas fa-brain" },
            { name: "Cybersecurity", icon: "fas fa-shield-alt" },
            { name: "Responsive Design", icon: "fas fa-mobile-alt" },
            { name: "Project Management", icon: "fas fa-project-diagram" },
            { name: "Agile Methodologies", icon: "fas fa-code-branch" }
          ].map((specialty, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center hover:transform hover:scale-105 transition-all duration-300"
            >
              <i className={`${specialty.icon} text-4xl text-green-500 mb-4`}></i>
              <h4 className="font-bold">{specialty.name}</h4>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}