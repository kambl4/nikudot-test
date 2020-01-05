<template lang="pug">
  b-row.p-0.m-0
    b-col(sm="4")
      b-card.sticky(border-variant="warning")
        b-card-title(style="color: gray;") הדבק כאן את הטקסט
        textarea(dir="rtl" v-model="message" v-autosize="message" placeholder="הטקסט" rows="4" autocomplete="off" spellcheck="true" @input="processText")
        b-button(variant="outline-warning" :disabled="finalWordsArray.length == 0" v-b-tooltip.hover.bottom="'העתק טקסט תוצאות'" @click="copyToClipboard")
          font-awesome-icon(:icon="['far', 'copy']")
        transition(name="slide-fade")
          div(v-show="hasText")
            hr
            div(v-if="isWordSelected")
              .text-center
                span.word(v-for="(letter, i) in selected.byLetters" v-text="letter" @click="processLetter(letter, i)" style="font-size: 2.5rem;" :style="{ 'color': i == selectedLetter.index ? 'green' : 'black' }")
              .d-flex.flex-wrap.justify-content-around.mt-2
                b-img.vowel-img(v-for="(v, i) in vowels" :key="i" :src="v.img" @click="insertVowel(v, i)" v-b-tooltip.hover.bottom="v.tooltip")
              hr
              .text-center(style="color: gray;" v-if="suggestions.length == 0") אין תוצאות מתאימות
              .d-flex.flex-wrap.justify-content-around(style="font-size: 1.5rem;" v-else)
                span.sug-word.m-1.p-1(v-for="(w, i) in suggestions" v-text="w" :key="i" @click="insertSuggestedWord(w, i)")
            .text-center(style="color: gray;" v-else) בחר מילה
            hr
            b-button(variant="outline-warning" :disabled="!isWordSelected" v-b-tooltip.hover.bottom="'להחיל אותו'" @click="applySame")
              font-awesome-icon(:icon="['fas', 'tasks']")
    b-col(sm="8")
      .text
        span.word(v-for="(w, i) in finalWordsArray" :key="i" v-text="w + ' '" @click="processWord(w, i)" :style="{ 'color': i == selected.index ? 'green' : 'black' }")
</template>

<script>
import db from '@/db-original.json';

