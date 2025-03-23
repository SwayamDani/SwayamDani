// src/app/tutorials/linked-lists/doubly-linked-list.js

const doublyLinkedList = {
    title: "Implementing a Doubly Linked List in C++",
    slug: "doubly-linked-list-cpp",
    excerpt: "Learn how to create and manipulate a doubly linked list data structure in C++.",
    description: "A practical guide to implementing a doubly linked list with bidirectional traversal capabilities in C++.",
    image: "https://www.geeksforgeeks.org/wp-content/uploads/gq/2014/03/DLL1.png",
    imagePath: "https://www.geeksforgeeks.org/wp-content/uploads/gq/2014/03/DLL1.png",
    publishedAt: "2024-03-22",
    date: "March 22, 2024",
    author: "Swayam Dani",
    readTime: "15 min read",
    difficulty: "Intermediate",
    category: "dsa",
    module: "Linked Lists",
    introduction: "A doubly linked list extends the concept of a singly linked list by adding a previous pointer to each node, allowing for bidirectional traversal. This tutorial will guide you through implementing a doubly linked list in C++, exploring its advantages over singly linked lists and demonstrating key operations.",
    prerequisites: [
      "Basic C++ programming knowledge",
      "Understanding of pointers and memory allocation",
      "Familiarity with singly linked lists"
    ],
    steps: [
      {
        title: "Understanding Doubly Linked Lists",
        content: "Let's first understand what makes doubly linked lists different from singly linked lists.",
        code: "/*\n * Doubly Linked List vs. Singly Linked List:\n *\n * Doubly Linked Lists:\n * - Each node contains data and TWO pointers (next and prev)\n * - Can traverse both forward and backward\n * - O(1) deletion when node pointer is known\n * - O(1) insertion before a known node\n *\n * Advantages:\n * - Bidirectional traversal\n * - O(1) deletion from any position with direct reference\n * - O(1) operations at both ends\n *\n * Trade-offs:\n * - Increased memory usage (extra pointer per node)\n * - More complex insertion/deletion logic\n */"
      },
      {
        title: "Defining the Node Structure",
        content: "First, let's define the Node structure that will hold our data and both previous and next pointers.",
        code: "// Node structure for a doubly linked list\nstruct Node {\n    int data;          // Data stored in the node\n    Node* next;        // Pointer to the next node\n    Node* prev;        // Pointer to the previous node\n    \n    // Constructor\n    Node(int value) : data(value), next(nullptr), prev(nullptr) {}\n};"
      },
      {
        title: "Creating the DoublyLinkedList Class",
        content: "Now, let's create a class to encapsulate the doubly linked list operations with head and tail pointers.",
        code: "class DoublyLinkedList {\nprivate:\n    Node* head;  // Pointer to the first node\n    Node* tail;  // Pointer to the last node\n    \npublic:\n    // Constructor\n    DoublyLinkedList() : head(nullptr), tail(nullptr) {}\n    \n    // Destructor to free memory\n    ~DoublyLinkedList() {\n        Node* current = head;\n        while (current != nullptr) {\n            Node* next = current->next;\n            delete current;\n            current = next;\n        }\n        head = nullptr;\n        tail = nullptr;\n    }\n    \n    // Methods for operations will go here\n};"
      },
      {
        title: "Implementing Insertion Operations",
        content: "Let's add methods to insert nodes at the beginning, end, and at a specific position.",
        code: "// Insert at the beginning - O(1)\nvoid insertAtBeginning(int value) {\n    Node* newNode = new Node(value);\n    \n    if (head == nullptr) {\n        // Empty list\n        head = newNode;\n        tail = newNode;\n    } else {\n        // Update links\n        newNode->next = head;\n        head->prev = newNode;\n        head = newNode;\n    }\n}\n\n// Insert at the end - O(1)\nvoid insertAtEnd(int value) {\n    Node* newNode = new Node(value);\n    \n    if (tail == nullptr) {\n        // Empty list\n        head = newNode;\n        tail = newNode;\n    } else {\n        // Update links\n        newNode->prev = tail;\n        tail->next = newNode;\n        tail = newNode;\n    }\n}\n\n// Insert at a specific position (0-based index) - O(n)\nbool insertAtPosition(int position, int value) {\n    // Handle special cases\n    if (position == 0) {\n        insertAtBeginning(value);\n        return true;\n    }\n    \n    // Traverse to the position\n    Node* current = head;\n    for (int i = 0; i < position && current != nullptr; i++) {\n        current = current->next;\n    }\n    \n    // If position is beyond the end, append to the end\n    if (current == nullptr && position > 0) {\n        insertAtEnd(value);\n        return true;\n    }\n    \n    // Insert before current node\n    Node* newNode = new Node(value);\n    newNode->next = current;\n    newNode->prev = current->prev;\n    current->prev->next = newNode;\n    current->prev = newNode;\n    \n    return true;\n}"
      },
      {
        title: "Implementing Deletion Operations",
        content: "Now let's implement methods to delete nodes from the beginning, end, and at a specific position.",
        code: "// Delete from the beginning - O(1)\nbool deleteFromBeginning() {\n    if (head == nullptr) {\n        return false; // Empty list\n    }\n    \n    Node* temp = head;\n    \n    // If only one node\n    if (head == tail) {\n        head = nullptr;\n        tail = nullptr;\n    } else {\n        head = head->next;\n        head->prev = nullptr;\n    }\n    \n    delete temp;\n    return true;\n}\n\n// Delete from the end - O(1)\nbool deleteFromEnd() {\n    if (tail == nullptr) {\n        return false; // Empty list\n    }\n    \n    Node* temp = tail;\n    \n    // If only one node\n    if (head == tail) {\n        head = nullptr;\n        tail = nullptr;\n    } else {\n        tail = tail->prev;\n        tail->next = nullptr;\n    }\n    \n    delete temp;\n    return true;\n}\n\n// Delete from a specific position (0-based index) - O(n)\nbool deleteFromPosition(int position) {\n    // If empty list\n    if (head == nullptr) {\n        return false;\n    }\n    \n    // If deleting first node\n    if (position == 0) {\n        return deleteFromBeginning();\n    }\n    \n    // Traverse to the node to delete\n    Node* current = head;\n    for (int i = 0; i < position && current != nullptr; i++) {\n        current = current->next;\n    }\n    \n    // If position is out of range\n    if (current == nullptr) {\n        return false;\n    }\n    \n    // If deleting last node\n    if (current == tail) {\n        return deleteFromEnd();\n    }\n    \n    // Delete the node in the middle\n    current->prev->next = current->next;\n    current->next->prev = current->prev;\n    delete current;\n    \n    return true;\n}"
      },
      {
        title: "Implementing Display and Search Operations",
        content: "Let's add methods to display the list in both directions and search for a value.",
        code: "// Display the list forward - O(n)\nvoid displayForward() {\n    if (head == nullptr) {\n        std::cout << \"List is empty\" << std::endl;\n        return;\n    }\n    \n    Node* current = head;\n    \n    while (current != nullptr) {\n        std::cout << current->data;\n        current = current->next;\n        \n        if (current != nullptr) {\n            std::cout << \" <-> \";\n        }\n    }\n    \n    std::cout << std::endl;\n}\n\n// Display the list backward - O(n)\nvoid displayBackward() {\n    if (tail == nullptr) {\n        std::cout << \"List is empty\" << std::endl;\n        return;\n    }\n    \n    Node* current = tail;\n    \n    while (current != nullptr) {\n        std::cout << current->data;\n        current = current->prev;\n        \n        if (current != nullptr) {\n            std::cout << \" <-> \";\n        }\n    }\n    \n    std::cout << std::endl;\n}\n\n// Search for a value - O(n)\nbool search(int value) {\n    Node* current = head;\n    \n    while (current != nullptr) {\n        if (current->data == value) {\n            return true;\n        }\n        current = current->next;\n    }\n    \n    return false;\n}"
      },
      {
        title: "Implementing Reverse and Count Operations",
        content: "Let's add a method to reverse the list and count the number of nodes.",
        code: "// Reverse the linked list - O(n)\nvoid reverse() {\n    if (head == nullptr || head == tail) {\n        return; // Empty list or single node\n    }\n    \n    Node* current = head;\n    Node* temp = nullptr;\n    \n    // Swap next and prev pointers for all nodes\n    while (current != nullptr) {\n        // Store next node\n        temp = current->next;\n        \n        // Swap pointers\n        current->next = current->prev;\n        current->prev = temp;\n        \n        // Move to the next node\n        current = temp;\n    }\n    \n    // Swap head and tail\n    temp = head;\n    head = tail;\n    tail = temp;\n}\n\n// Count the number of nodes - O(n)\nint count() {\n    int count = 0;\n    Node* current = head;\n    \n    while (current != nullptr) {\n        count++;\n        current = current->next;\n    }\n    \n    return count;\n}"
      }
    ],
    conclusion: "Congratulations! You've successfully implemented a doubly linked list in C++. This data structure is particularly useful when bidirectional traversal is needed or when frequent removals from both ends are required. The addition of a previous pointer makes operations like deletion more efficient but comes with the trade-off of increased memory usage and implementation complexity.",
    nextSteps: [
      "Try implementing additional operations like swapping nodes",
      "Convert your implementation to a template class for different data types",
      "Implement a circular doubly linked list",
      "Use this doubly linked list to build a deque (double-ended queue)"
    ],
    relatedTutorials: [
      {
        slug: "singly-linked-list-cpp",
        title: "Implementing a Singly Linked List in C++",
        excerpt: "Learn how to create and manipulate a singly linked list data structure in C++."
      },
      {
        slug: "circular-linked-list-cpp",
        title: "Implementing a Circular Linked List in C++",
        excerpt: "Learn how to create and manipulate a circular linked list data structure in C++."
      },
      {
        slug: "stacks-and-queues-cpp",
        title: "Implementing Stacks and Queues Using Linked Lists",
        excerpt: "Learn how to build stack and queue data structures with linked list implementations."
      }
    ]
  };
  
  export default doublyLinkedList;