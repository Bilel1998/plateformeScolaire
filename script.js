function signUp() {
    var fName = document.getElementById('nom').value;
    var lName = document.getElementById('prenom').value;
    var email = document.getElementById('email').value;
    var pwd = document.getElementById('mdp').value;
    var confirmPwd = document.getElementById('vMdp').value;
    var section = document.querySelectorAll('input[name="drone"]:checked');
    var classe = document.querySelectorAll('input[name="classe"]:checked');
    var b = true;
    var sectionArray=[];
    var classeArray=[];
    for(var i=0; i<section.length; i++){
       sectionArray.push((section[i].value)); // or do what you want
    };

    for(var i=0;i<classe.length;i++)
    {
        classeArray.push((classe[i].value));
    }
    //input verification
    if (verifLength(fName, 3, 25)) {
        document.getElementById('nomErreur').innerHTML = '';
    } else {
        document.getElementById('nomErreur').innerHTML =
            'Nom entre 3 et 25 ceractere';
        b = false;
        document.getElementById('nomErreur').style.color = "red";
        document.getElementById('nomErreur').style.marginLeft="250px";
    }
    if (verifLength(lName, 3, 25)) {
        document.getElementById('prenomErreur').innerHTML = '';
    } else {
        document.getElementById('prenomErreur').innerHTML =
            'Prénom entre 3 et 25 ceractere';
        b = false;
        document.getElementById('prenomErreur').style.color = "red";
        document.getElementById('prenomErreur').style.marginLeft="250px";

    }
    if (verifLength(pwd, 5, 25)) {
        document.getElementById('mdpErreur').innerHTML = '';
    } else {
        document.getElementById('mdpErreur').innerHTML =
            'Mot de Passe entre 3 et 25 ceractere';
        b = false;
        document.getElementById('mdpErreur').style.color = "red";
        document.getElementById('mdpErreur').style.marginLeft="250px";

    }
    if (pwd === confirmPwd) {
        document.getElementById('vMdpErreur').innerHTML = '';
    } else {
        document.getElementById('vMdpErreur').innerHTML =
            'Verifier votre mot de passe';
        b = false;
        document.getElementById('vMdpErreur').style.color = "red";
        document.getElementById('vMdpErreur').style.marginLeft="250px";

    }
    var verif = validateEmail(email)
    if (verif === true) {
        document.getElementById('emailErreur').innerHTML = '';
    } else {
        document.getElementById('emailErreur').innerHTML =
            'Verifier votre email';
        b = false;
        document.getElementById('emailErreur').style.color = "red";
        document.getElementById('emailErreur').style.marginLeft="250px";

    }
    //Object JSON

    var allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    var userExist = false;
    for (var i = 0; i < allUsers.length; i++) {
        if (allUsers[i].email === email) {
            userExist = true;
        }
    }

    if (userExist === true) {
        document.getElementById('emailErreur').innerHTML = 'Cet email existe déjà';
        document.getElementById('emailErreur').style.color = 'red';
        document.getElementById('nomErreur').style.marginLeft="250px";
        b = false;



    }
    else {
        if (b === true) {
            if (prof(email)) {
                var id = JSON.parse(localStorage.getItem("userId") || "1");1
                var user = {
                    id: id,
                    firstName: fName,
                    lastName: lName,
                    email: email,
                    password: pwd,
                    confirmPassword: confirmPwd,
                    "section": sectionArray,
                    "classe": classeArray,
                    role: "prof"
                };
                console.log('User', JSON.stringify(user));
                allUsers.push(user);
                localStorage.setItem("userId", id + 1);
                localStorage.setItem('users', JSON.stringify(allUsers));
                location.replace("login.html");

               
            }
            else {
                var valide=true;
                var id = JSON.parse(localStorage.getItem("userId") || "1");
                if(sectionArray.length>1 || classeArray.length>1)
                {
                    valide=false;
                }
                if( valide===true)
                {
                    var user = {
                        id: id,
                        firstName: fName,
                        lastName: lName,
                        email: email,
                        password: pwd,
                        confirmPassword: confirmPwd,
                        
                        "section": sectionArray,
                        "classe": classeArray,
                        role: "etudiant"
                    };
                    allUsers.push(user);
                    localStorage.setItem("userId", id + 1);
                    localStorage.setItem('users', JSON.stringify(allUsers));
                    location.replace("login.html");

                }
                else 
                {
                    document.getElementById("signupErreurSection").innerHTML="Veuillez Verifier Section/Niveau"
                    document.getElementById("signupErreurSection").style.color="red";
                    document.getElementById("signupErreurSection").style.textAlign="center";
                    
                    document.getElementById("signupErreurNiveau").innerHTML="Veuillez Verifier Section/Niveau"
                    document.getElementById("signupErreurNiveau").style.color="red";
                    document.getElementById("signupErreurNiveau").style.textAlign="center";
                }
            }
             
        }
    }

}
function verifLength(ch, min, max) {
    if (ch.length > min && ch.length < max) {
        return true;
    } else {
        return false;
    }
}
function validateEmail(ch) {
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(String(ch).toLowerCase());
}
// fonction traja3 el partie eli baed el @ mel email
function email(ch) {
    var res = "";
    var j;
    for (var i = 1; i < ch.length; i++) {
        if (ch[i] === "@") {
            j = i;
            i = ch.length;
        }
    }
    for (var i = j + 1; i < ch.length; i++) {
        res = res + ch[i];
        if (ch[i + 1] == ".") {
            i = ch.length;
        }
    }
    return res;
}
// fonction traja3 idha email mta prof wala le
function prof(ch) {
    var T = ["gmail", "yahoo", "live", "outlook"];
    var res = email(ch);
    var b = true;
    for (var i = 0; i < T.length; i++) {
        if (T[i] == res) {
            b = false;
        }
    }
    return b;
}
function login() {
    var email = document.getElementById('emailLogin').value;
    var pwd = document.getElementById('mdpLogin').value;
    if (email.length === 0) {
        document.getElementById('emailLoginErreur').innerHTML =
            'Please insert Email';
        document.getElementById('emailLoginErreur').style.color = 'red';
    } else {
        document.getElementById('emailLoginErreur').innerHTML = '';
    }
    if (pwd.length === 0) {
        document.getElementById('pwdLoginErreur').innerHTML =
            'Please insert Password';
        document.getElementById('pwdLoginErreur').style.color = 'red';
    } else {
        document.getElementById('pwdLoginErreur').innerHTML = '';
    }

    var allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    var userExist = false;
    var user;
    for (var i = 0; i < allUsers.length; i++) {
        if (allUsers[i].email === email) {
            if (allUsers[i].password === pwd) {
                userExist = true;
                user = allUsers[i];
            }
        }
    }
    if (userExist) {
        localStorage.setItem('connectedUser', JSON.stringify(user));
        if (user.role === "etudiant") {

            location.replace('etudiant.html');



        }
        else {
            location.replace('courses.html');

        }
    }
    else {
        document.getElementById("loginErreur").innerHTML='Veuillez vérifier Email/MDP';
        document.getElementById("loginErreur").style.color="red";
        document.getElementById("loginErreur").style.textAlign="center";
        document.getElementById("loginErreur").style.marginTop="20px";
    }
}
function moyenne() {
    var html = Number(document.getElementById('html').value);
    var css = Number(document.getElementById('css').value);
    var js = Number(document.getElementById('js').value);

    if (html < 0 || html > 20) {
        document.getElementById('htmlErreur').innerHTML =
            'Merci de donner une valeur  entre 0 et 20';
    } else {
        document.getElementById('htmlErreur').innerHTML = '';
    }
    if (css < 0 || css > 20) {
        document.getElementById('cssErreur').innerHTML =
            'Merci de donner une valeur  entre 0 et 20';
    } else {
        document.getElementById('cssErreur').innerHTML = '';
    }
    if (js < 0 || js > 20) {
        document.getElementById('jsErreur').innerHTML =
            'Merci de donner une valeur  entre 0 et 20';
    } else {
        document.getElementById('jsErreur').innerHTML = '';
    }

    if (html < 0 || html > 20 || css < 0 || css > 20 || js < 0 || js > 20) {
        document.getElementById('calculMoyenne').innerHTML = 'Erreur';
    }
    else {
        var moy = (html * 1 + css * 1 + js * 1) / 3;
        document.getElementById('calculMoyenne').innerHTML = moy;
    }
    if (moy >= 0 && moy < 8) {
        document.getElementById('calculMention').innerHTML = 'Trop faible';
    } else if (moy >= 8 && moy < 10) {
        document.getElementById('calculMention').innerHTML = 'Faible';
    } else if (moy >= 10 && moy < 13) {
        document.getElementById('calculMention').innerHTML = 'Assez Bien';
    } else if (moy >= 13 && moy < 16) {
        document.getElementById('calculMention').innerHTML = 'Bien';
    } else if (moy >= 16 && moy < 18) {
        document.getElementById('calculMention').innerHTML = 'Trés bien';
    } else if (moy >= 18 && moy <= 20) {
        document.getElementById('calculMention').innerHTML = 'Excellent';
    } else {
        document.getElementById('calculMention').innerHTML = 'Error';
    }
}
function listeDesEtudiants() {

    var allUsers = JSON.parse(localStorage.getItem("users" || "[]"));
    var prof = JSON.parse(localStorage.getItem("connectedUser"));
    var script = ``;
    for (var i = 0; i < prof.section.length; i++) {
        script += `<h1 >Section : ${prof.section[i]} </h1>`;
        for (var j = 0; j < prof.classe.length; j++) {

            script += `<br> <h2>Niveau: ${prof.classe[j]} <br></h2>`;
            script += `<table class="table">
                    <thead class="thead-dark" ">
                      <tr>
                        <th scope="col">Nom</th>
                        <th scope="col">Prenom</th>
                        <th scope="col">Email</th>
                        <th scope="col">Section</th>
                        <th scope="col">Classe</th>
                      </tr>
                    </thead>
                    <tbody>`;
            for (var k = 0; k < allUsers.length; k++) {
                if (allUsers[k].role === "etudiant") {
                     if((allUsers[k].classe[0]===prof.classe[j])&&(allUsers[k].section[0]===prof.section[i]))
                     {
                        script = script + ` 
                        <tr>
                        <th >${allUsers[k].lastName}</th>
                        <th >${allUsers[k].firstName}</th>
                        <th >${allUsers[k].email}</th>
                        <th >${allUsers[k].section[0]}</th>
                        <th >${allUsers[k].classe[0]}</th>
                        </tr> `;
                        }
                    
                     }
                    
                
            }
            script = script + `</tbody>
            </table> `;
        }
    }
    document.getElementById("listeEtudiants").innerHTML = script;



}
function nbrPre(id)
{
    var j=0;
    listePre=JSON.parse(localStorage.getItem("listePre"))
    for(var i=0;i<listePre.length;i++)
    {
          if(listePre[i].id===id)
          {
              j=j+1;
          }

    }
    return j;
}
function nbrAbs(id)
{
    var j=0;
    listeAbs=JSON.parse(localStorage.getItem("listeAbsc"))
    for(var i=0;i<listeAbs.length;i++)
    {
          if(listeAbs[i].id===id)
          {
              j=j+1;
          }

    }
    return j;
}
function donnerUneNote() {
    var allUsers = JSON.parse(localStorage.getItem("users" || "[]"));
    var prof = JSON.parse(localStorage.getItem("connectedUser"));
    var script = ``;
    for (var i = 0; i < prof.section.length; i++) {
        script += `<h1  >Section : ${prof.section[i]} </h1>`;
        for (var j = 0; j < prof.classe.length; j++) {
            script += `<br> <h2>Niveau: ${prof.classe[i]} <br></h2>`;
            script += `<table class="table" >
                    <thead class="thead-dark" ">
                      <tr>
                        <th scope="col">Nom</th>
                        <th scope="col">Prenom</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>`;
            for (var k = 0; k < allUsers.length; k++) {
                if (allUsers[k].role === "etudiant") {
                     if((allUsers[k].classe[0]===prof.classe[j])&&(allUsers[k].section[0]===prof.section[i]))
                     {
                        script = script + ` 
                        <tr>
                        <th >${allUsers[k].lastName}</th>
                        <th >${allUsers[k].firstName}</th>
                        <th >${allUsers[k].email}</th>
                        <th>  <button type="button"
                        class="btn" onclick="donnerUneNoteButton(${allUsers[k].id})" >Donner une Note</button</th>
                        </tr> `;
                        }
                    
                     }
                    
                
            }
            script = script + `</tbody>
            </table> `;
        }
    }
    
    document.getElementById("notesEtudiants").innerHTML = script;
}
function donnerUneNoteButton(ch) {
    localStorage.setItem("idEtudiantNote", ch);
    location.replace("donnerNote.html");
}
function moyenneD() {
    var html = Number(document.getElementById('htmlD').value);
    var css = Number(document.getElementById('cssD').value);
    var js = Number(document.getElementById('jsD').value);

    if (html < 0 || html > 20) {
        document.getElementById('htmlDErreur').innerHTML =
            'Merci de donner une valeur  entre 0 et 20';
    } else {
        document.getElementById('htmlDErreur').innerHTML = '';
    }
    if (css < 0 || css > 20) {
        document.getElementById('cssDErreur').innerHTML =
            'Merci de donner une valeur  entre 0 et 20';
    } else {
        document.getElementById('cssDErreur').innerHTML = '';
    }
    if (js < 0 || js > 20) {
        document.getElementById('jsDErreur').innerHTML =
            'Merci de donner une valeur  entre 0 et 20';
    } else {
        document.getElementById('jsDErreur').innerHTML = '';
    }
    var b = false;
    var moy;
    if (html < 0 || html > 20 || css < 0 || css > 20 || js < 0 || js > 20) {
        document.getElementById('calculMoyenneD').innerHTML = 'Erreur';
    }
    else {
        moy = (html * 1 + css * 1 + js * 1) / 3;
        document.getElementById('calculMoyenneD').innerHTML = moy;
        b = true;

    }
    var mention;
    if (moy >= 0 && moy < 8) {
        mention = 'Trop faible';
    } else if (moy >= 8 && moy < 10) {
        mention = 'Faible';
    } else if (moy >= 10 && moy < 13) {
        mention = 'Assez Bien';
    } else if (moy >= 13 && moy < 16) {
        mention = 'Bien';
    } else if (moy >= 16 && moy < 18) {
        mention = 'Trés bien';
    } else if (moy >= 18 && moy <= 20) {
        mention = 'Excellent';
    } else {
        mention = 'Error';
    }
    document.getElementById('calculMentionD').innerHTML = mention;
    var idExiste = false;
    var j;
    if (b === true) {
        notes = JSON.parse(localStorage.getItem("notes") || "[]");
        var id = JSON.parse(localStorage.getItem("idEtudiantNote"));

        for (var i = 0; i < notes.length; i++) {
            if (notes[i].id === id) {
                idExiste = true;
                j = i;
                i = notes.length;
            }
        }
        if (idExiste === true) {
            notes[j].html = html;
            notes[j].css = css;
            notes[j].js = js;
            notes[j].moyenne = moy;
            notes[j].mention = mention;

        }
        else {


            var note = {
                id: id,
                html: html,
                css: css,
                js: js,
                moyenne: moy,
                mention: mention
            }

        };
        notes.push(note);
        localStorage.setItem("notes", JSON.stringify(notes));
        location.replace("courses.html");
    }
}
function GererAbscence() {
    var allUsers = JSON.parse(localStorage.getItem("users" || "[]"));
    var prof = JSON.parse(localStorage.getItem("connectedUser"));
    var script = ``;
    for (var i = 0; i < prof.section.length; i++) {
        script += `<h1 >Section : ${prof.section[i]} </h1>`;
        for (var j = 0; j < prof.classe; j++) {
            script += `<br> <h2>Niveau: ${prof.classe[0]} <br></h2>`;
            script += `<table class="table">
                    <thead class="thead-dark" ">
                      <tr>
                        <th scope="col">Nom</th>
                        <th scope="col">Prenom</th>
                        <th scope="col">Email</th>
                        <th scope="col">Presence</th>
                        <th scope="col">Absence</th>

                      </tr>
                    </thead>
                    <tbody>`;
            var e = -1;
            var d = 0;
            for (var k = 0; k < allUsers.length; k++) {
                e = e + 2;
                d = d + 2;
                if (allUsers[k].role === "etudiant") {
                     if((allUsers[k].classe[0]===prof.classe[j])&&(allUsers[k].section[0]===prof.section[i]))
                     {
                        e = e + 2;
                        d = d + 2;
                        script = script + ` 
                        <tr>
                        <th >${allUsers[k].lastName}</th>
                        <th >${allUsers[k].firstName}</th>
                        <th >${allUsers[k].email}</th>
                        <th>  <button type="button"
                        class="btn btn-success" onclick='present(${e},${allUsers[k].id})'; id="${e}">Présent</button></th>
                      
                        <th>  <button type="button"
                        class="btn btn-danger" onclick='abscent(${d},${allUsers[k].id})' id="${d}">Abscent</button></th>
                        </tr> `;
                        }
                    
                     }
                    
                
            }
            script = script + `</tbody>
            </table> `;
        }
    }

    
    document.getElementById("presAbsEtudiants").innerHTML = script;

}
function present(a, id) {
    document.getElementById(`${a}`).disabled = true;
    document.getElementById(`${a+1}`).disabled = true;
    listePresents = JSON.parse(localStorage.getItem("listePre") || "[]");
    var d = new Date();
    var date = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();


    var pre = {
        id: id,
        date: date

    };
    listePresents.push(pre);
    localStorage.setItem("listePre", JSON.stringify(listePresents));
}
function abscent(a, id) {
    document.getElementById(`${a}`).disabled = true;
    document.getElementById(`${a - 1}`).disabled = true;
    listeAbscents = JSON.parse(localStorage.getItem("listeAbsc") || "[]");
    var d = new Date();
    var date = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();


    var absc = {
        id: id,
        date: date

    };
    listeAbscents.push(absc);
    localStorage.setItem("listeAbsc", JSON.stringify(listeAbscents));
}
function mesNotes() {
    var user = JSON.parse(localStorage.getItem("connectedUser"));
    var notes = JSON.parse(localStorage.getItem("notes"));
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === user.id) {
            document.getElementById("noteHtml").innerHTML = notes[i].html;
            document.getElementById("noteCss").innerHTML = notes[i].css;
            document.getElementById("noteJs").innerHTML = notes[i].js;

            document.getElementById("moyenne").innerHTML = notes[i].moyenne;

            document.getElementById("mention").innerHTML = notes[i].mention;


        }
    }
}
function presEtudiant() {
    var script = `<table class="table">
    <thead class="thead-dark" ">
      <tr>
        <th scope="col">Nom</th>
        <th scope="col">Prenom</th>
        <th scope="col">Email</th>
        <th scope="col" >Present</th>
        <th scope="col" >Absent</th>
      </tr>
    </thead>
    <tbody>`
    var user = JSON.parse(localStorage.getItem("connectedUser"));
    var p = 0;
    var listePre = JSON.parse(localStorage.getItem("listePre")||"[] a");
    for (var i = 0; i < listePre.length; i++) {
        if (listePre[i].id === user.id) {
            p = p + 1;
        }
    }
    var a = 0;
    var listeAbsc = JSON.parse(localStorage.getItem("listeAbsc")||"[]");
    for (var i = 0; i < listeAbsc.length; i++) {
        if (listeAbsc[i].id === user.id) {
            a = a + 1;
        }
    }
    script = script + ` 
    <tr>
    <th >${user.lastName}</th>
    <th >${user.firstName}</th>
    <th >${user.email}</th>
    <th> ${p}</th>
  
    <th> ${a} </th>
    </tr> `;
    script = script + `</tbody>
        </table> `;
    document.getElementById("presAbsEtudiants").innerHTML = script;
    if(a>5)
    {
        document.getElementById("elimine").innerHTML="Tu es eliminé";
        document.getElementById("elimine").style.textAlign="center";
        document.getElementById("elimine").style.color="red";
    }
    var datePres=[];
    var dateAbs=[];
    var id=user.id;
    var pres=JSON.parse(localStorage.getItem("listePre")||"[]");
    var abs=JSON.parse(localStorage.getItem("listeAbsc")||"[]");
    for(var i=0;i<pres.length;i++)
    {
        if(pres[i].id===id)
        {
            datePres.push(pres[i].date);
        }

    }
    for(var i=0;i<abs.length;i++)
    {
        if(pres[i].id===id)
        {
            dateAbs.push(abs[i].date);
        }
    }
    var script2= `<table class="table"> 
    <tr>
    <th scope="row">Presence</th>`;
    for(var i=0;i<datePres.length;i++)
    {
        script2+=`      <td>${datePres[i]}</td>
        `;
    }
    script2+=`</tr> </table>
     <table>`;
    script2+= `<table class="table"> 
    <tr>
    <th scope="row">Absence</th>`;
    for(var i=0;i<dateAbs.length;i++)
    {
        script2+=`      <td>${dateAbs[i]}</td>
        `;
    }
    script2+=`</tr>
    </table>`;
    document.getElementById("etudPresAbs").innerHTML=script2;


}
function contactProf()
{
         var id=JSON.parse(localStorage.getItem("connectedUser"));
         var message=document.getElementById("message").value;
         var name=document.getElementById("name").value;
         var email=document.getElementById("email").value;
         var subject=document.getElementById("subject").value;
         var contact= JSON.parse(localStorage.getItem("contact")||"[]");
         var contac={
             id:id,
             message:message,
             name:name,
             email:email,
             subject:subject
         };
         contact.push(contac);
         localStorage.setItem("contact",JSON.stringify(contact));

}
function contactEtudiant()
{
    var id=JSON.parse(localStorage.getItem("connectedUser"));

    var message=document.getElementById("messageE").value;
    var name=document.getElementById("nameE").value;
    var email=document.getElementById("emailE").value;
    var subject=document.getElementById("subjectE").value;
    var contact= JSON.parse(localStorage.getItem("contact")||"[]");
    var contac={
        id:id,
        message:message,
        name:name,
        email:email,
        subject:subject
    };
    contact.push(contac);
    localStorage.setItem("contact",JSON.stringify(contact));


}
function deconnecter()
{
    localStorage.setItem("connectedUser","");
    location.replace("login.html");
}
