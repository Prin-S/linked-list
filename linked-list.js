class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    append(value) {
        if (!this.head) { // When the first node is appended,
            this.head = new Node(value);
        } else {
            let currNode = this.head; // Start with the first node.

            while (currNode.nextNode != null) { // While nextNode of currNode still points to another node,
                currNode = currNode.nextNode; // Move to nextNode.
            }

            currNode.nextNode = new Node(value); // Once the last node is reached, create and append the new node to nextNode of currNode.
        }

        this.size++;

        return `Added "${value}" to the end of the linked list.`;
    }

    prepend(value) {
        const oldHead = this.head;
        this.head = new Node(value); // Create and prepend the new node as the new head.
        this.head.nextNode = oldHead; // Move the old head to the next node.
        this.size++;

        return `Added "${value}" to the start of the linked list.`;
    }

    getSize() {
        return this.size;
    }

    getHead() {    
        return new Node(this.head.value, this.head.nextNode.value); // This is so that only value is shown for nextNode.
    }

    getTail() {
        let lastNode = this.head;
        
        while (lastNode.nextNode != null) { // While nextNode of lastNode still points to another node,
            lastNode = lastNode.nextNode; // Keep on assigning nextNode as lastNode.
        }

        return lastNode;
    }

    at(index) {
        if (index >= this.size) {
            return `No node is found at index ${index}.`;
        } else if (index == this.size - 1) { // Return the last node.
            return this.getTail();
        } else { // Return other nodes.
            let selectedNode = this.head;

            for (let i = 0; i < index; i++) {
                selectedNode = selectedNode.nextNode;
            }

            return new Node(selectedNode.value, selectedNode.nextNode.value);
        }
    }

    pop() {
        try {
            const lastNode = this.getTail().value; // Get value of the last node before it is removed.
            let beforeLastNode = this.head;

            if (this.getSize() == 1) { // Skip the while loop when there is only one node left because there is no beforeLastNode.nextNode.nextNode (only beforeLastNode.nextNode).
                this.head = null; // Remove the last node from the linked list.
            } else {
                while (beforeLastNode.nextNode.nextNode != null) { // If nextNode of nextNode is not null,
                    beforeLastNode = beforeLastNode.nextNode; // Move to nextNode.
                }
    
                beforeLastNode.nextNode = null; // Once out of the loop, make nextNode of beforeLastNode null to cut the link to the last node.
            }

            this.size--;
            
            return `Popped "${lastNode}" from the linked list.`;
        } catch (err) { // When the final node is removed (nothing left in the linked list),
            return 'The linked list is empty.';
        }
    }

    contains(value) {
        let selectedNode = this.head;
        
        if (selectedNode.value == value) { // If the first node equals value,
            return true;
        }

        while (selectedNode.nextNode != null) { // Loop the subsequent nodes.
            selectedNode = selectedNode.nextNode;

            if (selectedNode.value == value) { // If any of the subsequent nodes equals value,
                return true;
            }
        }

        return false; // If no match is found,
    }

    find(value) {
        let counter = 0;
        let selectedNode = this.head;
        
        if (selectedNode.value == value) { // If the first node equals value,
            return counter;
        }

        while (selectedNode.nextNode != null) { // Loop the subsequent nodes.
            counter++;
            selectedNode = selectedNode.nextNode;

            if (selectedNode.value == value) { // If any of the subsequent nodes equals value,
                return counter;
            }
        }

        return null; // If no match is found,
    }

    toString() {
        let string = '';
        let currNode = this.head;

        if (currNode == null) { // If the first node is null (nothing in the linked list),
            return 'The linked list is empty.';
        } else {
            string += `( ${currNode.value} ) -> `;
        }

        while (currNode.nextNode != null) { // While nextNode of currNode still points to another node,
            currNode = currNode.nextNode; // Move to nextNode.
            string += `( ${currNode.value} ) -> `;
        }

        return string + 'null'; // Append null at the end.
    }

    insertAt(value, index) {
        try {
            if (index == 0) { // Insert at the start.
                this.prepend(value);
            } else if (index == this.size) { // Insert at the end.
                this.append(value);
            } else {
                let counter = 0;
                let currNode = this.head;
    
                while (counter < index - 1) { // index - 1 is used because we want value to be inserted at index, rather than after it.
                    counter++;
                    currNode = currNode.nextNode; // Move to nextNode.
                }

                // Once index - 1 is reached, create and append the new node to nextNode of currNode.
                // The new node points to currNode.nextNode (before it is reassigned) which contains all the remaining nodes in the linked list.
                currNode.nextNode = new Node(value, currNode.nextNode);
            }

            this.size++;

            return `"${value}" inserted at index ${index}.`;
        } catch (err) {
            return 'Index is not found.';
        }
    }

    removeAt(index) {
        try {
            let removedNode;

            if (index == 0) { // Remove the first node.
                removedNode = this.getHead().value;
                this.head = new Node(this.head.nextNode.value, this.head.nextNode.nextNode); // Replace value and nextNode of this.head with nextNode.value and nextNode.nextNode, respectively.
            } else if (index == this.size) { // Remove the last node.
                removedNode = this.getTail().value;
                this.pop();
            } else {
                let counter = 0;
                let currNode = this.head;

                while (counter < index - 1) { // index - 1 is used because we want the node to be removed at index, rather than after it.
                    counter++;
                    currNode = currNode.nextNode; // Move to nextNode.
                }

                removedNode = currNode.nextNode.value;

                // Once index - 1 is reached, create and append the new node to nextNode of currNode.
                // The new node skips currNode.nextNode.value (currNode.nextNode.nextNode.value is used instead)
                // and points to currNode.nextNode.nextNode.nextNode which contains all the remaining nodes in the linked list.            
                currNode.nextNode = new Node(currNode.nextNode.nextNode.value, currNode.nextNode.nextNode.nextNode);
            }
            
            this.size--;

            return `Removed "${removedNode}" from the linked list.`;
        } catch (err) {
            return 'Index is not found.';
        }
    }
}

class Node {
    constructor(value = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
    }
}

const list = new LinkedList();

console.log(list.append("dog"));
console.log(list.append("cat"));
console.log(list.append("parrot"));
console.log(list.prepend("hamster"));

console.log(list.getSize());
console.log(list.getHead());
console.log(list.getTail());
console.log(list.at(4));
console.log(list.pop());
console.log(list.getSize());
console.log(list.toString());
console.log(list.getTail());
console.log(list.contains("parrot"));
console.log(list.find("cat"));
console.log(list.toString());

console.log(list.append("snake"));
console.log(list.getSize());
console.log(list.toString());

console.log(list.insertAt("turtle", 3));
console.log(list.getSize());
console.log(list.getHead());
console.log(list.getTail());
console.log(list.toString());

console.log(list.removeAt(4));
console.log(list.removeAt(0));
console.log(list.toString());
console.log(list.removeAt(2));
console.log(list.toString());

console.log(list.pop());
console.log(list.toString());
console.log(list.pop());
console.log(list.toString());
console.log(list.pop());
console.log(list.toString());
console.log(list.pop());
console.log(list.getSize());
console.log(list.toString());