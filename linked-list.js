class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    append(value) {
        if (!this.head) {
            this.head = new Node(value);
        } else {
            let currNode = this.head;

            while (currNode.nextNode != null) {
                currNode = currNode.nextNode;
            }

            currNode.nextNode = new Node(value);
        }

        this.size++;
    }

    prepend(value) {
        const oldHead = this.head;
        this.head = new Node(value);
        this.head.nextNode = oldHead;
        this.size++;
    }

    getSize() {
        return this.size;
    }

    getHead() {    
        return new Node(this.head.value, this.head.nextNode.value);
    }

    getTail() {
        let lastNode = this.head;
        
        while (lastNode.nextNode != null) {
            lastNode = lastNode.nextNode;
        }

        return lastNode;
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
console.log(list.getSize());