'use client';

import React, { useEffect, useState } from 'react';
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react';

import { workExperience, education } from '@/data';

// Type definitions
interface WorkExperienceItem {
  id: number;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  skills: string[];
}

interface EducationItem {
  id: number;
  institution: string;
  degree: string;
  duration: string;
  location: string;
  percentage?: string;
  cgpa?: string;
}

interface CardComponentProps {
  item: WorkExperienceItem | EducationItem;
  index: number;
  isWork: boolean;
  isVisible: boolean;
}

const TimelineExperience: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const [lineHeight, setLineHeight] = useState<number>(0);

  useEffect(() => {
    // Initialize all cards as visible with staggered timing
    const allCardIds: string[] = [
      ...workExperience.map((item: WorkExperienceItem) => `work-${item.id}`),
      ...education.map((item: EducationItem) => `edu-${item.id}`)
    ];
    
    allCardIds.forEach((cardId: string, index: number) => {
      setTimeout(() => {
        setVisibleCards(prev => new Set([...prev, cardId]));
      }, index * 200);
    });

    // Animate timeline line
    const animateTimeline = (): void => {
      let progress = 0;
      const animate = (): void => {
        progress += 0.8;
        setLineHeight(Math.min(progress, 100));
        if (progress < 100) {
          requestAnimationFrame(animate);
        }
      };
      setTimeout(() => requestAnimationFrame(animate), 800);
    };

    animateTimeline();
  }, []);

  // Type guard to check if item is WorkExperienceItem
  const isWorkItem = (item: WorkExperienceItem | EducationItem): item is WorkExperienceItem => {
    return 'company' in item && 'position' in item && 'skills' in item;
  };

  const CardComponent: React.FC<CardComponentProps> = ({ item, index, isWork, isVisible }) => {
    return (
      <div className="timeline-item" id='experience'>
        {/* Timeline dot */}
        <div className="timeline-dot-container">
          <div className={`timeline-dot ${isWork ? 'work-dot' : 'edu-dot'} ${isVisible ? 'dot-visible' : ''}`}>
            <div className="dot-ping" style={{ animationDelay: `${index * 0.2}s` }}></div>
          </div>
        </div>
        
        {/* Card */}
        <div className={`timeline-card-container ${index % 2 === 0 ? 'card-left' : 'card-right'}`}>
          <div className="timeline-card-wrapper">
            <div 
              className={`timeline-card ${isVisible ? 'card-visible' : 'card-hidden'} ${index % 2 === 0 ? 'card-slide-right' : 'card-slide-left'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Card header */}
              <div className={`card-header ${isWork ? 'work-header' : 'edu-header'}`}></div>
              
              <div className="card-content">
                {/* Duration */}
                <div className="card-top-row">
                  <div className={`duration-badge ${isWork ? 'work-badge' : 'edu-badge'}`}>
                    <Calendar className="w-4 h-4 mr-2" />
                    {item.duration}
                  </div>
                  <div className="card-actions">
                    {isVisible && (
                      <div 
                        className={`bounce-dot ${isWork ? 'work-bounce' : 'edu-bounce'}`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      ></div>
                    )}
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="card-title">
                  {isWorkItem(item) ? item.position : item.degree}
                </h3>
                
                {/* Company/Institution */}
                <h4 className="card-subtitle">
                  {isWorkItem(item) ? item.company : item.institution}
                </h4>
                
                {/* Location */}
                <div className="card-location">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{item.location}</span>
                </div>
                
                {/* Description for work items only */}
                {isWorkItem(item) && (
                  <p className="card-description">{item.description}</p>
                )}
                
                {/* CGPA/Percentage for education items only */}
                {!isWorkItem(item) && (
                  <div className="card-percentage">
                    <span className="percentage-label">
                      {(item as EducationItem).cgpa ? 'CGPA: ' : 'Percentage: '}
                    </span>
                    <span className="percentage-value">
                      {(item as EducationItem).cgpa || (item as EducationItem).percentage}
                    </span>
                  </div>
                )}
                
                {/* Skills for work items only */}
                {isWorkItem(item) && (
                  <div className="skills-container">
                    {item.skills.map((skill: string, skillIndex: number) => (
                      <span
                        key={skillIndex}
                        className="skill-tag work-skill"
                        style={{ animationDelay: `${(index * 150) + (skillIndex * 50)}ms` }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="timeline-container">
      <div className="timeline-wrapper">
        {/* Header */}
        <div className="timeline-header">
          <h1 className="timeline-main-title">
            Professional Journey
          </h1>
          <p className="timeline-subtitle">Exploring the path of growth and learning</p>
        </div>
        
        {/* Work Experience Section */}
        <div className="timeline-section">
          <div className="section-header">
            <div className="section-icon work-icon">
              <Briefcase className="w-8 h-8" />
            </div>
            <h2 className="section-title">Work Experience</h2>
          </div>
          
          <div className="timeline-track">
            {/* Animated timeline line */}
            <div className="timeline-line-bg">
              <div 
                className="timeline-line work-line"
                style={{ height: `${Math.min(lineHeight, 100)}%` }}
              ></div>
            </div>
            
            {workExperience.map((job: WorkExperienceItem, index: number) => (
              <CardComponent
                key={job.id}
                item={job}
                index={index}
                isWork={true}
                isVisible={visibleCards.has(`work-${job.id}`)}
              />
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="timeline-section">
          <div className="section-header">
            <div className="section-icon edu-icon">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h2 className="section-title">Education</h2>
          </div>
          
          <div className="timeline-track">
            {/* Animated timeline line */}
            <div className="timeline-line-bg">
              <div 
                className="timeline-line edu-line"
                style={{ height: `${Math.min(lineHeight, 100)}%` }}
              ></div>
            </div>
            
            {education.map((edu: EducationItem, index: number) => (
              <CardComponent
                key={edu.id}
                item={edu}
                index={index}
                isWork={false}
                isVisible={visibleCards.has(`edu-${edu.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineExperience;