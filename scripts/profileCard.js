
let socialIcons = [
    "./images/linkedin-icon.png",
    "./images/gmail-icon.png",
    "./images/github-icon.png",
]

const gColors = ["#4285F4", "#DB4437", "#F4B400", "#0F9D58"]

const ran = (min = 0, max = 1) => {
    return Math.floor(Math.random() * (max - min) + min)
}

class profileCard extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })

        // card content tree
        /*
        1. image
        2. name
        3. role
        4. title
        5. social links
        */

        const wrapper = document.createElement('div')
        wrapper.setAttribute('class', 'container')

        let picHolder = document.createElement("div")
        picHolder.setAttribute("class", "pic-holder")
        picHolder.style.background = gColors[ran(0, gColors.length)]

        let pic = document.createElement("img")
        pic.src = this.getAttribute("src")
        pic.setAttribute("class", "pic")

        picHolder.appendChild(pic);

        let name = document.createElement("div")
        name.innerText = "Name"
        name.setAttribute("class", "name")

        let role = document.createElement("div")
        role.innerText = "Role"
        role.setAttribute("class", "role")

        let title = document.createElement("div")
        title.innerText = "Title"
        title.setAttribute("class", "title")

        let socialLinks = document.createElement("div")
        socialLinks.setAttribute("class", "social-links")

        for (let i = 0; i < socialIcons.length; i++) {

            let l = document.createElement("img")
            l.setAttribute("class", "links")
            l.src = socialIcons[i]

            socialLinks.appendChild(l)

        }

        // let linkElem = document.createElement('link')
        // linkElem.setAttribute('rel', 'stylesheet')
        // linkElem.setAttribute('href', './styles/profileCard.min.css')

        let linkElem = document.createElement("style")
        linkElem.innerHTML = `*{margin:0;padding:0;-webkit-box-sizing:border-box;box-sizing:border-box}.container{height:auto;width:90vw;max-width:250px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:distribute;justify-content:space-around;-webkit-box-align:center;-ms-flex-align:center;align-items:center;font-family:'Roboto', sans-serif;padding:4px;text-transform:capitalize;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;margin:10px 20px;text-align:center}.pic-holder{width:160px;height:160px;border-radius:50%;margin-bottom:10px;overflow:hidden}.pic-holder img{display:inline;width:160px;height:160px;border-radius:50%;-o-object-fit:cover;object-fit:cover;-o-object-position:0% 10%;object-position:0% 10%}.social-links{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:space-evenly;-ms-flex-pack:space-evenly;justify-content:space-evenly;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-top:10px}.social-links img{width:24px;margin:4px;gap:4px;cursor:pointer}.social-links img:hover{-webkit-transform:translateY(-4px) scale(1.1);transform:translateY(-4px) scale(1.1)}.name{font-size:x-large;color:#000;margin-bottom:5px;text-transform:capitalize}.title{width:100%;font-size:small;color:gray;text-align:center}
        /*# sourceMappingURL=profileCard.min.css.map */`

        wrapper.appendChild(picHolder)
        wrapper.appendChild(name)
        wrapper.appendChild(role)
        wrapper.appendChild(title)
        wrapper.appendChild(socialLinks)
        this.shadowRoot.append(linkElem, wrapper)
    }

    connectedCallback() {

        let pic = this.shadowRoot.querySelector(".pic")
        pic.src = this.getAttribute("pic")

        pic.addEventListener("click", () => {
            let url = pic.src
            url = url.replace("thumbnail?", "uc?")
            makeClick(url, "_blank")
        })

        this.shadowRoot.querySelector(".name").innerText = this.getAttribute("name").toLowerCase()

        if (this.getAttribute("flag") == "true") {
            this.shadowRoot.querySelector(".role").style.display = "block"
            this.shadowRoot.querySelector(".role").innerText = this.getAttribute("role")
        } else {
            this.shadowRoot.querySelector(".role").style.display = "none"
        }

        let titleData = this.getAttribute("title").toLowerCase()
        titleData = titleData.replaceAll(",", "|")
        titleData = titleData.replaceAll("|", " | ")
        this.shadowRoot.querySelector(".title").innerText = titleData

        let slinks = this.getAttribute("social-links")
        slinks = slinks.split(",")

        let l = this.shadowRoot.querySelectorAll(".links")
        for (let i = 0; i < socialIcons.length; i++) {

            if (i < slinks.length) {
                l[i].style.display = "block"
            } else {
                l[i].style.display = "none"
                continue
            }
            l[i].addEventListener("click", () => {
                makeClick(slinks[i], "_blank")
            })
        }

    }
}

// custom component navBar
window.customElements.define('profile-card', profileCard)
