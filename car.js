class Car {
    constructor(adi, marka, renk, tuketim) {
        this.id = Date.now() % 1000;
        this.adi = adi;
        this.marka = marka;
        this.renk = renk;
        this.tuketim = tuketim;
        this.active = false;
        this.hiz = 0;
        this.gidilenYol = 0;
        this.gitmeDurumu = false;
        this.interval = false;
        this.tuketimMiktari = 0;
    }

    saniyedeKacMetreGider() {
        var birSaniyedeGidilenYolMetre = (this.hiz / (60 * 60)) * 1000;
        return birSaniyedeGidilenYolMetre;
    }

    metredeYakilanBenzinMiktari(yol) {
        var benzin = (this.tuketim / 1000) / 1000;
        var tuketilen = yol * benzin;
        return tuketilen;
    }

    baslat(yeniHiz, callback) {
        this.hiz = yeniHiz;
        var snMetre = this.saniyedeKacMetreGider();
        this.gitmeDurumu = true;
        this.interval = setInterval(() => {
            this.gidilenYol = this.gidilenYol + snMetre;
            this.tuketimMiktari = this.metredeYakilanBenzinMiktari(this.gidilenYol);
            callback(this);
        }, 1000);
    }

    durdur() {
        clearInterval(this.interval);
        this.interval = false;
        this.gitmeDurumu = false;
    }
}

