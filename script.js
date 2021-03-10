//TODO show Wrong questions after the result
//you'll need to reset the currentQuestion to 0
//TODO hide the status span at the top of body while displaying wrong questions
//TODO edit the result div if it below 50%
//TODO change the text of the next-btn to Result!

new Vue({ 
  el: '#quiz-app',
  data() {
    return {
      questions: [
            {
            question: 'What is your Favourite Food?',
            answers: [
                'Apple',
                'Bannaana',
                'Orange',
                'Kiwi'
            ],
            correct_answer: 0,
            selected: null,
            sense: 0
            },
            {

            question: 'What is your Favourite Soccer team?',
            answers: [
                'Barca',
                'Hapoel',
                'Maccabi',
                'Ashdod team'
            ],
            correct_answer: 2,
            selected: null,
            sense: 0
            },
            {
            question: 'What is your Favourite Sport?',
            answers: [
                'Football',
                'Basketball',
                'Baseball',
                'Basethebase'
            ],
            correct_answer: 1,
            selected: null,
            sense: 0
            },
            
        ],
      showWrongQuestion: false,
      wrongQuestions: [],
      temp: [],
      currentQuestion: 0,
      answered: 0,
      wrongAnswers: 0,
      correctAnswers: 0,
      food: '',
      soccerteam: '',
      sport: '',
    }
  },
  methods: {
    selectAnswer: function(e) {
      var choise = e.currentTarget,
          answers = document.querySelectorAll('.answers span'),
          nextBtn = document.querySelector('.next-btn');
      
      answers.forEach(answer => {
        answer.classList.contains('selected') ? answer.classList.remove('selected') : '';
      });
      
      choise.classList.add('selected');
      
      this.questions[this.currentQuestion].selected = choise.dataset.index; // add the selected index to the obj in the 'selected' property
      
      nextBtn.removeAttribute('disabled');
      
    },
  },
  mounted() {
    
    var nextBtn = this.$el.querySelector('.next-btn'),
        wrongAnswersBtn = this.$el.querySelector('.show-wrong-ones'),
        answers = this.$el.querySelectorAll('.answers span'),
        questionsLength = this.questions.length,
        result = this.$el.querySelector('.result'),
        question = this.$el.querySelector('.question'),
        closeResult = this.$el.querySelector('.result button.close'),
        wrongQuestions = this.$el.querySelector('.wrong-questions'),
        showMyResults = this.$el.querySelector('#return-to-result');
          
    nextBtn.addEventListener('click', () => {
      
      this.answered < this.questions.length ? this.answered++ : '';
      
      if(!nextBtn.hasAttribute('disabled') && this.currentQuestion < (questionsLength -1)) {    
        this.currentQuestion++;
        
        answers.forEach(answer => {
          answer.classList.contains('selected') ? answer.classList.remove('selected') : '';
        });
        
        nextBtn.setAttribute('disabled', '');
        
      } else if(this.currentQuestion >= (questionsLength -1)) {
        
        this.questions.forEach( (question) => {
          if(question.selected == question.correct_answer && question.sense ==0) {
            
            this.correctAnswers++;
            question.sense = 1;
            
          } else if(question.selected != question.correct_answer && question.sense ==0) {
            
            this.wrongAnswers++;
            question.sense = 1;
            let temp = {};
            temp.answers = question.answers;
            temp.question = question.question;
            temp.correct_answer = question.correct_answer;
            temp.selected = question.selected;
            
            this.wrongQuestions.push(temp);
          }
        });
        
        result.classList.add('active');
        question.classList.add('blur');
      }
    });
    
    closeResult.addEventListener('click', () => {
      result.classList.remove('active');
      question.classList.remove('blur');
    });
    
    wrongAnswersBtn.addEventListener('click', () => {      
      result.classList.remove('active');
      wrongQuestions.classList.add('active');
    });
    
    showMyResults.addEventListener('click', () => {
      result.classList.add('active');
      wrongQuestions.classList.remove('active');
    })
  }
});