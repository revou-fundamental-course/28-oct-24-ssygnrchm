function validateForm() {
    // Select the checked gender input, age, weight, and height values from the form
    let gender = document.querySelector('input[name="gender"]:checked');
    let age = document.getElementById("age").value;
    let weight = document.forms["bmi-form"]["body-weight"].value;
    let height = document.forms["bmi-form"]["body-height"].value;

    // Select error messages associated with age, weight, and height inputs
    let ageError = document.getElementById('age-error').innerHTML;
    let weightError = document.getElementById('body-weight-error').innerHTML;
    let heightError = document.getElementById('body-height-error').innerHTML;
    console.log(ageError);  // Log age error message to console for debugging

    // Check if any input fields are empty
    if ((gender == null) || (age == '') || (weight == '') || (height == '')){
        alert("Semua kolom harus diisi!"); // Alert if fields are incomplete
    } else if ((ageError != '') || (weightError != '') || (heightError != '')) {
        alert("Semua kolom harus diisi dengan benar!"); // Alert if there are validation errors
    } else {
        // Check if age is below 20 and alert if so
        if (age < 20) {
            alert("Usia anda belum mencukupi. Kalkulator BMI ditujukan untuk Usia 20 tahun keatas. Untuk usia 19 tahun kebawah silahkan konsultasikan lebih lanjut dengan orang yang memenuhi syarat seperti dokter ");
            document.forms["bmi-form"].reset(); // Reset form if age is below 20
        } else calculateBMI(); // Calculate BMI if all fields are valid
    }  
}

function calculateBMI() {
    // Retrieve and parse weight and height values, then convert height to meters
    let weight = parseInt(document.getElementById("body-weight").value);
    let height = parseInt(document.getElementById("body-height").value) / 100;

    // Calculate BMI and round to 1 decimal place
    let bmi = parseFloat(weight / (height * height)).toFixed(1);

    // Display calculated BMI in the result area
    document.getElementById("bmi-result").innerHTML = bmi;
    
    // Call function to get BMI status based on calculated BMI
    getBMIStatus(bmi);
}

function getBMIStatus(bmiResult) {
    // Variables to store BMI status, description, and explanation text
    let bmiStatus;
    let bmiDescription;
    let bmiExp;

    // Determine BMI category and set the appropriate status, description, and explanation
    if (bmiResult < 18.5){
        bmiStatus = "Berat Rendah";
        bmiDescription = "Anda kekurangan berat badan! Utamakan hidup sehat dan perhatikan konsumsi harian";
        bmiExp = "BMI di bawah 18,5 mengindikasikan bahwa berat badan seseorang kurang dari yang disarankan untuk tinggi badannya. Orang dengan BMI di kategori ini mungkin berisiko mengalami kekurangan nutrisi, kelemahan otot, atau masalah dengan daya tahan tubuh.";
    } else if (bmiResult < 25) {
        bmiStatus = "Berat Ideal";
        bmiDescription = "Berat badan anda ideal. Pastikan asupan kalori sesuai dengan kebutuhan kalori harian & konsumsi makanan sehat";
        bmiExp = "BMI dalam rentang ini dianggap ideal dan menunjukkan berat badan yang seimbang dengan tinggi badan. Orang dengan BMI normal biasanya memiliki risiko yang lebih rendah terhadap berbagai penyakit kronis seperti diabetes, penyakit jantung, dan hipertensi.";
    } else if (bmiResult < 30) {
        bmiStatus = "Berat Berlebih";
        bmiDescription = "Anda kelebihan berat badan. Utamakan hidup sehat dan perhatikan konsumsi harian";
        bmiExp = "BMI dalam kategori ini menunjukkan kelebihan berat badan. Orang yang overweight mungkin berisiko lebih tinggi untuk masalah kesehatan, termasuk penyakit jantung, tekanan darah tinggi, dan diabetes tipe 2.";
    } else if (bmiResult >= 30) {
        bmiStatus = "Obesitas";
        bmiDescription = "Berat badan anda termasuk dalam kategori obesitas! Utamakan hidup sehat dan perhatikan konsumsi harian";
        bmiExp = "BMI di atas 30 menunjukkan obesitas, yang berkaitan dengan risiko lebih tinggi terhadap berbagai penyakit serius, seperti diabetes, penyakit jantung, stroke, osteoarthritis, dan beberapa jenis kanker.";
    }

    // Display the status, description, and explanation for the calculated BMI
    document.getElementById("bmi-status").innerHTML = bmiStatus;
    document.getElementById("bmi-description").innerHTML = bmiDescription;
    document.getElementById("bmi-explanation").innerHTML = bmiExp;

    // Flip the card to show the result
    flipCard();
}

function inputChange(t, n) {
    // Get the current input value and clear any existing error messages
    let e = t.value;
    console.log(e);  // Log input value to console for debugging
    const textError = document.getElementById(n);
    textError.textContent = "";

    // Regular expression to check if the input is a number starting from 1-9
    let chars = /^[1-9][0-9]*/;
    
    // Check if input value contains only valid digits
    if(chars.test(e)) {
        console.log("digits");
        // Limit input length to 3 characters (max value 999)
        if (t.value.length > 2){
            t.value = t.value.slice(0, 3);
        }
    } else {
        console.log("no digits");
        textError.textContent = "Tolong masukkan usia dengan benar!"; // Display error if input is invalid
    }
}

function flipCard() {
    // Get the inner flip-card container
    const flipCardInner = document.getElementById("flipCardInner");

    // Toggle the flip by checking current transform state
    if (flipCardInner.style.transform === "rotateY(180deg)") {
        flipCardInner.style.transform = "rotateY(0deg)"; // Flip back to front side
    } else {
        flipCardInner.style.transform = "rotateY(180deg)"; // Flip to back side
    }
}
