
// TODO: Ubah menjadi suatu slice
class Event {
    organizer = ""
    name = ""
    dateStart
    dateEnd
    // ...Miliseconds?
    location = ""
    description = ""
    tags = []
    tickets = []

    /**
     * @constructor 
     * @param {Ticket[]} tickets
     */
    constructor(organizer, name, location, dateStart, dateEnd, description, tags, tickets){
        this.organizer = organizer
        this.name = name
        this.location = location
        this.description = description
        this.tags = tags
        this.tickets = tickets
        this.dateStart = dateStart
        this.dateEnd = dateEnd
    }

    /**
     * @returns 1 jika akan terjadi, 0 jika sedang terjadi, -1 jika telah terjadi
     */
    get timeState(){
        const now = Date.now()
        if (now > this.dateEnd.getTime()) {
            return -1
        }
        if (now > this.dateStart.getTime()){
            return 0
        }
        return 1
    }

    get isHappening(){
        return (this.timeState === 0)
    }
}


class Ticket {
    name = ""
    description = ""
    cost = 0
    discounts

    /**
     * @constructor 
     * @param {Discount[]} discounts
     */
    constructor(name, description, cost, discounts) {
        this.name = name
        this.description = description
        this.cost = cost
        this.discounts = discounts
    }

    /**
     * @returns Array yang berisi semua diskon yang berharga kurang dari harga asli tiketnya.
     */
    get effectiveDiscounts(){
        let result = []
        for (let n of this.discounts){
            if (n.newCost < this.cost){
                result.push(n)
            }
        }
        return result
    }

    /**
     * @returns Array yang berisi semua diskon yang berharga sama atau lebih dari harga asli tiketnya.
     */
    get uselessDiscounts(){
        let result = []
        for (let n of this.discounts){
            if (n.newCost >= this.cost){
                result.push(n)
            }
        }
        return result
    }

    /**
     * @returns Objek {cost: (Harga hasil terendah), discounts: (Semua diskon yang berisi harga terendah tersebut)}. 
     */
    get mostEffectiveDiscounts(){
        let min = this.cost
        let result = []
        for (let n of this.discounts){
            if (n.canUse){
                if(n.newCost < min){
                    result = [n]
                    min = n.newCost
                } else if (n.newCost == min){
                    result.push(n)
                }
            }
        }
        return {
            cost: min,
            discounts: result
        }
    }
}

class Discount {
    name = ""
    newCost = 0
    #apply
    description = ""

    /**
     * @constructor
     * @param {() => boolean} callback Fungsi yang akan mengembalikan bahwa diskon ini bisa dipakai atau tidak.
     */
    constructor(name, newCost, callback){
        this.name = name
        this.newCost = newCost
        this.#apply = callback
    }

    get canUse(){
        return this.#apply()
    }


}


export {Event as ObjEvent, Ticket, Discount}