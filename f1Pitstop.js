function initF1Pitstop() {
    const container = document.getElementById('f1PitstopGame');
    container.innerHTML = `
        <button class="back-home-btn" onclick="showMainPage()"><i class="fas fa-arrow-right"></i> ${lang[currentLang].back_home}</button>
        <div class="panel-title">${lang[currentLang].game_f1Pitstop}</div>
        <div id="pitStatus" class="result-card">السيارة في المركز 5. متبقي 15 لفة.</div>
        <div id="pitTires" class="result-card">حالة الإطارات: 80%</div>
        <div id="pitFuel" class="result-card">الوقود: 40%</div>
        <button id="pitEnter" class="primary">ادخل الصيانة</button>
        <button id="pitStay" class="primary">استمر في السباق</button>
        <div id="pitResult" class="result-card"></div>
    `;
    let position = 5;
    let tires = 80;
    let fuel = 40;
    let lapsLeft = 15;

    function updateDisplay() {
        document.getElementById('pitStatus').innerHTML = `المركز: ${position} | اللفات المتبقية: ${lapsLeft}`;
        document.getElementById('pitTires').innerHTML = `الإطارات: ${tires}%`;
        document.getElementById('pitFuel').innerHTML = `الوقود: ${fuel}%`;
    }

    function pit() {
        // تغيير الإطارات والتزود بالوقود يكلف وقت
        if (lapsLeft <= 0) return;
        lapsLeft--;
        tires = 100;
        fuel = 100;
        // خسارة مركزين بسبب الدخول
        position = Math.min(20, position + 2);
        document.getElementById('pitResult').innerHTML = "دخلت الصيانة: إطارات جديدة ووقود كامل. خسرت مركزين.";
        updateDisplay();
        checkFinish();
    }

    function stay() {
        if (lapsLeft <= 0) return;
        lapsLeft--;
        // استهلاك الإطارات والوقود
        tires = Math.max(0, tires - 15);
        fuel = Math.max(0, fuel - 12);
        // تقدم في المركز إذا كان الأداء جيداً
        if (tires > 30 && fuel > 20) {
            position = Math.max(1, position - 1);
            document.getElementById('pitResult').innerHTML = "تقدمت مركزًا!";
        } else {
            document.getElementById('pitResult').innerHTML = "تدهور الأداء بسبب الإطارات أو الوقود.";
        }
        updateDisplay();
        checkFinish();
    }

    function checkFinish() {
        if (lapsLeft === 0) {
            document.getElementById('pitResult').innerHTML += `<br>انتهى السباق! المركز النهائي: ${position}`;
            document.getElementById('pitEnter').disabled = true;
            document.getElementById('pitStay').disabled = true;
        }
    }

    document.getElementById('pitEnter').onclick = pit;
    document.getElementById('pitStay').onclick = stay;
    updateDisplay();
}
