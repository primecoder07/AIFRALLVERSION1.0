async function uploadResume() {
  const fileInput = document.getElementById("resumeInput");
  const file = fileInput.files[0];

  let formData = new FormData();
  formData.append("resume", file);

  const res = await fetch("http://localhost:5000/analyze", {
    method: "POST",
    body: formData
  });

  const data = await res.json();

  displayQuestions(data.questions);
}

function displayQuestions(questions) {
  let html = "<h2>Answer these:</h2>";

  questions.forEach((q, i) => {
    html += `
      <p>${q}</p>
      <input type="text" id="q${i}" />
    `;
  });

  html += `<button onclick="submitAnswers()">Submit</button>`;

  document.getElementById("questions").innerHTML = html;
}

async function submitAnswers() {
  let answers = [];

  for (let i = 0; i < 15; i++) {
    answers.push(document.getElementById(`q${i}`).value);
  }

  const res = await fetch("http://localhost:5000/result", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ answers })
  });

  const data = await res.json();

  document.getElementById("result").innerHTML = `
    <h2>SWOT Analysis</h2>
    <pre>${data.swot}</pre>

    <h2>Career Recommendations</h2>
    <ul>
      ${data.careers.map(c => `<li>${c}</li>`).join("")}
    </ul>
  `;
}
