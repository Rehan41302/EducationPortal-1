import { PAGE_LOADING } from "./types";

export const pageLoading = load => {
  return {
    type: PAGE_LOADING,
    payload: load
  };
};

// // Getting Current Company
// export const signInTutor = email => dispatch => {
//   console.log({ email });
//   if (email) {
//     console.log(email);
//     db.collection("companies")
//       .where("email", "==", `${email}`)
//       .get()
//       .then(snapShot => {
//         if (!snapShot.empty) {
//           let companyArray = [];
//           snapShot.forEach(async docs => {
//             console.log(docs);
//             companyArray.push({ ...docs.data(), id: docs.id });
//           });
//           console.log(companyArray);
//           dispatch(setCurrentCompany(companyArray[0]));
//         } else {
//           dispatch(removeCurrentCompany());
//         }
//       })
//       .catch(error => console.log(error));
//   }
// };
