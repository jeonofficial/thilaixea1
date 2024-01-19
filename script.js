function startExam() {
    document.getElementById('examSection').style.display = 'block';
    document.getElementById('resultSection').style.display = 'none';
    document.getElementById('name').disabled = true;
    document.getElementById('idNumber').disabled = true;
    document.querySelector('button[onclick="startExam()"]').style.display = 'none';
    document.querySelector('button[onclick="resetExam()"]').style.display = 'block';
}

function submitExam() {
    // Đối tượng chứa câu trả lời đúng cho mỗi câu hỏi
    const correctAnswers = {
        answer1: "b",
        answer2: "b",
        answer3: "a",
        answer4: "c",
        answer5: "c",
        answer6: "c",
        answer7: "b",
        answer8: "c",
        answer9: "c",
        answer10: "a"
    };

    // Biến đếm số câu trả lời đúng
    let correctCount = 0;

    // Biến kiểm tra xem người dùng đã chọn đủ số câu hay chưa
    let allQuestionsAnswered = true;

    // Lặp qua từng câu hỏi
    for (let i = 1; i <= 10; i++) {
        // Lấy giá trị của câu trả lời người dùng
        const userAnswer = document.querySelector(`input[name="answer${i}"]:checked`);

        // Kiểm tra xem người dùng đã chọn câu trả lời chưa
        if (userAnswer) {
            // So sánh câu trả lời người dùng với câu trả lời đúng
            if (userAnswer.value === correctAnswers[`answer${i}`]) {
                correctCount++;
            }
        } else {
            // Nếu có câu hỏi nào chưa được chọn, đặt biến kiểm tra là false
            allQuestionsAnswered = false;
        }
    }


    var resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = '<h3>Đáp Án:</h3>';

    var questions = document.querySelectorAll('.question');
    questions.forEach(function (question, index) {
        var questionText = question.querySelector('.question-text').textContent;
        var selectedAnswer = getSelectedAnswer('answer' + (index + 1));

        resultContainer.innerHTML += '<p><strong>' + questionText + '</strong></p>';
        resultContainer.innerHTML += '<p>Câu trả lời của bạn: ' + selectedAnswer + '</p>';
    });

    document.getElementById('examSection').style.display = 'none';
    document.getElementById('resultSection').style.display = 'block';

    // Kiểm tra xem tất cả câu hỏi đã được chọn chưa
    if (allQuestionsAnswered) {
        // Tính điểm số
        const totalQuestions = 10;
        const score = (correctCount / totalQuestions) * 100;

        // Hiển thị kết quả và điểm số
        const resultMessage = document.getElementById("resultMessage");
        resultMessage.innerHTML = `Số câu đúng: ${correctCount} / ${totalQuestions}<br>Điểm số: ${score.toFixed(2)} điểm`;

        // Hiển thị kết quả section
        document.getElementById("resultSection").style.display = "block";

        // Ẩn section đề thi
        document.getElementById("examSection").style.display = "none";
    } else {
        // Nếu có câu hỏi chưa được chọn, hiển thị cảnh báo
        alert("Vui lòng chọn đầy đủ câu trả lời cho tất cả các câu hỏi!");
    }
}

function getSelectedAnswer(questionName) {
    var answers = document.getElementsByName(questionName);
    for (var i = 0; i < answers.length; i++) {
        if (answers[i].checked) {
            return answers[i].nextElementSibling.textContent.trim();
        }
    }
    return 'Chưa chọn';
}