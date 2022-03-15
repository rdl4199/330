import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getDatabase, ref, set, push, onValue, increment } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";
function firebaseInit() {

    // Import the functions you need from the SDKs you need

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyB4wJr3yumLTpoafR3eY9Q26L1FCA_Itwk",
        authDomain: "stockapi-27dcc.firebaseapp.com",
        databaseURL: "https://stockapi-27dcc-default-rtdb.firebaseio.com",
        projectId: "stockapi-27dcc",
        storageBucket: "stockapi-27dcc.appspot.com",
        messagingSenderId: "401980340831",
        appId: "1:401980340831:web:1efb504632f038028879ea"
      };
      
      // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getDatabase();
        const favoritesDefaultRef = ref(db, 'favorites/');



}
firebaseInit();
function writeFavNameData(name, value, range, volume) {
    const db = getDatabase();
    const favRef = ref(db, 'favorites/' + name);
    set(favRef, {
        name,
        value,
        range,
        volume,
        likes: increment(1)
    });
}


function favoritesChanged(snapshot) {
    // TODO: clear #favoritesList
    document.querySelector("#favoritesList").innerHTML = "";
    snapshot.forEach(fav => {
        const childKey = fav.key;
        const childData = fav.val();
        console.log(childKey, childData);
        // TODO: update #favoritesList
        document.querySelector("#favoritesList").innerHTML += `<li><b>${childData.name}</b> - Likes ${childData.likes}</li>`;
    });
};

function init(){
    const db = getDatabase();
    const favoritesRef = ref(db, 'favorites/');
    onValue(favoritesRef, favoritesChanged);

    btnSubmit.onclick = () => {
        writeFavNameData(nameField.value);
    };
};
export {writeFavNameData, firebaseInit, favoritesChanged, init}