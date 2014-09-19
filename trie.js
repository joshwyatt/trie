// a re[trie]val Trie constructor. Each trie node will track how many words terminate with it
// and how prefixes extend from it.
var Trie = function(){
  this.words = 0;
  this.prefixes = 0;
  this.children = {};
};

// for each character in the string, create a new trie where necessary, and always increment number
// of prefixes at each position. At the end of the string, increment words for the final trie node.
Trie.prototype.insertWord = function(str, position){

  if( str.length === 0 ) return;

  var character, child;

  position = position || 0;

  if( position === str.length ){
    this.words++;
    return;
  }

  this.prefixes++;

  character = str[position];

  this.children[character] = this.children[character] || new Trie();
  child = this.children[character];
  child.insertWord(str, position + 1);

};

// for the given string, remove its path down the prefix tree, as well as its registry as a word
Trie.prototype.remove = function(str, position){

  if( str.length === 0 ) return;

  var k, child;

  position = position || 0;

  if( position == str.length ){
    this.words--;
    return;
  }

  this.prefixes--;
  k = str[position];
  child = this.children[k];
  child.remove(str, position + 1);

};

// remove oldString and replace it with newString
Trie.prototype.updateWord = function(oldWord, newWord){

  if( this === undefined || oldWord.length === 0 || newWord.length === 0 ) return;

  this.remove(oldWord);
  this.insertWord(newWord);
};

// count how many times a given string has been inserted into the trie
Trie.prototype.countInstancesOfWord = function(str, position){

  if( this === undefined ) return;
  if( str.length === 0 ) return 0;

  var character = 0;
  var character, child, count;

  position = position || 0;

  if( position === str.length ){
    return this.words;
  }

  character = str[position];
  child = this.children[character];

  if( child !== undefined ){
    count = child.countInstancesOfWord(str, position + 1);
  }
  return count;

};

// return how many prefixes extend off of a given string
Trie.prototype.countPrefixesAt = function(str, position){

  if( str.length == 0 ) return 0;

  var character = 0;
  var t, child, count;

  position = position || 0;

  if( position === str.length ){
    return this.prefixes;
  }

  k = str[position];
  child = this.children[k];

  if( child !== undefined ){
    count = child.countPrefix(str, position + 1);
  }

  return count;

};


// return whether a string exists as a word in the tri
Trie.prototype.isWordInTree = function(str){

  return str.length !== 0 && this.countInstancesOfWord(str) > 0;

};

// DEFINITELY FIX THIS ONE UP
Trie.prototype.getAllWords = function(str){

  if( this === undefined ) return [];

  var character = [];
  var k, child;

  str = str || '';

  if( this.words > 0 ){
    character.push(str);
  }

  for( k in this.children ){
    child = this.children[k];
    character = character.concat(child.getAllWords(str + k));
  }
  return character;

};

Trie.prototype.autoComplete = function(str, position){

  if( str.length === 0 ) return [];

  var k, child;

  position = position || 0;

  k = str[position];
  child = this.children[k];

  if( child === undefined ){
    return [];
  }

  if( position === str.length - 1){
    return child.getAllWords(str);
  }

  return child.autoComplete(str, position + 1);

};