export default {
  data () {
    return {
      db,
      message: '',
      selected: {},
      selectedLetter: {},
      // hasPunctuationRegExp: new RegExp(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+\s\n,\-.\/:;<=>?@\[\]^_`{|}~]/),
      ABRegExp: new RegExp(/(?=[אבגדהוזחטיכךלמםנןסעפףצץקרשת]|\b)/),
      vowels: [
        { text: '\u05bb', img: '/static/vowels/nikud_3.svg', tooltip: 'קובוץ' },
        { text: '\u05bc', img: '/static/vowels/nikud_4.svg', tooltip: 'דּגש, שוּרוק, מפיק' },
        { text: '\u05b9', img: '/static/vowels/nikud_5.svg', tooltip: 'חולם מלא' },
        { text: '\u05b8', img: '/static/vowels/nikud_6.svg', tooltip: 'קָמץ' },
        { text: '\u05b7', img: '/static/vowels/nikud_7.svg', tooltip: 'פַתח' },
        { text: '\u05b6', img: '/static/vowels/nikud_8.svg', tooltip: 'סֶגול' },
        { text: '\u05b5', img: '/static/vowels/nikud_9.svg', tooltip: 'צֵירי' },
        { text: '\u05b4', img: '/static/vowels/nikud_B.svg', tooltip: 'חִיריק' },
        { text: '\u05b3', img: '/static/vowels/nikud_C.svg', tooltip: 'חטף קֳמץ' },
        { text: '\u05b2', img: '/static/vowels/nikud_D.svg', tooltip: 'חטף פֲתח' },
        { text: '\u05b1', img: '/static/vowels/nikud_E.svg', tooltip: 'חטף סֱגול' },
        { text: '\u05b0', img: '/static/vowels/nikud_F.svg', tooltip: 'שְווא' },
        { text: 'clear', img: '/static/vowels/nikud_0.svg', tooltip: 'ברור' },
      ],
      dbKeys: Object.keys(db),
      suggestions: [],
      finalWordsArray: [],
      originalWord: '',
      sameWordsArray: []
    }
  },
  computed: {
    isWordSelected () {
      return Object.keys(this.selected).length > 0;
    },
    hasText () {
      return this.finalWordsArray.length > 0;
    },
    isLetterSelected () {
      return Object.keys(this.selectedLetter).length > 0;
    }
  },
  methods: {
    copyToClipboard () {
      let el = document.createElement('textarea');
      el.value = this.finalWordsArray.join('');
      el.setAttribute('readonly', '');
      el.style = {position: 'absolute', left: '-9999px'};
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    },
    filterVowels (word) {
      return word.replace(/[\u0591-\u05C7]/g, '').trim();
    },
    processText () {
      let splittedMessage = this.message.split(/(?=[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+\s\n,\-.\/:;<=>?@\[\]^_`{|}~]|\b)/);
      
      this.suggestions = [];
      this.finalWordsArray = [];
      splittedMessage.forEach((word, i) => {
        if (/\n/.test(word)) this.finalWordsArray.push('\n');
        this.finalWordsArray.push(word.trim());
      });
      
      this.finalWordsArray.forEach((word, i) => {
        this.dbKeys.forEach(key => {
          if (word == key) {
            this.finalWordsArray.splice(i, 1, this.db[key][0]);
          }
        });
      });
    },
    processWord (word, index) {
      this.originalWord = word;
      let consonants = this.filterVowels(word);
      let byLetters = word.split(this.ABRegExp);
      
      this.selected = { word, index, byLetters };
      this.suggestions = [];
      this.dbKeys.forEach(key => {
        if (consonants == key) {
          this.suggestions = this.db[key];
        }
      });
    },
    processLetter (letter, index) {
      this.selectedLetter = { letter, index };
    },
    insertSuggestedWord (word, index) {
      this.selected.word = word;
      this.selected.byLetters = word.split(this.ABRegExp);
      this.selectedLetter = {};
      this.finalWordsArray.splice(this.selected.index, 1, word);
    },
    insertVowel (vowel, index) {
      if (this.isLetterSelected || vowel.text == 'clear' ) {
        if (vowel.text == 'clear') {
          this.selected.word = this.filterVowels(this.selected.word);
          this.selected.byLetters = this.selected.word.split(this.ABRegExp);
          this.insertSuggestedWord(this.selected.word, this.selected.index);
        } else {
          let splittedWord = this.selected.byLetters;
          
          this.selectedLetter.letter = this.filterVowels(this.selectedLetter.letter) + vowel.text;
          
          this.selected.byLetters[this.selectedLetter.index] = this.selectedLetter.letter;
          this.selected.word = splittedWord.join('');
          this.insertSuggestedWord(splittedWord.join(''), this.selected.index);
        }
      } else {
        this.$swal({
          toast: true,
          position: 'top',
          showConfirmButton: false, 
          timer: 3000, 
          type: 'info', 
          title: 'בחר אות'
        });
      }
    },
    applySame () {
      this.finalWordsArray.forEach((word, index) => {
        if (word == this.originalWord) {
          this.finalWordsArray[index] = this.selected.word;
        }
      });
      this.originalWord = this.selected.word;
      this.selectedLetter = {};
    }
  }
}
</script>

<style scoped>
.text {
  white-space: pre-wrap;
}
.vowel-img {
  height: 30px;
  width: 20px;
  cursor: pointer;
}
.word {
  cursor: pointer;
  font-size: 2rem;
  font-weight: 100;
}
.word:hover {
  font-weight: bold;
}
.sug-word {
  cursor: pointer;
  font-size: 2rem;
  font-weight: 100;
  border: 1px solid #F8C133;
}
textarea {
  width: 100%;
  border-radius: 4px;
  border-color: #edeef0;
  max-height: 100px;
}
textarea:focus {
  outline: none;
  border-color: #F8C133;
}
.form-control:focus {
  box-shadow: none;
  outline: none;
}
.sticky {
  position: -webkit-sticky;
	position: sticky;
	top: 55px;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  opacity: 0;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>