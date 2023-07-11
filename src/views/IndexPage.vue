<template>
    <audio controls="" id="audioPlayer" style="display: none" autoplay></audio>
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
                <span class="toggle" @click="toggleAudio()" v-html="playerState == true ? on : off"></span>
                <span>{{ currentArtist + " - " + currentSong }}</span>
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
    user-select: none;
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

.footer>.player {}
</style>

<script>
import ContactComponent from "../components/ContactComponent.vue"
import DonateComponent from "../components/DonateComponent.vue"
import IndexComponent from "../components/IndexComponent.vue"
import axios from "axios"

export default {
    data() {
        return {
            currentSong: '',
            currentArtist: '',
            currentPage: IndexComponent,
            on: `<svg width="40" height="51" viewBox="0 0 40 51" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0H15V51H0V0Z" fill="#000000"/><path d="M25 0H40V51H25V0Z" fill="#000000"/></svg>`,
            off: `<svg width="44" height="51" viewBox="0 0 44 51" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44 25.4034L-6.03553e-06 50.8068L-3.8147e-06 -1.9233e-06L44 25.4034Z" fill="#111111"/></svg>`,
            playerState: true,
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
        updateSong() {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://zenoplay.zenomedia.com/api/zenofm/nowplaying/zxf2icpossouv',
                headers: {
                    'Accept': '*/*',
                    'Accept-Language': 'en,en-GB;q=0.9,tr;q=0.8,eo;q=0.7,bs;q=0.6',
                    'Connection': 'keep-alive',
                    'Origin': 'null',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'cross-site',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
                    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"'
                }
            };
            axios.request(config).then((result) => {
                if (result.data.title.includes("-")) {
                    this.currentArtist = result.data.title.split("-")[0]
                    this.currentSong = result.data.title.split("-")[1]
                } else {
                    this.currentArtist = 'Intro';
                    this.currentSong = result.data.title;
                }
            })
        },
        switchPage(component) {
            this.currentPage = component
        },
        toggleAudio() {}
    },
    created() {
        this.updateSong()
    },
    mounted: function () {
        setInterval(function () {
            this.updateSong()
        }.bind(this), 5000)
    }
};
</script>