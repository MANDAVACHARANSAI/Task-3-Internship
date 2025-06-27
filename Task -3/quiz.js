const quiz = [
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style System",
      "Colorful Style Sheets"
    ],
    answer: 0
  },
  {
    question: "Which HTML element is used to link CSS files?",
    options: ["<script>", "<link>", "<style>", "<css>"],
    answer: 1
  },
  {
    question: "Which property changes text color in CSS?",
    options: ["font-color", "color", "text-color", "background-color"],
    answer: 1
  }
];

let current = 0;
let score = 0;
const wrongs = [];

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const resultEl = document.getElementById('result');
const nextBtn = document.getElementById('next-btn');
const wrongEl = document.getElementById('wrong-answers');

function loadQuestion() {
  const q = quiz[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';
  nextBtn.style.display = 'none';
  wrongEl.innerHTML = '';

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => selectOption(i);
    optionsEl.appendChild(btn);
  });
}

function selectOption(index) {
  const q = quiz[current];
  const btns = optionsEl.querySelectorAll('button');
  btns.forEach(b => b.disabled = true);
  if (index === q.answer) {
    score++;
  } else {
    wrongs.push(`❌ Q${current + 1}: Correct is "${q.options[q.answer]}"`);
  }
  nextBtn.style.display = 'inline-block';
}

function loadNext() {
  current++;
  if (current < quiz.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionEl.textContent = "🎉 Quiz Completed!";
  optionsEl.innerHTML = '';
  nextBtn.style.display = 'none';
  resultEl.textContent = `Your score: ${score} / ${quiz.length}`;

  // Show wrong answers
  if (wrongs.length > 0) {
    wrongEl.innerHTML = "<br><strong>Review:</strong><br>" + wrongs.join("<br>");
  }

  // 🎊 Confetti blast from both corners
  confetti({
    particleCount: 100,
    angle: 60,
    spread: 55,
    origin: { x: 0 }
  });
  confetti({
    particleCount: 100,
    angle: 120,
    spread: 55,
    origin: { x: 1 }
  });
}


loadQuestion();
