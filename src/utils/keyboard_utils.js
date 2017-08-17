export const MAPPED_KEYS = [
  'a', 'w', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j', 'k', 'o', 'l'
]

export const noteFrequency = (octave = 4) => {
  const f = 440
  const a = Math.pow(2, 1 / 12)
  const n = octave * 12
  return f * Math.pow(a, n)
}

export const frequencyFromNoteNumber = note => {
  return 440 * Math.pow(2, (note - 69) / 12)
}

export class DoublyLinkedListNode {
  constructor (data) {
    this.data = data
    this.next = null
    this.last = null
  }
}

export class DoublyLinkedList {
  constructor () {
    this.length = 0
    this.head = null
    this.tail = null
  }

  add (data) {
    const newNode = new DoublyLinkedListNode(data)
    let noteAdded = false
    if (this.length === 0) {
      this.head = newNode
      this.tail = newNode
      noteAdded = true
    } else {
      if (this.findIndexByNoteNumber(data.note) === -1) { // check that the note doesn't already exist
        this.tail.next = newNode
        newNode.prev = this.tail
        this.tail = newNode
        noteAdded = true
      }
    }

    if (noteAdded) {
      this.length++
    }
  }

  remove (index) {
    if (index > -1 && index < this.length) {
      let current = this.head

      if (index === 0) {
        this.head = this.head.next

        if (!this.head) {
          this.tail = null
        } else {
          this.head.prev = null
        }
      } else if (index === this.length - 1) {
        this.tail = this.tail.prev
        this.tail.next = null
      } else {
        for (let i = 0; i < index; i++) {
          current = current.next
        }
        current.prev.next = current.next
        current.next.prev = current.prev
      }
      this.length--

      return current.data
    } else {
      return null
    }
  }

  findIndexByNoteNumber (noteNumber) {
    if (this.length === 0) {
      return -1
    } else {
      let currentNode = this.head
      let index = 0

      while (index < this.length) {
        if (currentNode.data.note === noteNumber) {
          return index
        }
        currentNode = currentNode.next
        index++
      }
      return -1
    }
  }
}
