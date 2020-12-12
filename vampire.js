class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) ? true : false
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    //Checks if "this" and the vampire are the same
    if (this.name === vampire.name) {
      return this;
    }
    //Checks if "this" or the vampire are a root node
    if (!this.creator || !vampire.creator) {
      return this.isMoreSeniorThan(vampire) ? this : vampire
    }
    //Checks if a direct ancestor is used
    if (this.creator.name === vampire.name || vampire.creator.name === this.name) {
      return this.isMoreSeniorThan(vampire) ? this : vampire
    }
    //For all other cases
    let currentVampire = this;
    const currentVampireParents = [];

    while (currentVampire.creator) {                      //get all "this" vampires parents           
      currentVampireParents.push(currentVampire.creator);
      currentVampire = currentVampire.creator
    };

    while (vampire.creator) {                             //Check each vampire's parents against the other's parents
      if (currentVampireParents.includes(vampire.creator)) {
        return vampire.creator
      }
      vampire = vampire.creator;
    }

    return vampire;
  }
};

module.exports = Vampire;