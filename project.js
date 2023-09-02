const studentsDiv = document.getElementById('students');
const calculateButton = document.getElementById('calculateButton');
const resultsDiv = document.getElementById('resultDiv')//create a div for results

const subjects =[
    {name: "Math" },
    {name: "Science" },
    {name: "History" },
    {name: "English" },
    {name: "Physics" },
    {name: "Art" }
];

function createStudentInput(studentNumber) {
    const studentDiv = document.createElement('div');
    studentDiv.className="student-card"
    studentDiv.innerHTML = `
    <img src="https://png.pngtree.com/background/20230426/original/pngtree-young-professional-asian-college-man-with-glasses-picture-image_2489385.jpg" alt="student" class="student-img">
    <h3>Student ${studentNumber}</h3>
    <label for="name${studentNumber}">Name:</label>
    <input type="text" id="name${studentNumber}">
    <div id="subject${studentNumber}"></div>
    `;
    return studentDiv
}

function createSubjectInput(subject, studentNumber) {
    const subjectDiv = document.createElement('div');
    subjectDiv.innerHTML = `
    <label for="${subject.name}">${subject.name} Grade:</label>
    <input type="number" id="${subject.name}${studentNumber}" min="0" max="100">
    
    `;
    return subjectDiv;
    
    
}

function calculateAverages(){
    resultsDiv.innerHTML = ''; //clear previous results

    const numStudents = studentsDiv.childElementCount;

    for (let i = 1; i <= numStudents; i++){
        const studentName = document.getElementById(`name${i}`).value;

        const averageGrade = calculateAverageGrade(i);
        resultsDiv.innerHTML += `<p>Average grade for ${studentName}: ${averageGrade.toFixed(2)} %<p> <br>`;
        console.log(averageGrade)
        resultsDiv.focus()
    }
}

function calculateAverageGrade(studentNumber) {
    const subjectScores = subjects.map(subject => {
        const gradeInput = document.getElementById(`${subject.name}${studentNumber}`);
        return parseInt(gradeInput.value);
        });

        const totalSubjectScore = subjectScores.reduce((total, score) => total + score, 0);
        return totalSubjectScore / subjects.length;
}

//create input fields for 3 students and their subjects
for (let i = 1; i<= 3; i++){
    const studentDiv = createStudentInput(i);
    subjects.forEach(subject => {
        studentDiv.querySelector(`#subject${i}`).appendChild(createSubjectInput(subject, i));

    });
    studentsDiv.appendChild(studentDiv);
}

calculateButton.addEventListener('click', calculateAverages);
