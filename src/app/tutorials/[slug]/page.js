'use client'
import React from 'react';
import TutorialPost from '../../components/TutorialPost';
import { useParams } from 'next/navigation';
import { getTutorialBySlug } from '../../utils/tutorialData';

export default function TutorialPage() {
  const params = useParams();
  const { slug } = params;
  
  // Fetch the tutorial data by slug
  const tutorial = getTutorialBySlug(slug);
  
  return <TutorialPost tutorial={tutorial} />;
}