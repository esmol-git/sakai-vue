<script setup>
const curentYear = new Date().getFullYear();
</script>

<template>
    <div class="shop-footer">
        <div class="shop-footer__main">
            <div class="main__container">
                <div class="shop-footer__main-wrapper">
                    <div class="shop-footer__main-col">
                        <div class="shop-footer__main-logo">
                            <img src="/demo/images/logo-white.svg" alt="Furniking" />
                        </div>
                    </div>
                    <div class="shop-footer__main-col">
                        <div class="shop-footer__main-title">Company</div>
                        <div class="shop-footer__main-links">
                            <a href="#">About</a>
                            <a href="#">Careers</a>
                            <a href="#">Blog</a>
                            <a href="#">Contact</a>
                        </div>
                    </div>
                    <div class="shop-footer__main-col">
                        <div class="shop-footer__main-title">Legal</div>
                        <div class="shop-footer__main-links">
                            <a href="#">Privacy</a>
                            <a href="#">Security</a>
                            <a href="#">Terms</a>
                        </div>
                    </div>
                    <div class="shop-footer__main-col">
                        <div class="shop-footer__main-title">Social</div>
                        <div class="shop-footer__main-links">
                            <a href="#">Facebook</a>
                            <a href="#">Twitter</a>
                            <a href="#">Instagram</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="shop-footer__bottom">
            <div class="main__container">
                <div class="shop-footer__bottom-wrapper">
                    <div class="shop-footer__bottom-copyright">
                        © {{ curentYear }} Funking - All rights reserved.
                    </div>
                    <div class="shop-footer__bottom-links">
                        <a href="#">Privacy</a>
                        <a href="#">Security</a>
                        <a href="#">Terms</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.shop-footer {
    display: flex;
    flex-direction: column;
    &__main {
        flex: 1 1 auto;
        &-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 30px 0;
            width: 100%;
        }
        &-col {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        &-logo {
            width: 100px;
            height: 100px;
            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
        &-title {
            font-weight: 700;
            font-size: 16px;
            line-height: 150%;
            color: #333333;
        }
        &-links {
            display: flex;
            flex-direction: column;
            gap: 10px;
            a {
                font-size: 14px;
                line-height: 150%;
                color: #333333;
            }
        }

    }
    &__bottom {
        flex: 1 1 auto;
        border-top: 1px solid rgba(150, 150, 150, 0.2);
        &-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 30px 0;
            width: 100%;
        }
        &-copyright {
            font-size: 14px;
            line-height: 150%;
            color: #333333;
        }
        &-links {
            display: flex;
            gap: 10px;
            a {
                font-size: 14px;
                line-height: 150%;
                color: #333333;
            }
        }
    }
}
</style>
