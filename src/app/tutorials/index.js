// src/app/tutorials/index.js
// This file exports all tutorials from their individual modules

// Course overview
import courseOverview from './dsa/course-overview';

// Linked Lists module
import linkedListsOverview from './dsa/linked-lists/linked-lists-overview';
import singlyLinkedList from './dsa/linked-lists/singly-linked-list';
import doublyLinkedList from './dsa/linked-lists/doubly-linked-list';
import circularLinkedList from './dsa/linked-lists/circular-linked-list';

// Trees module
import treeOverview from './dsa/trees/tree-overview';
import binaryTree from './dsa/trees/binary-tree';
import binarySearchTree from './dsa/trees/binary-search-tree';

// Export all tutorials as an array
export const allTutorials = [
  courseOverview,
  linkedListsOverview,
  singlyLinkedList,
  doublyLinkedList,
  circularLinkedList,
  treeOverview,
  binaryTree,
  binarySearchTree
];

// Export individual tutorials for direct access
export {
  courseOverview,
  linkedListsOverview,
  singlyLinkedList,
  doublyLinkedList, 
  circularLinkedList,
  treeOverview,
  binaryTree,
  binarySearchTree
};

// Export default as the array of all tutorials
export default allTutorials;