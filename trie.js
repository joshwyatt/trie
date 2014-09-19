var Trie = function(){
  this.words = 0;
  this.prefixes = 0;
  this.children = {};
};

Trie.prototype.insert = function(str, position){

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
  child.insert(str, position + 1);

};

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

Trie.prototype.updateWord = function(oldString, newString){

  if( this === undefined || oldString.length === 0 || newString.length === 0 ) return;

  this.remove(oldString);
  this.insert(newString);
};

Trie.prototype.countInstancesOfWord = function(str, position){

  if( this === undefined ) return;
  if( str.length === 0 ) return 0;

  var character = 0;
  var character, child;

  position = position || 0;

  if( position === str.length ){
    return this.words;
  }

  character = str[position];
  child = this.children[character];

  if( child !== undefined ){
    character = child.countInstancesOfWord(str, position + 1);
  }
  return character;

};

Trie.prototype.countPrefixesAt = function(str, position){

  if( str.length == 0 ) return 0;

  var character = 0;
  var t, child;

  position = position || 0;

  if( position === str.length ){
    return this.prefixes;
  }

  k = str[position];
  child = this.children[k];

  if( child !== undefined ){
    character = child.countPrefix(str, position + 1);
  }

  return character;

};


Trie.prototype.isStringInTree = function(str){

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