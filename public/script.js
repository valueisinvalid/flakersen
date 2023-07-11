const ZENOPLAY_URL = "https://zenoplay.zenomedia.com/"
  , EDITOR_URL = "https://editor.zenomedia.com/";
var siteUrl = "https://zeno.fm"
  , stationPrettyUrl = "flakersen";
async function getPartnerIds() {
    let t = await fetch("https://yield-op-idsync.live.streamtheworld.com/partnerIds", {
        credentials: "include"
    });
    return await t.json()
}
function setStationName(t) {
    document.title = "▶ " + t,
    $("title").attr("title", t),
    $("#rjp-stationname a").text(t)
}
$(document).ready(function() {
    fetchStation(stationPrettyUrl).done(function(t) {
        let e = {
            key: t.objectID,
            name: t.station_name,
            pretty_url: t.pretty_url,
            updated: t.updated,
            description: "",
            streamName: t.streamname,
            streamUrl: "https://stream.zeno.fm/" + t.streamname
        };
        setStationName(e.name),
        setStationLink(e.pretty_url),
        setStationImages(e),
        fetchStationCards(e.key).done(function(t) {
            let a = t.find(t=>"CardAppStore" === t.type);
            void 0 !== a && setAppLinks({
                appstore: a.appLinkApple,
                playstore: a.appLinkGoogle
            });
            let n = t.find(t=>"CardAbout" === t.type);
            void 0 !== n && (e.description = n.text),
            setMetaTags(e)
        });
        var a = document.getElementById("audioPlayer");
        let n = "";
        try {
            let r = com_adswizz_synchro_getListenerId();
            n = "?aw_0_req_lsid=" + r
        } catch (o) {}
        getPartnerIds().then(t=>{
            let e = new URLSearchParams(t).toString();
            n += n.length ? "&" + e : "?" + e
        }
        ).catch(t=>{}
        ).finally(()=>{
            a.src = e.streamUrl + n,
            a.load(),
            setInterval(function() {
                setNowPlaying(e.streamName)
            }, 5e3)
        }
        )
    }).fail(function(t) {
        console.log(t)
    })
});
var setStationLink = function(t) {
    $(".dashboard-box__playing-img a").attr("href", siteUrl + "/" + t),
    $("#rjp-stationname a").attr("href", siteUrl + "/" + t)
};
function setStationImages(t) {
    $(".dashboard").css("background-image", 'url("' + getStationBackgroundImageUrl(t) + '")');
    var e = $(".dashboard-box__playing-img a")
      , a = new Image;
    a.src = getStationImageUrl(t),
    a.alt = t.name,
    a.onload = function() {
        var t = a.width / a.height;
        $(a).data("aspect-ratio", t),
        t >= 1 ? e.addClass("landscape") : e.addClass("portrait"),
        $(a).appendTo(e)
    }
}
function setMetaTags(t, e) {
    $('meta[property="og:title"]').attr("content", t.name),
    $('meta[name="twitter:title"]').attr("content", t.name),
    $('meta[name="twitter:image:alt"]').attr("content", t.name),
    $('meta[property="og:url"]').attr("content", siteUrl + "/" + t.pretty_url),
    $('meta[property="og:description"]').attr("content", sanitizeHTML(t.description)),
    $('meta[name="twitter:description"]').attr("content", sanitizeHTML(t.description)),
    $('meta[property="og:image"]').attr("content", getStationImageUrl(t, "200x200")),
    $('meta[name="twitter:image"]').attr("content", getStationImageUrl(t, "125x125")),
    $('meta[property="og:audio"]').attr("content", t.streamUrl),
    $('meta[name="twitter:player:stream"]').attr("content", t.streamUrl),
    $('meta[name="twitter:player"]').attr("content", siteUrl + "/player.php?stream=" + t.streamUrl)
}
function getStationStreamUrl(t) {
    return t.streambase.replace("http://", "https://") + "/" + t.streamname + ".aac"
}
function getStationImageUrl(t, e) {
    return e || (e = "350x350"),
    "https://stream-tools.zenomedia.com/content/stations/" + t.key + "/image/?keep=w&lu=" + t.updated + "&resize=" + e
}
function getStationBackgroundImageUrl(t) {
    return "https://stream-tools.zenomedia.com/content/stations/" + t.key + "/microsite/background_image/?keep=w&updated=" + t.updated
}
function setAppLinks(t) {
    t && void 0 !== t.appstore && $("#appstore").attr("href", t.appstore).show(),
    t && void 0 !== t.playstore && $("#playstore").attr("href", t.playstore).show()
}
function fetchStation(t) {
    return $.ajax({
        type: "GET",
        url: "https://zenoplay.zenomedia.com/api/zenofm/stations/" + t + "/",
        dataType: "json",
        async: !1
    })
}
function fetchStationCards(t) {
    return $.ajax({
        type: "GET",
        url: "https://editor.zenomedia.com/api/zenofm/" + t + "/dashboardCards",
        dataType: "json",
        async: !1
    })
}
function sanitizeHTML(t) {
    var e = document.createElement("div");
    return e.textContent = t,
    e.innerHTML
}
function setNowPlaying(t) {
    getNowPlayingData(t).then(function(t) {
        t.title && $(".dashboard-box__playing-song").text(t.title),
        t.artist && $(".dashboard-box__playing-artist").text(t.artist)
    })
}
function getNowPlayingData(t) {
    return $.ajax({
        type: "GET",
        url: "https://zenoplay.zenomedia.com/api/zenofm/nowplaying/" + t + "?_=" + new Date().getTime(),
        dataType: "json",
        async: !1
    })
}
