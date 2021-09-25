import React, { useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import { db } from "./firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function addCard(card) {
    db.collection("CardItem")
      .add(card)
      .then((docRef) => {});
  }

  async function getCards(where, value) {
    const snapshot = await db
      .collection("CardItem")
      .where(where, "==", value)
      .get();

    const documents = [];
    snapshot.forEach((doc) => {
      documents.splice(documents.length, 0, doc.data());
    });
    return documents;
  }

  async function getCardsAll() {
    const snapshot = await db.collection("CardItem").get();

    const documents = [];
    snapshot.forEach((doc) => {
      documents.splice(documents.length, 0, doc.data());
    });
    return documents;
  }

  function deleteCard(value) {
    var jobskill_query = db
      .collection("CardItem")
      .where("cardId", "==", value);
    jobskill_query.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
    });
  }

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    resetPassword,
    addCard,
    getCards,
    getCardsAll,
    logout,
    deleteCard
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
