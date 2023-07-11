<template>
    <div class="container">
        <div class="header">
            <span class="welcome"><a style="cursor:pointer" @click="switchPage('IndexComponent')"
                    id="logo"><b>flakersen</b></a>’e hoş
                geldin!</span>
            <nav>
                <a @click="switchPage('ContactComponent')">iletişim</a>,&nbsp;
                <a @click="switchPage('DonateComponent')">bağış</a>
            </nav>
        </div>

        <component :is="currentPage" />

        <div class="footer">
            <div class="player">
                <iframe src="https://zeno.fm/player/flakersen" ref="playerFrame" id="player" width="400" height="100"
                    frameborder="0" scrolling="no"></iframe>
            </div>
            <div class="copyright">
                powered by <br>
                <a href="">zeno</a> and <a href="https://norm.quest">norm</a>
            </div>
        </div>
    </div>
</template>

<style>
:root {
    --padding-x: 150px;
    --padding-y: 400px;
}

* {
    font-family: Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 0;
    cursor: url(https://cur.cursors-4u.net/cursors/cur-6/cur568.cur), auto !important;
    letter-spacing: -.04em;
}

*:focus {
    outline: none;
}

body {
    padding: var(--padding-x) var(--padding-y);
}

.container {
    width: 100%;
    height: calc(100vh - calc(var(--padding-x) * 2));
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.welcome {
    font-size: 2rem;
}

nav>a {
    font-size: 1.75rem;
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer
}

.content {
    font-size: 1.5rem;
    width: 75%;
}

.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer>.copyright {
    font-size: 1.25rem;
}

@media only screen and (max-width:1350px) {
    :root {
        --padding-x:50px;
        --padding-y:130px;
    }
}
</style>

<script>
import ContactComponent from "../components/ContactComponent.vue"
import DonateComponent from "../components/DonateComponent.vue"
import IndexComponent from "../components/IndexComponent.vue"

export default {
    data() {
        return {
            currentSong: '',
            currentArtist: '',
            currentPage: IndexComponent,
        };
    },
    components: {
        ContactComponent,
        DonateComponent,
        IndexComponent
    },
    computed: {
    },
    methods: {
        switchPage(component) {
            this.currentPage = component
        }
    },
    mounted() {
        const iframe = this.$refs.playerFrame;

        iframe.addEventListener('load', () => {
            const iframeContent = iframe.contentWindow.document;
            const elementsToRemove = iframeContent.getElementsByClassName('dashboard-header');

            if (elementsToRemove.length > 0) {
                const elementToRemove = elementsToRemove[0];
                elementToRemove.remove();
            }
        });
    }

};
</script>