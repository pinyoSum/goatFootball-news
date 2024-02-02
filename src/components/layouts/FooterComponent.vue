<template>
    <div class="billboard">
        <div class="container-custom">
            <div class="billboard-wrap">
                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="../../assets/banner/Banner-Goat01.jpg" class="d-block w-100" alt="...">
                        </div>
                        <div class="carousel-item">
                            <img src="../../assets/banner/Banner-Goat02.jpg" class="d-block w-100" alt="...">

                        </div>
                        <div class="carousel-item">
                            <img src="../../assets/banner/Banner-Goat03.jpg" class="d-block w-100" alt="...">

                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="footer">
        <div class="footer-logo">
            <img src="../../assets/img/GOATFOOTBALL.png">
        </div>
        <div class=" container-custom">
            <div class=" massage text-center">
                <span>
                    <p>เว็บรวมทีเด็ดบอล ผลบอลวันนี้ อัพเดตตารางการแข่งขันครบทุกคู่ ทุกแมตซ์ แจกทีเด็ดฟุตบอลทุกวัน
                        ดูสถิติการแข่งขัน ติดตามวิเคราะห์บอล ดูผลบอลย้อนหลังได้ครบจบที่เว็บ Goatfootball.com
                    </p>
                    <p>เนื้อหาและข้อมูลทั้งหมดเป็นเพียงข่าวสาร <br>
                        การวิเคราะห์จากสถิติความน่าจะเป็นเท่านั้น</p>
                </span>
            </div>
            <div class="contract">
                <div class="social">
                    <img src="../../assets/icon/social/fb.svg">
                    <img src="../../assets/icon/social/ig.svg">
                    <img src="../../assets/icon/social/yt.svg">
                    <img src="../../assets/icon/social/tiktok.svg">
                </div>
                <div class="service">
                    <div>Term Of Service</div>
                    <div>Report Abuse</div>
                    <div>Pivacy & Data Policy</div>
                </div>
            </div>
            <div class="footer-massage">
                © 2023 Goatfootball.com All rights reserved.
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.billboard {
    background-color: rgba(148, 17, 48, 255);
    padding: 20px 0;

    .billboard-wrap {
        background-color: rgba(31, 36, 40, 1);
        border-radius: 10px;

        .img-billboard {
            height: 130px;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

        }

        .banner {
            color: #fff;
            height: 30px;
            display: flex;
            align-items: center;
            padding: 20px;
        }
    }
}</style>