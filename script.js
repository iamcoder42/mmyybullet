// --- WHATSAPP AYARLARI ---
// Bu numarayı kendi numaranızla değiştirin (Format: 905XXXXXXXXX)
const whatsappNumber = "905336647947"; 

document.addEventListener("DOMContentLoaded", function() {

    // 1. Dinamik WhatsApp "Bilgi Al" Linklerini Oluşturma
    const bilgiAlBtnlar = document.querySelectorAll(".bilgi-al-btn");
    
    bilgiAlBtnlar.forEach(btn => {
        const productName = btn.getAttribute("data-product-name");
        // Otomatik mesaj: "Merhaba, [Ürün Adı] hakkında bilgi almak istiyorum."
        const message = `Merhaba, ${productName} hakkında bilgi almak istiyorum.`;
        // URL'i oluşturma (Tarayıcı uyumlu hale getirme)
        const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        btn.setAttribute("href", waUrl);
        btn.setAttribute("target", "_blank"); // Yeni sekmede aç
    });

    // 2. Sabit WhatsApp Logosunun Linkini Doldurma (Sadece Numaraya Yönlendirme)
    const floatingWaLink = document.getElementById("floating-wa-link");
    floatingWaLink.setAttribute("href", `https://wa.me/${whatsappNumber}`);


    // *** 3. ÜRÜN DETAY MODALI (PANEL) VERİLERİ VE İŞLEVİ ***

    // Ürün verilerini burada tutuyoruz (İleride burası genişleyebilir)
    const productData = {
        "pellet-match": {
            title: "5.5mm Magnum Slug Pellet",
            description: "Müsabaka ve hobi atıcılığı için özel olarak tasarlanan Magnum Slug serisi, ağırlığı ve aerodinamik formu sayesinde rüzgar direncini minimuma indirir. Yüksek tahribat gücü ve maksimum menzil arayan atıcıların tercihidir.",
            images: ["Tel-ucu.jpeg", "2-tane-tel.jpeg", "3-tel-bobin.jpeg", "10-tane-tel-bobin.jpeg", "8-tane-tel-bobin.jpeg", "birsürü-tel-bobin.jpeg", "üstüste-tel-bobin.jpeg"], // Ek resimler
            specs: ["Çap: 5.5mm (.22)", "Ağırlık: 21 Grain", "Form: Slug", "Paket: 250 Adet"]
        },
        "tel-kursun": {
            title: "Endüstriyel Tel Kurşun (Bobin)",
            description: "Endüstriyel lehimleme, sızdırmazlık ve ağırlık uygulamaları için yüksek saflıkta üretilen tel kurşunlarımız, bobin halinde sunulmaktadır. Mikron hassasiyetinde çap doğruluğu ve esnek form yapısı ile üretim süreçlerinize uyum sağlar.",
            images: ["bos-kutu.jpeg", "dolu-kutu-mybullet.jpeg"],
            specs: ["Çap: 2mm - 10mm (Özel üretim)", "Saflık: %99.9", "Form: Bobin (Sürekli tel)", "Ambalaj: Özel bobin"]
        },
        "pellet-special": {
            title: "4.5mm Hollow Point Özel Seri",
            description: "Hedef atıcılığı ve kapalı alan müsabakaları için geliştirilen Hollow Point Özel Seri, mükemmel denge ve uçuş doğruluğu sunar. Pelletin kafa yapısındaki çukurluk, isabet anında enerjinin maksimum düzeyde hedefe aktarılmasını sağlar.",
            images: ["sacma-isi.jpeg", "product3_side.jpg", "product3_bottom.jpg"],
            specs: ["Çap: 4.5mm (.177)", "Ağırlık: 10.5 Grain", "Form: Hollow Point", "Paket: 500 Adet"]
        }
    };

    const modal = document.getElementById("product-modal");
    const closeBtn = document.querySelector(".close-modal");

    // "Detaylar" butonlarına tıklama olayını ekleme
    const detailsBtnlar = document.querySelectorAll(".details-btn");
    detailsBtnlar.forEach(btn => {
        btn.addEventListener("click", function() {
            // Tıklanan kartın ID'sini alma
            const productId = this.closest(".product-card").getAttribute("data-product-id");
            openModal(productId);
        });
    });

    // Modalı kapatma (Çarpı işareti)
    closeBtn.addEventListener("click", closeModal);

    // Modalı kapatma (Dışarıya tıklama)
    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            closeModal();
        }
    });

    // Modalı veriyle doldurup açma işlevi
    function openModal(productId) {
        const data = productData[productId];
        if (!data) return; // Veri yoksa bir şey yapma

        // Verileri modal elemanlarına doldurma
        document.getElementById("modal-title").textContent = data.title;
        document.getElementById("modal-description").textContent = data.description;
        document.getElementById("modal-main-img").src = data.images[0]; // Ana resmi set et

        // Spesifikasyon listesini temizleyip yeniden doldurma
        const specsList = document.getElementById("modal-specs");
        specsList.innerHTML = "";
        data.specs.forEach(spec => {
            const li = document.createElement("li");
            li.textContent = spec;
            specsList.appendChild(li);
        });

        // Küçük resimleri (Gallery) oluşturma
        const thumbnailsDiv = document.getElementById("modal-thumbnails");
        thumbnailsDiv.innerHTML = "";
        data.images.forEach((imgSrc, index) => {
            const img = document.createElement("img");
            img.src = imgSrc;
            if (index === 0) img.classList.add("active"); // İlkini aktif yap

            // Küçük resme tıklayınca ana resmi değiştirme
            img.addEventListener("click", function() {
                document.getElementById("modal-main-img").src = this.src;
                // Aktif sınıfını yönetme
                document.querySelectorAll(".modal-thumbnails img").forEach(i => i.classList.remove("active"));
                this.classList.add("active");
            });

            thumbnailsDiv.appendChild(img);
        });

        // Modal içindeki WhatsApp butonunu güncelleme
        const waMessage = `Merhaba, ${data.title} hakkında detaylı bilgi almak istiyorum.`;
        const modalWaLink = document.getElementById("modal-wa-link");
        modalWaLink.setAttribute("href", `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMessage)}`);
        modalWaLink.setAttribute("target", "_blank");

        modal.style.display = "block"; // Modalı göster
    }

    // Modalı kapatma işlevi
    function closeModal() {
        modal.style.display = "none";
    }
});