// src/app/tutorials/linked-lists/singly-linked-list.js

const singlyLinkedList = {
    title: "Implementing a Singly Linked List in C++",
    slug: "singly-linked-list-cpp",
    excerpt: "Learn how to create and manipulate a singly linked list data structure in C++.",
    description: "A step-by-step guide to implementing a singly linked list, including insertions, deletions, traversals, and common operations.",
    image: "https://www.geeksforgeeks.org/wp-content/uploads/gq/2013/03/Linkedlist.png",
    imagePath: "https://www.geeksforgeeks.org/wp-content/uploads/gq/2013/03/Linkedlist.png",
    publishedAt: "2024-03-20",
    date: "March 20, 2024",
    author: "Swayam Dani",
    readTime: "15 min read",
    difficulty: "Beginner",
    category: "dsa",
    module: "Linked Lists",
    introduction: "A singly linked list is the most basic type of linked list, where each node points only to the next node in the sequence. In this tutorial, we'll build a complete singly linked list implementation in C++ from scratch, with all standard operations and best practices.",
    prerequisites: [
      "Basic C++ programming knowledge",
      "Understanding of pointers and dynamic memory allocation",
      "Familiarity with classes and object-oriented programming"
    ],
    steps: [
      {
        title: "Defining the Node Structure",
        content: "First, let's define the Node structure that will hold our data and the pointer to the next node in the list.",
        code: "// Node structure for a singly linked list\nstruct Node {\n    int data;         // Data stored in the node\n    Node* next;       // Pointer to the next node\n    \n    // Constructor\n    Node(int value) : data(value), next(nullptr) {}\n};"
      },
      {
        title: "Creating the SinglyLinkedList Class",
        content: "Now, let's create a class to encapsulate the singly linked list operations and maintain a pointer to the head node.",
        code: "class SinglyLinkedList {\nprivate:\n    Node* head;  // Pointer to the first node\n    \npublic:\n    // Constructor\n    SinglyLinkedList() : head(nullptr) {}\n    \n    // Destructor to free memory\n    ~SinglyLinkedList() {\n        Node* current = head;\n        while (current != nullptr) {\n            Node* next = current->next;\n            delete current;\n            current = next;\n        }\n        head = nullptr;\n    }\n    \n    // Methods for operations will go here\n};"
      },
      {
        title: "Implementing Insertion Operations",
        content: "Let's add methods to insert nodes at the beginning, end, and at a specific position in the linked list.",
        code: "// Insert at the beginning - O(1)\nvoid insertAtBeginning(int value) {\n    Node* newNode = new Node(value);\n    newNode->next = head;\n    head = newNode;\n}\n\n// Insert at the end - O(n)\nvoid insertAtEnd(int value) {\n    Node* newNode = new Node(value);\n    \n    // If the list is empty, make the new node the head\n    if (head == nullptr) {\n        head = newNode;\n        return;\n    }\n    \n    // Otherwise, traverse to the end and add the new node\n    Node* current = head;\n    while (current->next != nullptr) {\n        current = current->next;\n    }\n    \n    current->next = newNode;\n}\n\n// Insert after a specific position (0-based index) - O(n)\nvoid insertAtPosition(int position, int value) {\n    // If position is 0, insert at the beginning\n    if (position == 0) {\n        insertAtBeginning(value);\n        return;\n    }\n    \n    // Create the new node\n    Node* newNode = new Node(value);\n    \n    // If list is empty and position > 0, insert at the beginning\n    if (head == nullptr) {\n        head = newNode;\n        return;\n    }\n    \n    // Traverse to the position (or the end if position is too large)\n    Node* current = head;\n    for (int i = 0; i < position - 1 && current->next != nullptr; i++) {\n        current = current->next;\n    }\n    \n    // Insert the new node after current\n    newNode->next = current->next;\n    current->next = newNode;\n}"
      },
      {
        title: "Implementing Deletion Operations",
        content: "Now let's implement methods to delete nodes from the beginning, end, and at a specific position.",
        code: "// Delete from the beginning - O(1)\nbool deleteFromBeginning() {\n    // If list is empty, nothing to delete\n    if (head == nullptr) {\n        return false;\n    }\n    \n    // Save the head node\n    Node* temp = head;\n    \n    // Move head to the next node\n    head = head->next;\n    \n    // Delete the old head\n    delete temp;\n    return true;\n}\n\n// Delete from the end - O(n)\nbool deleteFromEnd() {\n    // If list is empty, nothing to delete\n    if (head == nullptr) {\n        return false;\n    }\n    \n    // If there's only one node\n    if (head->next == nullptr) {\n        delete head;\n        head = nullptr;\n        return true;\n    }\n    \n    // Traverse to the second-to-last node\n    Node* current = head;\n    while (current->next->next != nullptr) {\n        current = current->next;\n    }\n    \n    // Delete the last node\n    delete current->next;\n    current->next = nullptr;\n    return true;\n}\n\n// Delete from a specific position (0-based index) - O(n)\nbool deleteFromPosition(int position) {\n    // If list is empty, nothing to delete\n    if (head == nullptr) {\n        return false;\n    }\n    \n    // If position is 0, delete from beginning\n    if (position == 0) {\n        return deleteFromBeginning();\n    }\n    \n    // Traverse to the node before the one to delete\n    Node* current = head;\n    for (int i = 0; i < position - 1 && current != nullptr && current->next != nullptr; i++) {\n        current = current->next;\n    }\n    \n    // If position is beyond the end or next is nullptr\n    if (current == nullptr || current->next == nullptr) {\n        return false;\n    }\n    \n    // Save the node to delete\n    Node* temp = current->next;\n    \n    // Update the pointers to skip the node\n    current->next = temp->next;\n    \n    // Delete the node\n    delete temp;\n    return true;\n}"
      },
      {
        title: "Implementing Search and Display Operations",
        content: "Let's add methods to search for a value, get the length of the list, and display all elements.",
        code: "// Search for a value - O(n)\nbool search(int value) {\n    Node* current = head;\n    \n    while (current != nullptr) {\n        if (current->data == value) {\n            return true;\n        }\n        current = current->next;\n    }\n    \n    return false;\n}\n\n// Get the length of the list - O(n)\nint length() {\n    int count = 0;\n    Node* current = head;\n    \n    while (current != nullptr) {\n        count++;\n        current = current->next;\n    }\n    \n    return count;\n}\n\n// Display the entire list - O(n)\nvoid display() {\n    if (head == nullptr) {\n        std::cout << \"List is empty\" << std::endl;\n        return;\n    }\n    \n    Node* current = head;\n    \n    while (current != nullptr) {\n        std::cout << current->data;\n        current = current->next;\n        \n        if (current != nullptr) {\n            std::cout << \" -> \";\n        }\n    }\n    \n    std::cout << std::endl;\n}"
      },
      {
        title: "Advanced Operations: Reverse and Middle Node",
        content: "Let's implement some more advanced operations: reversing the list and finding the middle node.",
        code: "// Reverse the linked list - O(n)\nvoid reverse() {\n    Node* prev = nullptr;\n    Node* current = head;\n    Node* next = nullptr;\n    \n    while (current != nullptr) {\n        // Store next\n        next = current->next;\n        \n        // Reverse current node's pointer\n        current->next = prev;\n        \n        // Move pointers one position ahead\n        prev = current;\n        current = next;\n    }\n    \n    // Update head\n    head = prev;\n}\n\n// Find the middle node (using slow and fast pointers) - O(n)\nNode* findMiddle() {\n    if (head == nullptr) {\n        return nullptr;\n    }\n    \n    Node* slow = head;\n    Node* fast = head;\n    \n    // Fast pointer moves twice as fast as slow pointer\n    // When fast reaches the end, slow will be at the middle\n    while (fast != nullptr && fast->next != nullptr) {\n        slow = slow->next;\n        fast = fast->next->next;\n    }\n    \n    return slow;\n}"
      }
    ],
    conclusion: "Congratulations! You've implemented a complete singly linked list data structure in C++. This foundational data structure is essential for understanding more complex structures and algorithms. In the next tutorials, we'll explore doubly linked lists and circular linked lists, which build upon the concepts you've learned here.",
    nextSteps: [
      "Complete the practice exercises below to reinforce your understanding",
      "Move on to the doubly linked list tutorial",
      "Try implementing a generic (templated) version of the singly linked list"
    ],
    relatedTutorials: [
      {
        slug: "doubly-linked-list-cpp",
        title: "Implementing a Doubly Linked List in C++",
        excerpt: "Learn how to create and manipulate a doubly linked list data structure in C++."
      },
      {
        slug: "circular-linked-list-cpp",
        title: "Implementing a Circular Linked List in C++",
        excerpt: "Learn how to create and manipulate a circular linked list data structure in C++."
      }
    ]
  };
  
  export default singlyLinkedList;