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
    }

    prepend(value) {
        const oldHead = this.head;
        this.head = new Node(value); // Create and prepend the new node as the new head.
        this.head.nextNode = oldHead; // Move the old head to the next node.
        this.size++;
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
            return `Node not found at index = ${index}`;
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
        const lastNode = this.getTail().value; // Get value of the last node before it is removed.
        let beforeLastNode = this.head;

        try {
            while (beforeLastNode.nextNode.nextNode != null) { // If nextNode of nextNode is not null,
                beforeLastNode = beforeLastNode.nextNode; // Move to nextNode.
            }

            beforeLastNode.nextNode = null; // Once out of the loop, make nextNode of beforeLastNode null to cut the link to the last node.
        } catch (err) { // When the final node is removed (nothing left in the linked list),
            this.head = null;
        }
        
        this.size--;

        return `Popped "${lastNode}" from the list.`;
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
}

class Node {
    constructor(value = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
    }
}

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.prepend("hamster");

console.log(list.getSize());
console.log(list.getHead());
console.log(list.getTail());
console.log(list.at(4));
console.log(list.pop());
console.log(list.getSize());
console.log(list.getTail());
console.log(list.contains("parrot"));
console.log(list.find("cat"));
console.log(list.toString());
console.log(list.pop());
console.log(list.pop());
console.log(list.toString());
console.log(list.pop());
console.log(list.getSize());
console.log(list.toString());

list.append("snake");
console.log(list.getSize());
console.log(list.toString());