class MarkovMachine {

    /** build markov machine; read in text.*/
  
    constructor(text) {
      let words = text.split(/[ \r\n]+/);
      this.words = words.filter(c => c !== "");
      this.makeChains();
    }
  
    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
  
    makeChains() {
        let wordList = [];
        let markovChains = {};
        for (let i = 0; i < this.words.length; i++){
            if (wordList.includes(this.words[i]) == false){
                wordList.push(this.words[i])
            }
        }
        for (let j = 0; j < wordList.length; j++){
            let word = wordList[j];
            for (let k = 0; k <this.words.length; k++){
                if (word == this.words[k]){
                    if (this.words[k+1]){
                        if (markovChains[word]){
                            markovChains[word].push(this.words[k+1])
                        } else {
                            markovChains[word] = [];
                            markovChains[word].push(this.words[k+1]);
                        }
                    } else{
                        markovChains[word] = [];
                        markovChains[word].push(null);
                    }
                }
            }
        }
        this.chains = markovChains;
    }
    
    static choice(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
  
  
    /** return random text from chains */
  
    makeText(numWords = 100) {
      // TODO
      let producedText = [];
      let keys = [];
      for (let key in this.chains){
          keys.push(key)
      }
      let start = MarkovMachine.choice(keys);
      while (producedText.length < numWords && start != null){
          producedText.push(start);
          start = MarkovMachine.choice(this.chains[start])
      }
      return producedText.join(" ")
    }

  }

  module.exports = {
    MarkovMachine,
  };