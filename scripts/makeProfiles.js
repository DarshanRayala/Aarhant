const data = require("D:/Git/projects/RCOEM-Google-DSC-Website/scripts/dscData.js")

const priority = [
    "GDSC lead",
    "Management Head",
    "Web Developer",
    "Program Manager",
    "Content Creator",
    "Graphics Designer",
    "Video Editor",
    "Competitive problem setter",
    "Flutter Developer",
]

let mapData = {}
for (let i = 0; i < data.length; i++) {
    let p = data[i];
    let role = p["Role"].toLowerCase()

    if (mapData[role] == undefined) {
        mapData[role] = []
    }
    mapData[role].push(p);
}
// console.log(mapData);

/*
<h2 class="role-heading">Team Lead</h2>

    <div class="profile-holder">
        <profile-card pic="https://jhamadhav.com/images/profilePic.jpg" name="Madhav" role="Web developer"
            title="tech Enthusiast | Developer" social-links="a,b,c" flag="false"></profile-card>
    </div>

 */

let htmlData = ``

for (let i = 0; i < priority.length; i++) {
    htmlData += `
     <h2 class="role-heading">${priority[i]}</h2>

     <div class="profile-holder">
     `
    let profiles = ``;
    mapData[priority[i].toLowerCase()].forEach(p => {

        let sl = ""
        sl += p["Linked in profile URL"] + "," + p["Email Id (preferably rknec)"]
        if (p["GitHub profile URL"] != "") {
            sl += "," + p["GitHub profile URL"]
        }

        let imgLink = p["Profile Picture"]
        imgLink = imgLink.replace("open?id=", "uc?export=view&id=")
        imgLink = imgLink.replace("uc?", "thumbnail?")
        profiles += `
         <profile-card pic="${imgLink}" name="${p["Name"]}" role="${p["Role"]}"
            title="${p["Description (like the one highlighted in the following image)"]}" social-links="${sl}" flag="false"></profile-card>
        `
    });
    htmlData += profiles + `</div>`
}
console.log(htmlData);