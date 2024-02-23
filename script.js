var Cars = [];

// MODAL AÇMA KAPAMA
const openAddCarModal = new bootstrap.Modal(document.getElementById('addCarModal'));

function openModal() {
    openAddCarModal.show();
}

function closeModal() {
    openAddCarModal.hide();
}

// ARACI KAYDETME
function saveCar() {
    var adi = document.getElementById('arabaAdi').value;
    var marka = document.getElementById('arabaMarkasi').value;
    var renk = document.getElementById('arabaRengi').value;
    var tuketim = document.getElementById('yakitTuketimi').value;
    if (adi == '' || marka == '' || renk == '' || tuketim == '') {
        alert('lütfen tüm alanları doldurunuz');
        return false;
    }
    if (isNaN(tuketim) == true) {
        alert('lütfen tüketimi sayı olarak giriniz');
        return false;
    }
    var araba = new Car(adi, marka, renk, tuketim);
    Cars.push(araba);
    tableRender();
    closeModal();
}
// KAYDEDİLEN ARACI LİSTEYE EKLEME
function tableRender() {
    var tbody = document.getElementById('carList');
    tbody.innerText = '';
    for (var i = 0; i < Cars.length; i++) {
        var car = Cars[i];
        var tr = document.createElement('tr');
        var tdId = document.createElement('td');
        var tdAdi = document.createElement('td');
        var tdMarka = document.createElement('td');
        var tdIslem = document.createElement('td');

        if (car.active == true) {
            tdId.style.backgroundColor = '#8bc34a';
            tdAdi.style.backgroundColor = '#8bc34a';
            tdMarka.style.backgroundColor = '#8bc34a';
            tdIslem.style.backgroundColor = '#8bc34a';
        }

        tdId.innerText = car.id;
        tdAdi.innerText = car.adi;
        tdMarka.innerText = car.marka;
        tdIslem.innerHTML = '<button onclick="deleteCar(event)" data-index="' + car.id + '" type="button" class="btn btn-sm btn-danger">Sil</button><button onclick="useCar(event)" data-index="' + car.id + '" type="button" class="btn btn-sm btn-success">Kullan</button>'

        tr.appendChild(tdId);
        tr.appendChild(tdAdi);
        tr.appendChild(tdMarka);
        tr.appendChild(tdIslem);
        tbody.appendChild(tr);
    }
}

// ARAÇ SİLME
function deleteCar(event) {
    var id = event.target.dataset.index;
    id = Number(id);
    var newArr = [];
    for (var i = 0; i < Cars.length; i++) {
        var car = Cars[i];
        if (car.id !== id) {
            newArr.push(car);
        }
    }
    Cars = newArr;
    document.getElementById('gidilenYol').innerText = "0";
    document.getElementById('tuketilenBenzin').innerText = "0";
    tableRender();
}

// ARAÇ KULLANMA 
function useCar(event) {
    var id = event.target.dataset.index;
    id = Number(id);
    var newArr = [];
    var selected = null;
    Cars.map((car) => {
        if (car.id == id) {
            car.active = true;
            selected = car;
        } else {
            car.active = false;
        }
        newArr.push(car);
    });
    Cars = newArr;
    tableRender();
    populateSubTable(selected);
}

// SEÇİLEN ARACIN ÖZELLİK LİSTESİNİ OLUŞTURMA 
function populateSubTable(car) {
    if (car == null) {
        alert('araba doğru seçilmedi');
        return false;
    }
    document.getElementById('selectedId').innerText = car.id;
    document.getElementById('selectedAdi').innerText = car.adi;
    document.getElementById('selectedMarka').innerText = car.marka;
    document.getElementById('selectedTuketim').innerText = car.tuketim + ' metre';
    document.getElementById('selectedYol').innerText = Math.floor(car.gidilenYol) + ' metre';
    document.getElementById('selectedId').innerText = car.tuketimMiktari.toFixed(2) + ' litre';
}

// ARACI ÇALIŞTIRMA
function run() {
    var activeCar = Cars.find((car) => {
        if (car.active == true) {
            return true;
        }
    });
    var slct = document.getElementById('hiz');
    var hiz = slct.selectedOptions[0].value;
    hiz = Number(hiz);
    activeCar.baslat(hiz, (car) => {
        document.getElementById('gidilenYol').innerText = Math.floor(car.gidilenYol) + ' metre';
        document.getElementById('tuketilenBenzin').innerText = car.tuketimMiktari.toFixed(2) + ' litre';
    });
    document.getElementById('rungif').style.display = 'block';
    document.getElementById('stopgif').style.display = 'none';
}

// ARACI DURDURMA 
function stop() {
    var activeCar = Cars.find((car) => {
        if (car.active == true) {
            return true;
        }
    });
    activeCar.durdur();
    document.getElementById('stopgif').style.display = 'block';
    document.getElementById('rungif').style.display = 'none';
}