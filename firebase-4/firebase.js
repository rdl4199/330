// TODO: ADD YOUR imports and Firebase setup code HERE

    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    import { getDatabase, ref, set, push, onValue, increment } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyDfq6xAiEYSgy92IyWsciuEqUuqW4NbVJE",
      authDomain: "dogsdata-a55c4.firebaseapp.com",
      projectId: "dogsdata-a55c4",
      storageBucket: "dogsdata-a55c4.appspot.com",
      messagingSenderId: "955320239480",
      appId: "1:955320239480:web:208431943cd03db3f7348d"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    console.log(app);
    //

    const writeFavNameData = name => {
      const db = getDatabase();
      const favRef = ref(db, 'favorites/' + name);
      set(favRef, {
        name,
        likes: increment(1)
      });
    };

    const favoritesChanged = (snapshot) => {
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

    const init = () => {
      const db = getDatabase();
      const favoritesRef = ref(db, 'favorites/');
      onValue(favoritesRef, favoritesChanged);

      btnSubmit.onclick = () => {
        writeFavNameData(nameField.value);
      };
    };
    init();