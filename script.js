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
            qtype:'Food',
            type: 'text',

            answer: "",
            correct_answer: 1,
            selected: null,
            sense: 0
            },
            {

            question: 'What is your Favourite Soccer team?',
            type: 'text',
            qtype:'Soccer Team',
            answer: "",
            correct_answer: 1,
            selected: null,
            sense: 0
            },
            {
            question: 'What is your Favourite Sport?',
            type: 'dropdown',
            answer: "",
            correct_answer: 1,
            selected: null,
            sense: 0
            },
            
        ],
      temp: [],
      currentQuestion: 0,
      answered: 0,
      userdata:[],
      lala:[],
      test:['pasta'],
      //Youtube Data API Related Vars
      videos: [],
      reformattedSearchString: '',
      api: {
        baseUrl: 'https://www.googleapis.com/youtube/v3/search?',
        part: 'snippet',
        type: 'video',
        order: 'viewCount',
        maxResults: 12,
        q: '',
        key: 'AIzaSyDjJHANU3Tmj9JRim29JgbVIC-veStWjcg',
        prevPageToken: '',
        nextPageToken: ''
      },
    }
  },
  created() {
    window.handler = this;
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
      this.userdata.push( this.questions[this.currentQuestion].answer);
      console.log(this.userdata);
      nextBtn.removeAttribute('disabled');
      
    },
    //Get Data with Axios
    getData(apiUrl) {
      axios
        .get(apiUrl)
        .then(res => {
          this.videos = res.data.items;
          this.api.prevPageToken = res.data.prevPageToken;
          this.api.nextPageToken = res.data.nextPageToken;
        })
        .catch(error => console.log(error));
    },
    //Youtube Search
    search(searchParams) {
      this.reformattedSearchString = searchParams.join(' ');
      this.api.q = searchParams.join('+');
      const { baseUrl, part, type, order, maxResults, q, key } = this.api;
      const apiUrl = `${baseUrl}part=${part}&type=${type}&order=${order}&q=${q}&maxResults=${maxResults}&key=${key}`;
      this.getData(apiUrl);
    },
    parseSearchString(food) {
      // Trim search string
      const trimmedSearchString = food.trim();
      if (trimmedSearchString !== '') {
        // Split search string
        const searchParams = trimmedSearchString.split(/\s+/);
        // Emit event
        this.$emit('search', searchParams);
      }
      
    },
    randomvideo(){
        return 
    }
  },
  mounted() {
    
    var nextBtn = this.$el.querySelector('.next-btn'),
        answers = this.$el.querySelectorAll('.answers span'),
        questionsLength = this.questions.length,
        result = this.$el.querySelector('.result'),
        question = this.$el.querySelector('.question'),
        closeResult = this.$el.querySelector('.result button.close'),
        redoBtn = this.$el.querySelector('.result button.redo')

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
            
            question.sense = 1;
            let temp = {};
            temp.answers = question.answers;
            temp.question = question.question;
            temp.correct_answer = question.correct_answer;
            temp.selected = question.selected;
          }
        });
        
        result.classList.add('active');
        question.classList.add('blur');
      }
    });
    
    redoBtn.addEventListener('click', () => {
      result.classList.remove('active');
      question.classList.remove('blur');
      location.reload();
    });
    closeResult.addEventListener('click', () => {
      result.classList.remove('active');
      question.classList.remove('blur');
    });
  }
});