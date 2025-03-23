// src/app/utils/tutorialData.js
import { allTutorials } from '../tutorials';

export function getAllTutorials() {
  // Make sure we handle potential errors in the import
  if (!Array.isArray(allTutorials)) {
    console.error("allTutorials is not an array:", allTutorials);
    return [];
  }
  
  // Filter out any undefined or incomplete tutorial objects
  return allTutorials.filter(tutorial => 
    tutorial && 
    tutorial.title && 
    tutorial.slug &&
    tutorial.excerpt
  );
}

export function getTutorialBySlug(slug) {
  if (!slug) return null;
  
  // Make sure we handle potential errors in the import
  if (!Array.isArray(allTutorials)) {
    console.error("allTutorials is not an array:", allTutorials);
    return null;
  }
  
  return allTutorials.find(tutorial => 
    tutorial && tutorial.slug === slug
  ) || null;
}