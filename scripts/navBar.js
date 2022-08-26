let navData = {

    logoLink: "./index.html",
    logo: "./home-static/images/logo@500x.png",
    logoText: "",
    navLinks: [{

        name: "Home",
        link: "./index.html"
    },
    {
        name: "Event",
        link: "./event.html"
    },
    {
        name: "Team",
        link: "./team.html"
    },
        // {
        //     name: "About",
        //     link: "./index.html#about"
        // }
    ],
    selectedColor: "#0f9d58"
}


const makeClick = (link, target = "_self") => {
    //console.log(link);
    let a = document.createElement("a")
    a.href = link
    a.target = target
    if (link.match("@rknec.edu")) {
        window.location.href = "mailto:" + link
        return
    }
    a.click()
}

class navBar extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })

        const wrapper = document.createElement('div')
        wrapper.setAttribute('class', 'container')

        let burger = document.createElement('div')
        burger.setAttribute('class', 'burger')
        burger.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `

        let logoDiv = document.createElement('div')
        logoDiv.setAttribute('class', 'logoDiv')

        let logo = document.createElement('img')
        logo.src = navData.logo
        logoDiv.addEventListener("click", () => {
            makeClick(navData.logoLink)
        })

        let logoTxt = document.createElement('div')
        logoTxt.innerText = navData.logoText


        logoDiv.appendChild(logo)
        logoDiv.appendChild(logoTxt)

        let navLinks = document.createElement('ul')
        navLinks.setAttribute("class", "nav-links")

        burger.addEventListener("click", () => {
            burger.classList.toggle("menuAnimate")
            navLinks.classList.toggle("open")
        })


        for (let i = 0; i < navData.navLinks.length; i++) {
            let tab = navData.navLinks[i]
            let l = document.createElement("li")
            l.innerText = tab.name
            l.addEventListener("click", () => {
                makeClick(tab.link)

                if (window.innerWidth < 770) {
                    burger.classList.toggle("menuAnimate")
                    navLinks.classList.toggle("open")
                }

            })
            navLinks.appendChild(l)
        }

        wrapper.appendChild(burger)
        wrapper.appendChild(logoDiv)
        wrapper.appendChild(navLinks)

        // const linkElem = document.createElement('link')
        // linkElem.setAttribute('rel', 'stylesheet')
        // linkElem.setAttribute('href', './styles/navBar.min.css')

        const linkElem = document.createElement("style")
        linkElem.innerHTML = `*{margin:0;padding:0;-webkit-box-sizing:border-box;box-sizing:border-box}.container{height:55px;width:100%;background-color:#03061e;color:#fff;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:fixed;top:0;left:0;-webkit-transition-duration:300ms;transition-duration:300ms;z-index:5;padding:0 10px;font-family:'Roboto', sans-serif}@media (max-width: 770px){.container{-webkit-box-pack:start;-ms-flex-pack:start;justify-content:start}}.logoDiv{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:space-evenly;-ms-flex-pack:space-evenly;justify-content:space-evenly;-webkit-box-align:center;-ms-flex-align:center;align-items:center;gap:10px;cursor:pointer;margin-left:40px}.logoDiv img{width:9rem}@media (max-width: 770px){.logoDiv img{width:40px}}@media (max-width: 770px){.logoDiv{margin-left:10px}}.burger{background-color:transparent;display:none;height:40px;width:60px;cursor:pointer;font-family:'Roboto', sans-serif;-webkit-transition-duration:300ms;transition-duration:300ms;-webkit-transform:scale(0.8);transform:scale(0.8)}@media (max-width: 770px){.burger{display:block}}.burger span{position:relative;display:block;height:4px;width:40px;margin:6px;background-color:#262626;-webkit-transition-duration:300ms;transition-duration:300ms}.nav-links{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-pack:distribute;justify-content:space-around;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:500px;height:100%}@media (max-width: 770px){.nav-links{position:fixed;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:distribute;justify-content:space-around;-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:absolute;background-color:#efefef;width:100vw;height:calc(100vh - 55px);top:55px;left:0;-webkit-transition:300ms;transition:300ms;-webkit-transform:translateX(-100%);transform:translateX(-100%);border-top:3px solid #262626}}.nav-links li{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:distribute;justify-content:space-around;-webkit-box-align:center;-ms-flex-align:center;align-items:center;list-style:none;text-decoration:none;text-transform:uppercase;letter-spacing:3px;font-size:medium;border-bottom:3px solid transparent;cursor:pointer;border:4px solid transparent;padding:10px;height:100%}@media (max-width: 770px){.nav-links li{height:auto;width:60%;text-align:center;padding:20px}}.nav-links li:hover{color:#0f9d58}.open{-webkit-transform:translateX(0);transform:translateX(0)}.menuAnimate span:nth-child(1){-webkit-transform-origin:20px;transform-origin:20px;-webkit-transform:translateY(10px) rotate(-45deg);transform:translateY(10px) rotate(-45deg)}.menuAnimate span:nth-child(2){-webkit-transform-origin:20px;transform-origin:20px;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.menuAnimate span:nth-child(3){opacity:0;-webkit-transform:translateY(15px);transform:translateY(15px)}`

        this.shadowRoot.append(linkElem, wrapper)
    }

    connectedCallback() {
        let selectedTab = this.getAttribute('selected')
        for (let i = 0; i < navData.navLinks.length; i++) {
            let tab = navData.navLinks[i]
            let l = this.shadowRoot.querySelectorAll("li")[i]
            if (tab.name.toLowerCase() == selectedTab.toLowerCase()) {
                l.style.borderBottomColor = navData.selectedColor
            }
        }
    }
}

// custom component navBar
window.customElements.define('nav-bar', navBar)

